import Axios  from 'axios'

const axiosInstance = Axios.create({
    baseURL: 'https://back-node-mongo-production.up.railway.app/api/',
    headers: { 'X-Custom-Header': 'foobar' }
})

export default axiosInstance