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