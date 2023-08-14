import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const END_POINT = '/images/search?breed_ids=';

axios.defaults.headers.common['x-api-key'] =
  'live_xvDoAUrMe7N5q1bDjH0UhIdWe5pJ8j8KMI0nYHBOl7XeEIVByQJgzOjau1hh7t5k';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}`).then(response => {
    console.log(response);
    if (response.status !== 200) {
      console.log(response)
      throw new Error('Response error');
    }
    return response.data;
  });
}

export function fetchCatById(breedId) {
  return axios
    .get(`${BASE_URL}${END_POINT}${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(err => {
      console.log('Id error');
    });
}
