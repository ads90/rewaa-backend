'use strict';
var jwt = require("jsonwebtoken");
var dbConn = require('../config/db.config');
var bcrypt = require("bcryptjs");

//User object create
var User = function (user) {
  this.id = user.id;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.status = user.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

User.create = function (newProduct, result) {
  dbConn.query("INSERT INTO users set ?", newProduct, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('users : ', res);
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query("UPDATE users SET name=?,username=?,password=?,status=? , updated_at=? WHERE id = ?", [user.name, user.price, user.quantity, user.status, updated_at, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};


User.login = function (user, result) {
  var username = user.username.toLowerCase();
  dbConn.query("SELECT * FROM USERS WHERE Username= ?", [username], function (err, res) {
    if (!err) {
      if (res && res.length > 0 &&  bcrypt.compareSync(user.password, res[0].Password)) {
        delete res[0].Password;
        var userWithToken = generateToken(res[0]);
        result(null,userWithToken);
      }
      else { 
        result(null,null);
      }
    }
    else {
        console.log("error: ", err);
        result(err,null);
    }
    
  });
};

function generateToken(user) {
  const token = jwt.sign(
    { user_id: user.Id, email: user.Username },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1d",
    }
  );
  // save user token
  user.token = token;
  return user;
} 

module.exports = User;