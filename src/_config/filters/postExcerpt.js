module.exports = (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, '')
    return content.substring(0, content.lastIndexOf(' ', 200)) + '...'
}
