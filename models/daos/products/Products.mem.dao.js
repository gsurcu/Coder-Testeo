const MemoryContainer = require("../../containers/Memory.container")

class ProductsMemDao extends MemoryContainer {
  constructor() {
    super()
  }

  async saveItem(item) {
    try {
      const newItem = {...item, timeStamp: Date.now()}
      return await this.createItem(newItem)
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item = {}) {
    try {
      const indice = this.items.findIndex(prod => prod.id === +id);
      const updateItem = await this.getById(id);
      for (const key in item) {
        if (item[key] = '') {
          delete updateItem[key]
        } else {
          updateItem[key] = item[key];
        }
      }
      this.items[indice] = { ...updateItem };
      return updateItem
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delItem(id) {
    try {
      const indice = this.items.findIndex(prod => prod.id === +id);
      return this.items.splice(indice, 1);
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsMemDao;