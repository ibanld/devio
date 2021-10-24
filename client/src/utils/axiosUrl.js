import axios from 'axios'

const API = axios.create({
    baseURL: 'https://cinqueterre.herokuapp.com/api/',
    timeout: 4000
  });

  export default API