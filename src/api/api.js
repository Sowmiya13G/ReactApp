import axios from 'axios';
const URL = 'https://fakestoreapi.com/products';

export const fetchProductsUsingFetch = () => {
  return fetch(URL)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching products using Fetch', error);
      throw error;
    });
};

export const fetchProductsUsingAxios = () => {
  return axios
    .get(URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching products using Axios', error);
      throw error;
    });
};
