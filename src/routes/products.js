const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');

// Get all products (public)
router.get('/', productController.getAllProducts);

// Get product by ID (public)
router.get('/:id', productController.getProductById);

// Create new product (requires authentication)
router.post('/', authenticate, productController.createProduct);

// Update product (requires authentication)
router.put('/:id', authenticate, productController.updateProduct);

// Delete product (requires authentication)
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
