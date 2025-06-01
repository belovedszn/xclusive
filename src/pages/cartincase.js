/*export let cart = JSON.parse(localStorage.getItem("XclusiveCar")) || [];

export function saveCart() {
  localStorage.setItem("XclusiveCar", JSON.stringify(cart));
}

export function getCart() {
  return cart;
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    //  if (productId === cartItem.productId) {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveCart();
  updateCartQuantity();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveCart();
  updateCartQuantity();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cartQ").innerHTML = cartQuantity;
  saveCart();
}
*/

// new update 2.0

/*

export let cart = JSON.parse(localStorage.getItem("XclusiveC")) || [];

export function saveCart() {
  localStorage.setItem("XclusiveC", JSON.stringify(cart));
}

export function getCart() {
  return cart;
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveCart();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveCart();
}

// This function now just calculates the quantity without DOM manipulation
export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
} */

// update 3.0

/*

export let cart = JSON.parse(localStorage.getItem("XclusiveCar")) || [];

export function saveCart() {
  localStorage.setItem("XclusiveCar", JSON.stringify(cart));
}

export function getCart() {
  return cart;
}

export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveCart();
}

// In your cart.js file
export function removeFromCart(productId) {
  const newCart = cart.filter(item => item.productId !== productId);
  cart = newCart;
  saveCart();
  notifySubscribers(); // If you're using the pub/sub pattern
}

export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Add this new function to notify subscribers
const subscribers = [];
export function subscribe(callback) {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
}

export function notifySubscribers() {
  subscribers.forEach((callback) => callback());
} */

  export let cart = JSON.parse(localStorage.getItem("XclusiveCar")) || [];

  let subscribers = [];
  
  export function saveCart() {
    localStorage.setItem("XclusiveCar", JSON.stringify(cart));
  }
  
  export function addToCart(productId, quantity = 1) {
    let matchingItem = cart.find(item => item.productId === productId);
  
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
  