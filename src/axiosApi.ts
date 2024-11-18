import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'https://period9-9d1e1-default-rtdb.firebaseio.com/',
});
