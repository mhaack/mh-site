export const popularPosts = (posts, analytics) => {
  const topUrls = analytics.filter((p => p.page !== '/'));
  return posts
    .filter((post) => {
      if (topUrls.find((p) => p.page === post.url)) return true;
    })
    .sort((a, b) => {
      const pageviews = (page) => analytics.filter((p) => p.page === page.url).pop().pageviews;
      return pageviews(b) - pageviews(a);
    });
};
