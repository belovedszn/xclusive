const handleQuantityChange = (productId, newQuantity) => {
    const item = cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = newQuantity;
      saveCart();
      refreshCartDisplay();
    }
  };