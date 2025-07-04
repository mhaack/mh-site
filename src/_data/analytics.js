import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  const API_KEY_PLAUSIBLE = process.env.API_KEY_PLAUSIBLE;

  const now = new Date();
  const [nowDate] = now.toISOString().split('T');

  const plausibleUrl = new URL('https://plausible.io/api/v1/stats/breakdown');
  plausibleUrl.searchParams.append('site_id', 'markus-haack.com');
  plausibleUrl.searchParams.append('period', 'custom');
  plausibleUrl.searchParams.append('date', `2022-02-02,${nowDate}`);
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
}
