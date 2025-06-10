export const getAllPosts = (collection) => {
  return collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
};

export const tagList = (collection) => {
  const tagsSet = new Set();
  collection.getAll().forEach((item) => {
    if (!item.data.tags) return;
    item.data.tags.filter((tag) => !['posts', 'all', 'nav', 'home'].includes(tag)).forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
