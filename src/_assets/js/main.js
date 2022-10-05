import '/assets/js/speedlify-score.js'
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

    const button = document.getElementById('btn-burger')
    if (button) {
        const menuMobile = document.getElementById('menu-mobile')
        const svgContent = document.getElementById('svg-content')
        const iconClose =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
        const iconOpen =
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />'

        button.onclick = function () {
            menuMobile.classList.toggle('hidden')
            menuMobile.classList.toggle('transform')
            menuMobile.classList.contains('hidden')
                ? (svgContent.innerHTML = iconOpen)
                : (svgContent.innerHTML = iconClose)
        }
    }

    const codeBlocks = document.querySelectorAll('main .prose pre')
    if (codeBlocks) {
        codeBlocks.forEach((block) => {
            // add a copy-code-button to each pre element
            let button = document.createElement('button')
            button.innerText = 'Copy'

            button.addEventListener('click', (event) => {
                const element = event.target
                element.innerText = 'Copied ✅'
                const pre = element.parentElement
                const code = pre.querySelector('code')
                const range = document.createRange()
                range.selectNode(code)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)

                // check if the browser supports clipboard API
                if (!navigator.clipboard) {
                    document.execCommand('copy')
                } else {
                    try {
                        navigator.clipboard.writeText(range.toString())
                    } catch (error) {
                        console.error(error)
                    }
                }
                window.getSelection().removeAllRanges()
                setTimeout(() => {
                    element.innerText = 'Copy'
                }, 2000)
            })
            block.appendChild(button)
        })
    }
})(document)
