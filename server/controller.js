
const database = require('./database');
const sha256 = require('crypto-js/sha256');

const addUserQuery = 'INSERT INTO appuser(username, password, signup) VALUES($1, $2, $3) RETURNING *';
const loginQuery = 'SELECT * FROM appuser WHERE username = $1 AND password = $2';
const usernameQuery = 'SELECT * FROM appuser WHERE username = $1';
const addTimerHistoryItemQuery = 'INSERT INTO timerhistoryitem(description, project, starttime, endtime, appuserusername) VALUES($1, $2, $3, $4, $5) RETURNING *';
const addProjectQuery = 'INSERT INTO project(name, color, appuserusername) VALUES($1, $2, $3) RETURNING *';

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

exports.findTimerHistoryItems = function (username) {
  return new Promise(function(resolve, reject) {
    database.query('SELECT * FROM timerhistoryitem WHERE appuserusername = $1', [username], (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(false);
      }
    })
  });
}

exports.findProjects = function (username) {
  return new Promise(function(resolve, reject) {
    database.query('SELECT * FROM project WHERE appuserusername = $1', [username], (err, res) => {
      console.log(err ? err.stack : res.rows);
      if (res) {
        resolve(res.rows);
      } else {
        reject(false);
      }
    })
  });
}

exports.addTimerHistoryItem = function (timerHistoryItemDetails) {
  return new Promise(function(resolve, reject) {
    database.query(addTimerHistoryItemQuery, [
      timerHistoryItemDetails.description,
      timerHistoryItemDetails.project,
      timerHistoryItemDetails.start,
      timerHistoryItemDetails.end,
      timerHistoryItemDetails.username,
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

exports.addProject = function (projectDetails) {
  return new Promise(function(resolve, reject) {
    database.query(addProjectQuery, [
      projectDetails.name,
      projectDetails.color,
      projectDetails.username,
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
