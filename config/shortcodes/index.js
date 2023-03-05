const image = require('./image');

const currentYear = () => `${new Date().getFullYear()}`;

module.exports = {
  currentYear,
  image,
};
