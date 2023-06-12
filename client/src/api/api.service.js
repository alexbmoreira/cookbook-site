import axios from 'axios';

const api = axios.create();

export const fetchData = async (url) => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await api.get(`${process.env.REACT_APP_API_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error}`);
    throw error;
  }
};
