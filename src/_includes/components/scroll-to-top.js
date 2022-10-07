class ScrollToTop extends HTMLElement {
    connectedCallback() {
        const scrollToTopButton = this.querySelector(':scope button')
        if (0 === scrollToTopButton.length) {
            return
        }

        scrollToTopButton.addEventListener('click', () => window.scroll({ behavior: 'smooth', top: 0 }))

        window.addEventListener('scroll', () => {
            500 <= window.scrollY
                ? scrollToTopButton.classList.remove('opacity-0')
                : scrollToTopButton.classList.add('opacity-0')
        })
    }
}

if ('customElements' in window) {
    window.customElements.define('scroll-tp-ago', ScrollToTop)
}
