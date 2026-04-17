(function () {
  function setupCarousel(root) {
    const track = root.querySelector(".carousel-track");
    const slides = root.querySelectorAll(".carousel-slide");
    const prevBtn = root.querySelector(".carousel-btn.prev");
    const nextBtn = root.querySelector(".carousel-btn.next");
    if (!track || slides.length === 0) return;

    let index = 0;

    function update() {
      const x = -index * 100;
      track.style.transform = `translateX(${x}%)`;
      prevBtn.disabled = (index === 0);
      nextBtn.disabled = (index === slides.length - 1);
      prevBtn.style.opacity = prevBtn.disabled ? "0.35" : "1";
      nextBtn.style.opacity = nextBtn.disabled ? "0.35" : "1";
    }

    prevBtn.addEventListener("click", () => { index = Math.max(0, index - 1); update(); });
    nextBtn.addEventListener("click", () => { index = Math.min(slides.length - 1, index + 1); update(); });

    // 모바일 스와이프(선택)
    let startX = null;
    root.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", (e) => {
      if (startX == null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      startX = null;

      if (Math.abs(dx) < 40) return; // 최소 스와이프 거리
      if (dx < 0) index = Math.min(slides.length - 1, index + 1);
      else index = Math.max(0, index - 1);
      update();
    });

    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
  });
})();
