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
;(function (document) {
    const menuMobile = document.getElementById('menu-mobile')
    const svgContent = document.getElementById('svg-content')
    const iconClose =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
    const iconOpen =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />'

    document.getElementById('btn-burger').onclick = function () {
        menuMobile.classList.toggle('hidden')
        menuMobile.classList.toggle('transform')
        menuMobile.classList.contains('hidden') ? svgContent.innerHTML = iconOpen : svgContent.innerHTML = iconClose
    }
})(document)
