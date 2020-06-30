
const sha256 = require('crypto-js/sha256');

exports.createToken = function (userDetails) {
  userDetails.date = Math.floor(new Date().getTime() / 1000 / 60 / 60);
  return String(sha256(JSON.stringify(userDetails)));
};
