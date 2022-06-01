const express = require('express');
const ProductsRouter = require('./products/products.routes');
const CartsRouter = require('./cart/cart.routes');
const authRoutes = require('./auth/auth.routes');
const router = express.Router();

const productsRoutes = new ProductsRouter()
//Routes
router.use('/auth', authRoutes);
router.use('/products', productsRoutes.start());
router.use('/carrito', CartsRouter.start());

module.exports = router;