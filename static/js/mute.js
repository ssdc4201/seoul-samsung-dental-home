document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('introVideo');
  const btn = document.querySelector('.mute-btn');

  if (!video || !btn) return;

  // 시작은 무조건 무음
  video.muted = true;
  video.volume = 1.0;
  btn.textContent = '🔇';

  // ⭐ 클릭용 함수 (전역에 걸어줌)
  window.toggleMute = function () {
    video.muted = !video.muted;
    btn.textContent = video.muted ? '🔇' : '🔊';

    if (!video.muted) {
      video.play().catch(() => {});
    }
  };
});
