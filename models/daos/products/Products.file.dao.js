const fs = require("fs");
const { errorLog } = require("../../../middlewares/logger");
const FileContainer = require("../../containers/File.container");

class ProductsFileDao extends FileContainer {
  constructor(fileName) {
    super(fileName)
  }

  async saveItem(item) {
    try {
      const products = this.getAll()
      products.push()
      const newItem = await this.createItem()
      return await this.createItem(newItem)
    } catch (error) {
      errorLog(error.message)
    }
  }
  
  async updateItem(id, item = {}) {
    try {
      const updateItem = await this.model.findOneAndUpdate(
        { _id: id },
        { $set: item },
        { returnDocument: "after"}
      ).lean()
      return updateItem
    } catch (error) {
      errorLog(error.message)
    }
  }

  async delItem(id) {
    try {
      const delItem = await this.model.findByIdAndDelete(id)
      return delItem
    } catch (error) {
      errorLog(error.message)
    }
  }
}

module.exports = ProductsFileDao;