const Image = require('@11ty/eleventy-img')
const path = require('path')

module.exports = async (
    relativeSrc,
    alt = 'image',
    className,
    widths = [null, 400, 800, 1280],
    formats = ['jpeg', 'webp'],
    sizes = '100vw'
) => {
    const { dir: imgDir } = path.parse(relativeSrc)
    const fullSrc = path.join('src', relativeSrc)

    const imageMetadata = await Image(fullSrc, {
        widths,
        formats,
        outputDir: path.join('dist', imgDir),
        urlPath: imgDir,
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
