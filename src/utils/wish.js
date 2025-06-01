export let wishlist = JSON.parse(localStorage.getItem("XclusiveWish")) || [];

const wishSubscribers = [];

export function saveWishlist() {
  localStorage.setItem("XclusiveWish", JSON.stringify(wishlist));
}

export function addToWishlist(productId) {
  let matchingItem = wishlist.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    wishlist.push({
      productId,
      quantity: 1,
    });
  }

  saveWishlist();
  notifyWishSubscribers();
}

export function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => item.productId !== productId);
  saveWishlist();
  notifyWishSubscribers();
}

/*export function calculateWishlistQuantity() {
  return wishlist.reduce((total, item) => total + item.quantity, 0);
} */

  // In your wish.js file
export function calculateWishlistQuantity() {
  return wishlist.length; // or sum quantities if you track quantities
}

export function subscribeToWishlist(callback) {
  wishSubscribers.push(callback);
  return () => {
    const index = wishSubscribers.indexOf(callback);
    if (index !== -1) wishSubscribers.splice(index, 1);
  };
}

function notifyWishSubscribers() {
  wishSubscribers.forEach((callback) => callback());
}

export function toggleWish(productId) {
  const exists = wishlist.some((item) => item.productId === productId);

  if (exists) {
    removeFromWishlist(productId);
  } else {
    addToWishlist(productId);
  }
}
