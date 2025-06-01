export let cart = JSON.parse(localStorage.getItem("Xcarty")) || [];

export function getCart() {
  return cart;
}

let subscribers = [];

export function saveCart() {
  localStorage.setItem("Xcarty", JSON.stringify(getCart()));
}

export function addToCart(productId, quantity = 1) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveCart();
  notifySubscribers();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveCart();
  notifySubscribers();
}

export function updateCartQuantity(productId, operation) {
  const item = cart.find((item) => item.productId === productId);

  if (!item) return;

  if (operation === "increase") {
    item.quantity += 1;
  } else if (operation === "decrease" && item.quantity > 1) {
    item.quantity -= 1;
  }

  saveCart();
  notifySubscribers();
}

export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function subscribe(callback) {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}
