const config = require("../config");
const ProductsFactoryDao = require("../models/daos/Products.factory.dao");

// const ProductsDao = require('../models/daos/products/Products.mongo.dao')
class ProductsController {
  constructor() {
    this.productsDao = ProductsFactoryDao.get(config.TIPO_PERSISTENCIA)
    
  }

  create = async (req, res) => {
    try {
      const {title, price, imgUrl, code, description, stock} = req.body;
      
      if (title && price && imgUrl && code && description && stock) {
        const nuevoProducto = await this.productsDao.saveItem({title, price, imgUrl, code, description, stock });
        if (nuevoProducto) {
          return res.status(200).json(nuevoProducto);
        }
        return res.status(404).send("No se pudo guardar el producto")
      }
    
      return res.status(400).send("Faltan datos");
      
    } catch (error) {
      
    }
  };

  list = async (req, res) => {
    try {
      const { id } = req.params;
      if (id) {
        const producto = await this.productsDao.getById(id);
        return res.status(200).json(producto);
      }
      const producto = await this.productsDao.getAll(filter = {});
      return res.status(200).json(producto);
      
    } catch (error) {
      
    }
  }
  
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const item = req.body; console.log(item)
      
      const productoActualizado = await this.productsDao.updateItem( id, item );
      if (productoActualizado) {
        return res.status(200).json(productoActualizado);
      }
      return res.status(404).send("Producto no encontrado");
      
    } catch (error) {
      
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      
      if (id) {
        const productoEliminado = await this.productsDao.delItem(id);
        if (productoEliminado) {
          return res.status(200).json(productoEliminado);
        }
        return res.status(404).json({mensaje: "Producto no encontrado"});
      }
      
    } catch (error) {
      
    }
  };
}


module.exports = ProductsController;