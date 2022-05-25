const yargs = require('yargs')
const { ProductsController } = require("./controllers/productos.controllers");

const productsController = new ProductsController();
const args = yargs(process.argv.slice(2)).argv;
const { cmd, id, title, description, price, stock, filter} = args

const actionsMap = {
  buscar: async ({ filter }) => await productsController.list(filter),
  buscarporid: async ({ id }) => await productsController.listById(id),
  agregar: async ({ title, description, price, stock }) => {
    const product = {
      title,
      description,
      price: +price,
      stock: +stock,
    };
    return await productsController.create(product);
  }
}

(async () => {
  try {
    if (cmd) {
      console.log('Starting process: ', cmd)
      const response = await actionsMap[cmd.toLowerCase()](args);
      console.table(response);
    }
  } catch (error) {
    console.log(error)
  }
})();