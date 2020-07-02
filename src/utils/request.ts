/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
 */
import { history } from 'umi';
import { extend } from 'umi-request';
import { notification } from 'antd';
import NProgress from 'nprogress';

// NProgress配置
NProgress.configure({ 
  easing: 'ease',    // 运行动画
  speed: 500,        // 动画速度
  trickle: false,    // 关闭自动递增
  showSpinner: true  // 控制loading展示
});
// 防止多次请求进度条重复加载
let loadingNum = 0;
function startLoading() {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum ++;
}
function endLoading() {
  loadingNum --;
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

const codeMessage: { [key: number]: string } = {
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
 * 捕获浏览器异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};


/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler,             // 默认错误处理
  prefix: "/api/business",  // 前缀，统一设置 url 前缀
  timeout: 300000,          // 超时时间
  credentials: 'include',   // 默认请求是否带上cookie
  // headers: {
  //   "Content-Type": "application/json"
  // },
});


// request拦截器, 改变url 或 options, 添加token
request.interceptors.request.use((url, options) => {

  startLoading();   // 设置加载进度条(开始..)

  const token = localStorage.getItem("x-auth-token");
  if (token) {
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    };
    return {
      url,
      options: { ...options, headers },
    };
  } else {

    return {
      url: url,
      options: { ...options },
    };
  }
});

// response拦截器, 处理response
request.interceptors.response.use(async response => {

  endLoading(); // 设置加载进度条(结束..)

  const data = await response.clone().json()

  if(data.code === 200) {
    return data.data;
  } else if (data.code === 500) {
    history.push('/layouts/500');
  } else if (data.code === 504) {
    notification.error({
      description: data.msg || '请求超时',
      message: data.msg || 504,
    });
  } else {
    notification.error({
      description: data.msg || '您的网络发生异常，无法连接服务器',
      message: data.msg,
    });
    // return response;
  }

});

export default request;