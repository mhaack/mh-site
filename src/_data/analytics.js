import EleventyFetch from '@11ty/eleventy-fetch';

const API_URL = 'https://plausible.io/api/v2/query';

async function fetchAnalytics(dateRange, apiKey) {
  const body = {
    site_id: "markus-haack.com",
    metrics: ["pageviews"],
    date_range: dateRange,
    dimensions: ["event:page"]
  };

  try {
    const response = await EleventyFetch(API_URL, {
      duration: '1h',
      type: 'json',
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    });
    return response?.results || [];
  } catch (e) {
    console.error(`Error fetching analytics for ${dateRange}:`, e);
    return [];
  }
}

function mapResults(results) {
  return Array.isArray(results)
    ? results.map(entry => ({
        page: entry.dimensions[0],
        pageviews: entry.metrics[0]
      }))
    : [];
}

export default async function () {
  const API_KEY_PLAUSIBLE = process.env.API_KEY_PLAUSIBLE;

  const [allTimePages, last12MonthsPages] = await Promise.all([
    fetchAnalytics('all', API_KEY_PLAUSIBLE),
    fetchAnalytics('12mo', API_KEY_PLAUSIBLE)
  ]);

  return {
    allTime: mapResults(allTimePages),
    last12Months: mapResults(last12MonthsPages),
  };
}
