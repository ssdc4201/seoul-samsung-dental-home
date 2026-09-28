(() => {
  const video = document.querySelector('.hero-video');
  const toggle = document.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateToggle = () => {
    toggle.textContent = video.paused ? '재생 ▷' : '일시정지 Ⅱ';
    toggle.setAttribute('aria-label', video.paused ? '치아 영상 재생' : '치아 영상 일시정지');
  };
  if (reducedMotion.matches) { video.autoplay = false; video.pause(); }
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) video.pause(); });
  toggle.addEventListener('click', () => {
    if (video.paused) video.play().catch(updateToggle);
    else video.pause();
  });
  video.addEventListener('play', updateToggle);
  video.addEventListener('pause', updateToggle);
  updateToggle();

  const links = [...document.querySelectorAll('[data-gallery]')];
  const dialog = document.querySelector('.photo-dialog');
  const img = dialog.querySelector('img');
  let index = 0;
  let opener;
  const show = (next) => {
    index = (next + links.length) % links.length;
    img.src = links[index].href;
    img.alt = `서울삼성치과 ${links[index].dataset.title}`;
    dialog.querySelector('figcaption').textContent = links[index].dataset.title;
    dialog.querySelector('.photo-count').textContent = `${index + 1} / ${links.length}`;
  };
  links.forEach((link, i) => link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link; show(i); dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  dialog.querySelector('.photo-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-photo-prev]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-photo-next]').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
})();
