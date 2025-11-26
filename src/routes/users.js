const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

// Get all users (requires authentication)
router.get('/', authenticate, userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user (requires admin role)
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;
