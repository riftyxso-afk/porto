(() => {
  const pagePath = '/editions/winter2026';
  const videoPath = location.pathname.startsWith(pagePath + '/video/');
  if (videoPath) window.__localInitialVideoPath = location.pathname.replace(/\/$/, '');
  if (location.pathname === '/' || location.pathname === '/index.html' || videoPath) {
    history.replaceState(history.state, '', pagePath + location.search + location.hash);
  }
})();
