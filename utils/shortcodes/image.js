const Image = require('@11ty/eleventy-img')
const path = require('path')

module.exports = async (relativeSrc, alt = 'image', className, sizes = '(min-width: 1024px) 100vw, 50vw') => {
    const { dir: imgDir } = path.parse(relativeSrc)
    const fullSrc = path.join('src', relativeSrc)

    const imageMetadata = await Image(fullSrc, {
        widths: [null, 600, 900, 1500],
        formats: ['webp', 'jpeg'],
        outputDir: path.join('dist', imgDir),
        urlPath: imgDir,
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}-${width}w.${format}`
        },
    })

    const imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
    }
    if (className) {
        imageAttributes.class = className
    }

    return Image.generateHTML(imageMetadata, imageAttributes)
}
