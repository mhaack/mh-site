(function () {
  if (window.__lightboxInit) return;
  window.__lightboxInit = true;

  let overlay, imgEl, prevBtn, nextBtn, group = [], index = 0, lastFocus = null;

  // eleventy-img rewrites <img> to /.11ty/image/ URLs and does not serve the
  // original src, so resolve the largest candidate from the rendered srcset.
  function hiResFromLink(link) {
    const img = link.querySelector('img');
    if (img && img.srcset) {
      const best = img.srcset
        .split(',')
        .map((part) => part.trim().split(/\s+/))
        .reduce(
          (acc, [url, w]) => {
            const width = parseInt(w, 10) || 0;
            return width > acc.w ? { url, w: width } : acc;
          },
          { url: (img.currentSrc || img.src || link.getAttribute('href')), w: 0 }
        );
      return best.url;
    }
    return (img && (img.currentSrc || img.src)) || link.getAttribute('href');
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Close" type="button">×</button>' +
      '<button class="lightbox-prev" aria-label="Previous image" type="button">‹</button>' +
      '<img class="lightbox-img" alt="">' +
      '<button class="lightbox-next" aria-label="Next image" type="button">›</button>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox-img');
    prevBtn = overlay.querySelector('.lightbox-prev');
    nextBtn = overlay.querySelector('.lightbox-next');
    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  function show(i) {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    const link = group[index];
    imgEl.src = hiResFromLink(link);
    imgEl.alt = link.getAttribute('aria-label') || '';
    const multi = group.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  }

  function open(link) {
    if (!overlay) build();
    const container = link.closest('.image-row, .image-bento') || document;
    group = Array.from(container.querySelectorAll('a.lightbox-link'));
    index = group.indexOf(link);
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show(index);
    overlay.querySelector('.lightbox-close').focus();
    document.addEventListener('keydown', onKey);
  }

  function close() {
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a.lightbox-link');
    if (!link) return;
    e.preventDefault();
    open(link);
  });
})();
