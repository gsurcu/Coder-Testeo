const productsDto = (product, _id, fyh) => {
  return {
    ...product,
    _id,
    fyh
  }
}

module.exports = productsDto;