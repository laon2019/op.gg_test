import axios from "axios";

const api = axios.create({
    baseURL: "https://",
    // baseURL: "https://kr.api.riotgames.com/lol",
    headers: {"Content-Type": "application/json"}
})

api.interceptors.request.use(function (config){
    return config;
}, function (error){
    return Promise.reject(error);
});

api.interceptors.response.use(function (response){
    return response;
}, function (error){
    return Promise.reject(error);
});

export default api;