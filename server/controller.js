
const database = require('./database');
const sha256 = require('crypto-js/sha256');

const addUserQuery = 'INSERT INTO appuser(username, password, signup) VALUES($1, $2, $3) RETURNING *';
const loginQuery = 'SELECT * FROM appuser WHERE username = $1 AND password = $2';
const usernameQuery = 'SELECT * FROM appuser WHERE username = $1';

exports.addUser = function (userDetails) {
  return new Promise(function(resolve, reject) {
    database.query(addUserQuery, [
      userDetails.username,
      userDetails.password,
      userDetails.signup,
    ], (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(err);
      }
    })
  });
};

exports.findUser = function (userDetails) {
  return new Promise(function(resolve, reject) {
    database.query(loginQuery, [
      userDetails.username,
      userDetails.password
    ], (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(false);
      }
    })
  });
};

exports.findUserByUsername = function (username) {
  return new Promise(function(resolve, reject) {
    database.query(usernameQuery, [
      username,
    ], (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(false);
      }
    })
  });
};

exports.findUsers = function () {
  return new Promise(function(resolve, reject) {
    database.query('SELECT * FROM appuser', (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(false);
      }
    })
  });
}
