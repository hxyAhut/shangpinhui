// 对于axios二次封装
import axios from "axios";
// 引入进度条     
// start:进度条开始（请求拦截器捕获到请求时开始）  
// done:进度条结束(响应拦截器捕获到结束)
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// 在当前模块中引入store
import store from '@/store'


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，该值会自动加在url前面，绝对路径除外
    baseURL: "/api",
    // 代表请求超时的时间
    timeout: 5000,
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config:配置对象，有一个属性很重要：headers请求头
    // console.log(store)
    if (store.state.detail.uuid_token) {
        // 请求头携带数据，该数据字段(userTempId)不能瞎写，一定是与后台对应的
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 携带token数据
    if (store.state.registerAndLogin.token) {
        // token变量名也是与后台商量好的，已经在后台定义过的，方便后面读取的
        config.headers.token = store.state.registerAndLogin.token;
    }
    // 进度条开始
    nprogress.start();
    return config;
});

// 响应拦截器：
requests.interceptors.response.use((res) => {
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可检测到，可做一些事情

    // 进度条结束
    nprogress.done();
    // 返回值的data里面的数据才是我们真正想要的数据，只是axios返回的数据外面套了一层壳。
    return res.data;
}, (err) => {
    // 响应失败的回调函数
    // 终止promise链
    return Promise.reject(new Error('failed'));
})



// 对外暴露
export default requests;