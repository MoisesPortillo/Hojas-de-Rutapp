const timeago = require('timeago.js');     // Para conocer la hora del registro
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

module.exports = helpers;