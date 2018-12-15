import axios from 'axios'


axios.defaults.baseURL = 'http://dou.fudayiliao.com'
/* axios.defaults.headers = {
  'content-type': 'application/x-www-form-urlencoded'
}  */
/* axios.defaults.transformRequest = [ (data,config){

}] */
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

// 添加请求 拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //if(this.getCookie('token') != ''){
    return config;
  /* }else{
      alert('请您先登录')
  } */
  
  
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(res =>{
  // 对响应数据做点什么
  if (res.data.Code == 1) {
    alert("账号或者密码错误,请您重新输入");
    return false;
  }
  else{
    return res;
  }
  
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default axios
