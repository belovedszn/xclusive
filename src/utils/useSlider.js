// src/components/slider/useSlider.js
import { useEffect } from "react";

export const useSlider = (sliderRef, scrollbarRef, thumbRef, prevBtnRef, nextBtnRef) => {
  useEffect(() => {
    const slideBtns = [prevBtnRef.current, nextBtnRef.current];
    const imagelist = sliderRef.current;
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    if (!imagelist || !scrollbar || !thumb) return;

    const maxScrollLeft = imagelist.scrollWidth - imagelist.clientWidth;

    const onMouseDown = (e) => {
      const startX = e.clientX;
      const thumbPosition = thumb.offsetLeft;

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumb = scrollbar.getBoundingClientRect().width - thumb.offsetWidth;

        const bounded = Math.max(0, Math.min(maxThumb, newThumbPosition));
        const scrollLeft = (bounded / maxThumb) * maxScrollLeft;

        thumb.style.left = `${bounded}px`;
        imagelist.scrollLeft = scrollLeft;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    thumb.addEventListener("mousedown", onMouseDown);

    slideBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const direction = index === 0 ? -1 : 1;
        const scrollAmount = imagelist.clientWidth * direction;
        imagelist.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });

    const updateScroll = () => {
      const scrollLeft = imagelist.scrollLeft;
      const thumbLeft =
        (scrollLeft / maxScrollLeft) *
        (scrollbar.clientWidth - thumb.offsetWidth);
      thumb.style.left = `${thumbLeft}px`;
    };

    const onScroll = () => {
      updateScroll();
    };

    imagelist.addEventListener("scroll", onScroll);

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
      imagelist.removeEventListener("scroll", onScroll);
    };
  }, [sliderRef, scrollbarRef, thumbRef, prevBtnRef, nextBtnRef]);
};
