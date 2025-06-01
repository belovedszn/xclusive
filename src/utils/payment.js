
 export const orderPayment = () => {
    let productPrice = 0;
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      const product = getProducts(cartItem.productId);
      if (!product) return;

      const productPriceNumber = parseFloat(product.price.replace("$", "")) || 0;
      productPrice += productPriceNumber * cartItem.quantity;
      cartQuantity += cartItem.quantity;
    });

    const totalBeforeShipping = productPrice;
    const shipping = totalBeforeShipping * 0.003;
    const total = totalBeforeShipping + shipping;

    const html = `
      <div class="coupon-box">
        <input type="text" placeholder="Coupon Code" />
        <button>Apply Coupon</button>
      </div>
      <div class="cart-subtotal">
        <div class="sub-heading">Cart Total</div>
        <div class="total-box">
          <div>Subtotal:</div>
          <div>$${totalBeforeShipping.toFixed(2)}</div>
        </div>
        <div class="total-box">
          <div>Shipping:</div>
          <div>$${shipping.toFixed(2)}</div>
        </div>
        <div class="last-total-box">
          <div>Total:</div>
          <div>$${total.toFixed(2)}</div>
        </div>
        <div class="proceed-btn">
          <button class="checkout" id="checkout">Proceed to checkout</button>
        </div>
      </div>
    `;

    setPaymentHTML(html);
    return html;
  };