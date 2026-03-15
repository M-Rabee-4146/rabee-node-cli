const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, restrictTo, checkIfFirstUser } = require('../middleware/authMiddleware');
const router = express.Router();

// USERS
router.post("/login", userController.userLogin);
router.post("/signup", userController.userSignup); 
router.post("/forget", userController.userForgotPassword);
router.post("/Reset", userController.userResetPassword);

// Protected routes
router.use(verifyToken);
router.get("/", restrictTo('admin'), userController.getAllUsers);
router.get("/:id", restrictTo('admin'), userController.getUserById);
router.put("/:id", restrictTo('admin'), userController.EditUserById);
router.put("/:id/status", restrictTo('admin'), userController.toggleUserStatus);
router.delete("/:id", restrictTo('admin'), userController.deleteUserById);

module.exports = router;
