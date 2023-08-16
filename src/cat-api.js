import axios from 'axios';

const GET_BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_BREED_IMG_URL = 'https://api.thecatapi.com/v1/images/search';

axios.defaults.headers.common['x-api-key'] =
  'live_xvDoAUrMe7N5q1bDjH0UhIdWe5pJ8j8KMI0nYHBOl7XeEIVByQJgzOjau1hh7t5k';

const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${GET_BREEDS_URL}`);
    return response.data;
  } catch (err) {
    console.error(err.toJSON());
  }
};

const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `${SEARCH_BREED_IMG_URL}?breed_ids=${breedId}`
    );
    return response.data;
  } catch (err) {
    console.error(err.toJSON());
  }
};

export { fetchBreeds, fetchCatByBreed };
