/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */

import axios from 'axios';
import { extend } from 'umi-request';
import { notification } from 'antd';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */

// const request = extend({
// prefix: 'http://localhost:8923',
// errorHandler,
// default error handling
// credentials: 'include', // Does the default request bring cookies
// });

let request = axios.create({
  // baseURL: 'http://localhost:8923',
  // baseURL: 'http://123.60.215.79:8000',
  timeout: 2000,
});

request.interceptors.request.use((config) => {
  let token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

//   request.interceptors.response.use(
//     async (data) => {
//       return data;
//     },
//     (error) => {
//       if (error.response && error.response.status) {
//         const { response } = error;

//         const errorText = codeMessage[response.status] || response.statusText;

//         notification.error({
//           message: `请求错误： ${response.status}`,
//           description: errorText,
//         });

//         if (response.status === 401) {
//           console.log(401);
//           setTimeout(() => history.push('/login'), 2000);
//         }

//         return Promise.reject(error.response.data);
//       } else {
//         notification.error({
//           message: `请求错误： ${error.message}`,
//         });
//         return Promise.reject(error);
//       }
//     }
//   );

export default request;
