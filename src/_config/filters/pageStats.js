export const pageStats = (post, analytics, dataset = 'allTime') => {
  // Handle both new object format {allTime: [...], last12Months: [...]} and old array format
  const analyticsData = Array.isArray(analytics) 
    ? analytics 
    : (analytics[dataset] || analytics.allTime || analytics);
  return analyticsData.filter((p) => p.page === post.url);
};
