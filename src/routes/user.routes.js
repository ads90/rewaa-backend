const express = require('express') 
const { authJwt } = require("../middlewares/authentication");
const { verifySignUp } = require("../middlewares");

const router = express.Router()
const userController =   require('../controllers/user.controller');
// Retrieve all users
//router.route('/').get(userController.findAll);


// Auth a new user
router.route('/signup').post([verifySignUp.checkDuplicateUsernameOrEmail],userController.create);
router.route('/login').post(userController.login) 

// router.route('/:id')
// // Retrieve a single user with id
// router.get(userController.findById);
// // Update a user with id
// router.put(userController.update);
// // Delete a user with id
// router.delete(userController.delete);


module.exports = router