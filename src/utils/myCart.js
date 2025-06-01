export function updateCartQuantity(cart) {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector(".js-cartQ").innerHTML = cartQuantity;
  
    saveCart(cart);
  }
  
  export function addCartBtn(cart, addToCart) {
    document.querySelectorAll(".addCart").forEach((button) => {
      const productId = button.dataset.productId;
      const itemIndex = cart.findIndex((item) => item.productId === productId);
  
      if (itemIndex !== -1) {
        button.innerHTML = "Added";
        button.disabled = true;
      }
  
      button.addEventListener("click", () => {
        addToCart(productId);
        updateCartQuantity(JSON.parse(localStorage.getItem("Xcart")));
        button.innerHTML = "Added";
        button.disabled = true;
      });
    });
  }
  