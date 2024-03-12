import axios from "axios";

let baseURL = import.meta.env.VITE_BACK_URL ? 'http://localhost:3001' : 'http://47.98.128.173:3001'

console.log(baseURL);

const instance = axios.create({
    baseURL,
    timeout:30000
})

instance.interceptors.request.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
});

instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance