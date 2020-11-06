const moment = require("moment");

// format message and time
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;

