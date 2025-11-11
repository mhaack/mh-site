import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  const API_KEY_PLAUSIBLE = process.env.API_KEY_PLAUSIBLE;

  // Fetch all-time analytics
  const plausibleAPI = new URL('https://plausible.io/api/v2/query');
  const body = {
    "site_id": "markus-haack.com",
    "metrics": ["pageviews"],
    "date_range": "all",
    "dimensions": ["event:page"]
  };

  const allTimeRes = EleventyFetch(plausibleAPI.toString(), {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${API_KEY_PLAUSIBLE}`,
        'Content-Type': 'application/json',
      },
    },
  }).catch(e => {
    console.error(e);
    return [];
  });

  // Fetch last 12 months analytics
  body.date_range = "12mo";
  const last12MonthsRes = EleventyFetch(plausibleAPI.toString(), {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${API_KEY_PLAUSIBLE}`,
        'Content-Type': 'application/json',
      },
    },
  }).catch(e => {
    console.error(e);
    return [];
  });

  const [allTimePages, last12MonthsPages] = await Promise.all([allTimeRes, last12MonthsRes]);

  console.log("allTimePages");
  console.log(allTimePages);

  // Map allTimePages.results to desired format: { page: ..., pageviews: ... }
  const allTimeMapped = Array.isArray(allTimePages.results)
    ? allTimePages.results.map(entry => ({
        page: entry.dimensions[0],
        pageviews: entry.metrics[0]
      }))
    : [];

  const last12MonthsMapped = Array.isArray(last12MonthsPages.results)
    ? last12MonthsPages.results.map(entry => ({
        page: entry.dimensions[0],
        pageviews: entry.metrics[0]
      }))
    : [];


  return {
    allTime: allTimeMapped,
    last12Months: last12MonthsMapped,
  };
}
