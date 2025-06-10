export const readingTime = (content) => {
  if (!content || typeof content !== 'string') {
    return '1 min read';
  }
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${readingTime} min read`;
}
