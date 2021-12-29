;(function (document) {
    const scrollToTopButton = document.getElementById('scrollToTop')
    if (0 === scrollToTopButton.length) {
        return
    }

    scrollToTopButton.addEventListener('click', () => window.scroll({ behavior: 'smooth', top: 0 }))

    window.addEventListener('scroll', () => {
        500 <= window.scrollY
            ? scrollToTopButton.classList.remove('opacity-0')
            : scrollToTopButton.classList.add('opacity-0')
    })
})(document)
