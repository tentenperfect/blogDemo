import Vue from 'vue'
import axios from 'axios'

//创建实例 设置默认值
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8321', //http://127.0.0.1:8321
    //timeout: 500000,
    changeOrigin: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,blogToken: sessionStorage.getItem('blogToken')}
})

//全局配置
//instance.defaults.timeout = 5000

//修改原型链
// Vue.property.$axios = axios

//请求拦截器
instance.interceptors.request.use(
    config => {
console.log(config);
        //判断请求类型，封装请求数据
        if (config.method == 'post') {
            // console.log("config: " + config.data);
            config.data = {
                ...config.data,
                // timeStamp: Date.parse(new Date())
                // Date.parse() 函数用于分析一个包含日期的字符串，
                //并返回该日期与 1970 年 1 月 1 日午夜之间相差的毫秒数。 
            }       
        } else if (config.method == 'get') {
            config.params = {
                ...config.params,
                // timeStamp: Date.parse(new Date())
            }
        }
        config.headers.blogToken = sessionStorage.getItem('blogToken') || ''
        console.log(config.headers.blogToken);
        return config
    },
    error => {
        console.log(error);
        return new Promise.reject(error)
    }


)

//相应拦截器
instance.interceptors.response.use(
    response => {
        console.log(response);
        return response = {
            ...response.data,
            // timeStamp: Date.parse(new Date())
                  
        }
    },
    error => {
        console.log(error);
        return new Promise(error)
    }
)

//暴露导出实例
export default instance;