import axios from 'axios'

const api = axios.create({
    baseURL: 'http://marquinhos-mpsp-api.herokuapp.com'
})

export default api;