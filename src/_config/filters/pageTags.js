export const pageTags = (tags) => {
    const generalTags = ['all', 'nav', 'post', 'posts', 'home']

    return tags
        .toString()
        .split(',')
        .filter((tag) => {
            return !generalTags.includes(tag)
        })
}
