import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 进度条样式
import "nprogress/nprogress.css";

// 创建axios实例
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    return Promise.reject(new Error('failed'));
})

export default requests;