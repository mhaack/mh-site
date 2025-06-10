const image = require('./image');
const opengraphSource = require('./opengraphSource');

const currentYear = () => `${new Date().getFullYear()}`;

module.exports = {
  currentYear,
  image,
  opengraphSource,
};
