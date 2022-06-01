const { errorLog } = require('../../../middlewares/logger');
const MongoDBContainer = require('../../containers/Mongodb.container');
const ProductsSchema = require('../../schemas/Product.schema');

class ProductsMongoDao extends MongoDBContainer {
  static instance;
  constructor(collection, db = 'ecommerce') {
    super(collection, db, ProductsSchema);
    if (!ProductsMongoDao.instance) {
      ProductsMongoDao.instance = this;
      return this;
    } else {
      return ProductsMongoDao.instance;
    }
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

module.exports = ProductsMongoDao;