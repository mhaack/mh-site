const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const isProd = process.env.ELEVENTY_ENV === 'production'

module.exports = eleventyConfig => {
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, className, sizes = '(min-width: 1024px) 70vw, 95vw') {
		const file = path.join('content', src);
		const metadata = await eleventyImage(file, {
			widths: [500, 900, 1500, 'auto'],
			formats: [isProd ? 'avif' : 'auto', 'webp', 'auto'],
			urlPath: "/images/", 
			outputDir: path.join(eleventyConfig.dir.output, "images"),
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				return `${name}-${width}w.${format}`;
			},
		});

		const imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};
		if (className) {
			imageAttributes.class = className
		}
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};