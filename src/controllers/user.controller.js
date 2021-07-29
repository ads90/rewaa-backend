'use strict';
const User = require('../models/user.model');
 
var bcrypt = require("bcryptjs");
exports.findAll = function (request, response) {
  User.findAll(function (err, user) {
    console.log('controller')
    if (err)
      response.send(err);
    console.log('response', user);
    response.send(user);
  });
};

exports.create = function (request, response) {
  const new_employee = new User(request.body);
  new_employee.password=bcrypt.hashSync(request.body.password, 8);
  new_employee.status=1;

  //handles null error
  if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
    response.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.create(new_employee, function (err, user) {
      if (err)
        response.send(err);
      response.json({ error: false, message: "User added successfully!", data: user });
    });
  }
};

exports.findById = function (request, response) {
  User.findById(request.params.id, function (err, user) {
    if (err)
      response.send(err);
    response.json(user);
  });
};

exports.update = function (request, response) {
  if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
    response.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.update(request.params.id, new User(request.body), function (err, user) {
      if (err)
        response.send(err);
      response.json({ error: false, message: 'User successfully updated' });
    });
  }
};

exports.delete = function (request, response) {
  User.delete(request.params.id, function (err, user) {
    if (err)
      response.send(err);
    response.json({ error: false, message: 'User successfully deleted' });
  });
};


exports.login = function (request, response) {
  if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
    response.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    User.login(new User(request.body), function (err, user) {
      if (err)
        response.send(err);
      if(!user)
      response.status(400).send({ error: true, message: 'User Not Found' });
      else
      response.json({ error: false, message: 'User loggedIn', data:user });
    });
  }
};

// exports.login = async (request, response, next) => {
//   try {
//     const user = new User();
//     let { username, password } = request.body;
//     const newUser = user.login(username, password);
//     response.status(200).json({
//       status: 200,
//       data: newUser,
//       message: ''
//     });
//   }
//   catch (error) {
//     console.log(error);
//     next(error);
//   }
// }