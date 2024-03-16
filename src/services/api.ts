// services/api.ts
import axios from 'axios';

const baseURL = 'https://raw.githubusercontent.com/alexanderboliva/test/main/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const DataGraph = async () => {
  try {
    const response = await api.get('api_example.json');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the API');
  }
};
