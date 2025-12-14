import plausibleData from './plausible.json' with { type: 'json' };

function mapResults(results) {
  return Array.isArray(results)
    ? results.map(entry => ({
        page: entry.dimensions[0],
        pageviews: entry.metrics[0]
      }))
    : [];
}

export default function () {
  const results = plausibleData?.results || [];

  return {
    allTime: mapResults(results),
    last12Months: mapResults(results),
  };
}
