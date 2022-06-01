const axios = require('axios').default;

const getItemsById = async (id) => {
  try {
    return await axios.get(`/api/products/${id}`); 
  } catch (error) {
    console.error(error)
  }
}

const getItems = async () => {
  try {
    return await axios.get('/api/products/');
  } catch (error) {
    console.error(error)
  }
}

const createItem = async (item) => {
  try {
    return await axios.post('/api/products/', item);
  } catch (error) {
    console.error(error)
  }
}

const updateItem = async (id, item) => {
  try {
    return await axios.put(`/api/products/${id}`, item);
  } catch (error) {
    console.error(error)
  }
}

const deleteItem = async (id) => {
  try {
    return await axios.delete(`/api/products${id}`);
  } catch (error) {
    console.error(error)
  }
}


const response = Promise.all([
  // getItemsById(),
  // getItems(),
  createItem({
    title: '' ,
    description: '',
    code: '',
    imgUrl: '',
    price: 0,
    stock: 0,
  }),
  // updateItem(),
  // deleteItem()
]).then((res) => {
  console.log(res);    
  return res;
})

