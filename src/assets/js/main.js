(function(document) {
    const scrollToTopButton = document.getElementById('scrollToTop')
    if (0 === scrollToTopButton.length) {
      return
    }
  
    scrollToTopButton.addEventListener('click', () => window.scroll({ behavior: 'smooth', top: 0 }))
  
    window.addEventListener('scroll', () => {
      (100 <= window.scrollY)
        ? scrollToTopButton.style.opacity = 1
        : scrollToTopButton.style.opacity = 0
    })
  })(document)