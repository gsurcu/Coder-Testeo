const { errorLog } = require("../../../middlewares/logger");
const FileContainer = require("../../containers/File.container");

class ProductsFileDao extends FileContainer {
  constructor(fileName) {
    super(fileName)
  }

  async saveItem(item) {
    try {
      const items = await this.getAll()
      items.push(item)
      return await this.createItem(items)
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item = {}) {
    try {
      const items = await this.getAll()
      const indice = items.findIndex(prod => prod.id === id);
      if (indice) {
        const updateItem = await this.getById(id);
        for (const key in item) {
          if (item[key] = '') {
            delete updateItem[key];
          } else {
            updateItem[key] = item[key];
          }
        }
        items[indice] = { ...updateItem };
        await this.createItem(items);
        return updateItem;
      }
      return false
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delItem(id) {
    try {
      const docs = await this.getAll();
      if (docs) {
        const newDocs = docs.filter(item => item._id !== id);
        return await this.createItem(newDocs);
      }
      return false;
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsFileDao;