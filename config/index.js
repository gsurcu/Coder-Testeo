require('dotenv').config();

module.exports = {
  DB_URI: (database) => `mongodb+srv://gab121:${process.env.DB_PASSWORD}@appprueba.jibhv.mongodb.net/${database}?retryWrites=true&w=majority`
}