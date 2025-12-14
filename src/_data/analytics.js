import { Pirsch } from 'pirsch-sdk';
import { toISOString } from '../_config/filters/dates.js';

const clientId = process.env.PIRSCH_CLIENT_ID;
const clientSecret = process.env.PIRSCH_CLIENT_SECRET;
const hostname = process.env.PIRSCH_HOSTNAME || 'markus-haack.com';

if (!clientId || !clientSecret) {
  console.warn('Pirsch Client ID and Client Secret are required. Set PIRSCH_CLIENT_ID and PIRSCH_CLIENT_SECRET environment variables.');
}

// Only initialize Pirsch if credentials are available
let pirsch = null;
if (clientId && clientSecret) {
  try {
    pirsch = new Pirsch({
      clientId,
      clientSecret,
      hostname,
    });
  } catch (error) {
    console.error('Error initializing Pirsch SDK:', error);
  }
}

function mapPirschResults(results) {
  if (!Array.isArray(results)) {
    return [];
  }
  
  return results.map(entry => ({
    page: entry.path || '',
    pageviews: entry.views || 0
  }));
}

/**
 * Format date to YYYY-MM-DD string
 */
function formatDate(date) {
  if (typeof date === 'string') {
    return date;
  }
  return toISOString(date);
}

async function fetchPirschPages(fromDate, toDate) {
  // Return empty array if credentials are not configured or SDK not initialized
  if (!pirsch || !clientId || !clientSecret) {
    console.warn('Pirsch credentials not configured. Skipping analytics fetch.');
    return [];
  }

  try {
    // Get domain ID first
    const domain = await pirsch.domain();
    const domainId = domain.id;

    // Fetch pages statistics using the Pirsch API
    const response = await pirsch.pages({
      id: domainId,
      from: formatDate(fromDate),
      to: formatDate(toDate),
    });
    
    if (response instanceof Error) {
      console.error('Error fetching Pirsch pages:', response);
      return [];
    }

    return mapPirschResults(response || []);
  } catch (error) {
    console.error('Error fetching Pirsch statistics:', error);
    return [];
  }
}

export default async function () {
  const now = new Date();

  // Fetch all time statistics
  const allTimeStart = '2020-01-01';
  const allTime = await fetchPirschPages(allTimeStart, formatDate(now));
  
  // Fetch last 12 months statistics
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  const last12Months = await fetchPirschPages(formatDate(twelveMonthsAgo), formatDate(now));

  return {
    allTime,
    last12Months,
  };
}
