/*
 * Fullscreen for browser play. Browsers only allow fullscreen after a user
 * gesture, so the game goes fullscreen on the first tap, click or key press.
 * A corner button and the F key toggle it afterwards. Skipped when there is
 * no fullscreen API, or when the game is inside another page's frame.
 */
(function () {
  if (window.top !== window.self) return;
  const root = document.documentElement;
  if (!root.requestFullscreen) return;

  const enter = () => {
    if (!document.fullscreenElement) root.requestFullscreen().catch(() => {});
  };
  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else enter();
  };

  window.addEventListener('pointerdown', enter, { once: true, capture: true });
  window.addEventListener('keydown', enter, { once: true, capture: true });

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '⛶';
  button.title = 'Fullscreen (F)';
  button.setAttribute('aria-label', 'Toggle fullscreen');
  button.style.cssText =
    'position:fixed;right:10px;top:10px;z-index:9999;width:34px;height:34px;border-radius:8px;' +
    'border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.45);color:#fff;font-size:18px;' +
    'line-height:1;cursor:pointer;opacity:.7;';
  button.addEventListener('pointerdown', (e) => e.stopPropagation());
  button.addEventListener('click', toggle);
  const place = () => document.body && document.body.appendChild(button);
  if (document.body) place();
  else window.addEventListener('DOMContentLoaded', place, { once: true });

  window.addEventListener('keydown', (e) => {
    if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      toggle();
    }
  });
})();
