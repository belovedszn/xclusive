export function hideToggle() {
    const hideIcons = document.querySelectorAll(".hide");
  
    hideIcons.forEach((icon) => {
      const productCard = icon.closest(".product-card");
  
      icon.addEventListener("click", () => {
        const isBlurred = productCard.style.filter === "blur(5px)";
        productCard.style.filter = isBlurred ? "none" : "blur(5px)";
        icon.classList.toggle("bi-eye");
        icon.classList.toggle("bi-eye-slash-fill");
      });
    });
  }
  