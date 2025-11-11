export const popularPosts = (posts, analytics, dataset = 'allTime') => {

  // console.log("analytics");
  // console.log(analytics);

  const analyticsData = analytics[dataset];

  console.log("analyticsData");
  console.log(analyticsData);

  const topUrls = analyticsData.filter((p) => p.page !== '/');
  return posts
    .filter((post) => {
      if (topUrls.find((p) => p.page === post.url)) return true;
    })
    .sort((a, b) => {
      const pageviews = (page) => analyticsData.filter((p) => p.page === page.url).pop().pageviews;
      return pageviews(b) - pageviews(a);
    });
};
