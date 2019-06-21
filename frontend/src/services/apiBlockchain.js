import axios from 'axios';

const apiBlockchain = axios.create({baseURL: 'http://localhost:3001/api'});

export default apiBlockchain;