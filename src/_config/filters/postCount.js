export const postCountForYear = (posts, year) => {
  return posts.filter(function (post) {
    return post.data.page.date.getFullYear() === parseInt(year, 10);
  }).length;
};

export const postCountForMonth = (posts, year) => {
  let months = [];
  for (let month = 0; month < 12; month++) {
    let count = posts.filter(function (post) {
      let d = post.data.page.date;
      return d.getFullYear() === parseInt(year, 10) && d.getMonth() === month;
    }).length;

    months.push(count);
  }
  return months.join(',');
};
