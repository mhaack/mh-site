module.exports = (slug, startTime) =>
    `<div class="video-wrapper"><iframe class="youtube-player" width="560" height="315" src="https://www.youtube.com/embed/${slug}${startTime ? `?start=${startTime}` : ''}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
