module.exports = (tags) => {
    const generalTags = ['all', 'nav', 'post', 'posts']

    return tags
        .toString()
        .split(',')
        .filter((tag) => {
            return !generalTags.includes(tag)
        })
}
