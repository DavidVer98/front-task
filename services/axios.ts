import Axios  from 'axios'

const axiosInstance = Axios.create({
    baseURL: 'mongodb://mongo:HuShxzrEedbhJg1KWVZT@containers-us-west-96.railway.app:5883/api',
    headers: { 'X-Custom-Header': 'foobar' }
})

export default axiosInstance