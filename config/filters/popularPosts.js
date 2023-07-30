module.exports = (posts, analytics) => {
  const topUrls = analytics.filter((p => p.page !== '/'));
  return posts
    .filter((post) => {
      if (topUrls.find((p) => p.page === post.url)) return true;
    })
    .sort((a, b) => {
      const visitors = (page) => analytics.filter((p) => p.page === page.url).pop().visitors;
      return visitors(b) - visitors(a);
    });
};
