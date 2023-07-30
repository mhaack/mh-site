const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  const API_KEY_PLAUSIBLE = process.env.API_KEY_PLAUSIBLE

  const plausibleUrl = new URL('https://plausible.io/api/v1/stats/breakdown');
  plausibleUrl.searchParams.append('site_id', 'markus-haack.com');
  plausibleUrl.searchParams.append('period', '12mo');
  plausibleUrl.searchParams.append('property', 'event:page');
  plausibleUrl.searchParams.append('metrics', 'pageviews,visitors');

  const res = EleventyFetch(plausibleUrl.toString(), {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${API_KEY_PLAUSIBLE}`,
      },
    },
  }).catch();
  const pages = await res;
  return pages.results;
};
