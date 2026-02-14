export const popularPosts = (posts, analytics, dataset = 'allTime') => {
  const analyticsData = analytics[dataset] || [];
  const topUrls = analyticsData.filter((p) => p.page !== '/');
  return posts
    .filter((post) => {
      if (topUrls.find((p) => p.page === post.url)) return true;
    })
    .sort((a, b) => {
      const pageviews = (page) => {
        const stats = analyticsData.find((p) => p.page === page.url);
        return stats ? stats.pageviews : 0;
      };
      return pageviews(b) - pageviews(a);
    });
};
