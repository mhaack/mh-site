module.exports = (slug, startTime) =>
    `<div class="w-full relative pt-96 mt-6"><iframe class="absolute top-0 left-0 w-full h-full" width="560" height="315" src="https://www.youtube.com/embed/${slug}${
        startTime ? `?start=${startTime}` : ''
    }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
