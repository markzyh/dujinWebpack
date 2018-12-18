import originaxios from 'axios'
import {globalLoginOut} from '@/api/fn'
import {
  MessageBox,
  Message,
  Notification 
} from 'element-ui';
import { resolve } from 'path';

originaxios.defaults.baseURL = 'http://dou.fudayiliao.com'
originaxios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

//let CancelToken = axios.CancelToken;
//let source = CancelToken.source();

// 添加请求 拦截器
originaxios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
/*   let token = getCookie("token");
  //config.data['Token'] = token
  if(!config.data['Token']){
    config.data['Token'] = token
  } */
  //console.log(config)
  return config;
}, error => {
  // 对请求错误做些什么
  Notification({
    message:'请求超时',
    title:'请求错误',
    type:'erroe'
  })
  return Promise.reject(error);
});

// 添加响应拦截器
originaxios.interceptors.response.use(res => {
  // 对响应数据做点什么
   if (res.data.Code == 1) {
    Notification({
      message: '账号或者密码错误,请您重新输入',
      title: '登陆出错',
      type: 'error'
    });
    return false
  }
  if (res.data.Code == 13) {
    //alert("该手机号已经注册,请您登陆");
    Notification({
      message: '该手机号已经注册,请您登陆',
      title: '注册出错',
      type: 'error'
    });
    return res
  }
  if (res.data.Code == 11) {
    globalLoginOut();
    let msg = '登录状态已过期,请重新登录'
    Notification({
      message: msg,
      title: '登录出错',
      type: 'error',
      onClose:() =>{
        window.location.reload()
      }
    });
    
    
    return false
    //
  }
  else {
    return res;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default originaxios

