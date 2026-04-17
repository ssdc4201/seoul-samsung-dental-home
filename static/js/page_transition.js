(function () {
  // 새 페이지 로드 후 페이드인
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.remove("is-leaving");
  });

  // 내부 링크 클릭 시 페이드아웃 후 이동
  document.addEventListener("click", function (e) {
    const a = e.target.closest("a");
    if (!a) return;

    const url = new URL(a.href, window.location.href);

    // 같은 페이지 앵커 / 외부 링크 / 새 탭 / 단축키는 제외
    const isSameOrigin = url.origin === window.location.origin;
    const isHashOnly =
      url.pathname === window.location.pathname && url.hash;

    if (!isSameOrigin || isHashOnly) return;
    if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    document.body.classList.add("is-leaving");

    const DURATION = 50;

    setTimeout(() => {
      window.location.href = url.href;
    }, DURATION);

  });

  // 뒤로가기 캐시(bfcache) 대응
  window.addEventListener("pageshow", function () {
    document.body.classList.remove("is-leaving");
  });
})();
