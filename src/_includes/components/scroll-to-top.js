const scrollToTopButton = document.getElementById('scrollToTop');
if (scrollToTopButton) {
  scrollToTopButton.addEventListener('click', () => window.scroll({ behavior: 'smooth', top: 0 }));

  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (isScrolling) return;

    isScrolling = true;
    requestAnimationFrame(() => {
      500 <= window.scrollY
        ? scrollToTopButton.classList.remove('opacity-0')
        : scrollToTopButton.classList.add('opacity-0');
      isScrolling = false;
    });
  });
}
