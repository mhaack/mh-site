export const getAllPosts = (collection) => {
  return collection
    .getFilteredByGlob('./src/posts/**/*.md')
    .sort((a, b) => new Date(a.data.modified || a.data.date) - new Date(b.data.modified || b.data.date));
};

export const tagList = (collection) => {
  const tagsSet = new Set();
  collection.getAll().forEach((item) => {
    if (!item.data.tags) return;
    item.data.tags
      .filter((tag) => !['posts', 'all', 'nav', 'home', 'pages'].includes(tag))
      .forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
