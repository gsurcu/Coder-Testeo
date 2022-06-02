const axios = require('axios').default;

const getItemsById = async (id) => {
  try {
    return await axios.get(`http://localhost:8080/api/products/${id}`); 
  } catch (error) {
    console.error(error)
  }
}

const getItems = async () => {
  try {
    return await axios.get('http://localhost:8080/api/products/');
  } catch (error) {
    console.error(error)
  }
}

const createItem = async (item) => {
  try {
    return await axios.post('http://localhost:8080/api/products/', item,);
  } catch (error) {
    console.error(error)
  }
}

const updateItem = async (id, item) => {
  try {
    return await axios.put(`http://localhost:8080/api/products/${id}`, item);
  } catch (error) {
    console.error(error)
  }
}

const deleteItem = async (id) => {
  try {
    return await axios.delete(`http://localhost:8080/api/products${id}`);
  } catch (error) {
    console.error(error)
  }
}
// const postRes = createItem({
//   title: 'Mesa grande' ,
//   description: 'Dimesiones: 100cmx65cm, Altura: 100cm',
//   code: '123456',
//   imgUrl: 'fvdsfes',
//   price: 4500,
//   stock: 12,
// }).then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

const response = Promise.all([
  // getItemsById(),
  getItems(),
  // createItem({
  //   title: 'Mesa chica' ,
  //   description: 'Dimesiones: 40cmx65cm, Altura: 40cm',
  //   code: '123123',
  //   imgUrl: '',
  //   price: 1200,
  //   stock: 10,
  // }),
  // updateItem(),
  // deleteItem()
]).then((res) => {
  console.log(res);    
  return res;
}).catch((err) => console.log(err))
