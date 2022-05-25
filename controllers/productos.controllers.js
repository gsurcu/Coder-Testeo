const ProductsDao = require('../models/daos/Products.dao')

class ProductsController {
  constructor() {
    this.productsDao = new ProductsDao();
  }

  create = async (req, res) => {
    const {title, price, imgUrl, code, description, stock} = req.body;
    
    if (title && price && imgUrl && code && description && stock) {
      const nuevoProducto = await this.productsDao.saveItem({title, price, imgUrl, code, description, stock });
      if (nuevoProducto) {
        return res.status(200).send("Producto guardado");
      }
      return res.status(404).send("No se pudo guardar el producto")
    }
  
    return res.status(400).send("Faltan datos");
  };

  list = async (req, res) => {
    const { id } = req.params;
    if (id) {
      const producto = await this.productsDao.getById(id);
      return res.status(200).json(producto);
    }
    const producto = await this.productsDao.getAll(filter = {});
    return res.status(200).json(producto);
  }
  
  update = async (req, res) => {
    const { id } = req.params;
    const item = req.body; console.log(item)
    
    if ( Object.keys(item).length !== 0) {
      const productoActualizado = await this.productsDao.updateItem( id, item );
      if (productoActualizado) {
        return res.status(200).send("Producto actualizado");
      }
      return res.status(404).send("Producto no encontrado");
    }
  
    return res.status(400).send("No hay cambios");
  };

  delete = async (req, res) => {
    const { id } = req.params;
    
    if (id) {
      const productoEliminado = await this.productsDao.delItem(id);
      if (productoEliminado) {
        return res.status(200).json({mensaje: "Producto eliminado"});
      }
      return res.status(404).json({mensaje: "Producto no encontrado"});
    }
  };
}


module.exports = ProductsController;