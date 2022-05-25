const { DB_URI } = require('./index');

const DBConfig = {
  mongo: {
    uri: DB_URI,
    projection: { __v: 0 }
  }
}

module.exports = {
  DBConfig,
}