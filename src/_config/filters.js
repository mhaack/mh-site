import { toISOString, formatDate, readableDate, year } from './filters/dates.js';
import { head } from './filters/collectionHead.js';
import { category } from './filters/collectionCategory.js';
import { pageTags } from './filters/pageTags.js';
import { postCountForMonth, postCountForYear } from './filters/postCount.js';
import { readingTime } from './filters/readingTime.js';
import { popularPosts } from './filters/popularPosts.js';
import { pageStats } from './filters/pageStats.js';
import { currentPage } from './filters/currentPage.js';

const sortByLastModified = (collection) =>
  [...collection].sort((a, b) => {
    const dateA = a.data.modified || a.date;
    const dateB = b.data.modified || b.date;
    return new Date(dateB) - new Date(dateA);
  });

export default {
  toISOString,
  formatDate,
  readableDate,
  year,
  head,
  category,
  pageTags,
  postCountForMonth,
  postCountForYear,
  readingTime,
  popularPosts,
  pageStats,
  currentPage,
  sortByLastModified,
};
