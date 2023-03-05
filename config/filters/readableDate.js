const { DateTime } = require('luxon')

module.exports = (dateObj) => DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL)
