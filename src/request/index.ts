import axios from "axios";

let baseURL = import.meta.env.VITE_BACK_URL


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