const express = require('express');
const ProductsRouter = require('./productos/productos.routes');
const carritoRoutes = require('./cart/cart.routes');
const authRoutes = require('./auth/auth.routes');
const router = express.Router();

const productsRoutes = new ProductsRouter()
//Routes
router.use('/auth', authRoutes);
router.use('/productos', productsRoutes.start());
router.use('/carrito', carritoRoutes);

module.exports = router;