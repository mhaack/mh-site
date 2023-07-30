module.exports = (posts, year) => {
  return posts.filter(function (post) {
    return post.data.page.date.getFullYear() === parseInt(year, 10);
  }).length;
};
