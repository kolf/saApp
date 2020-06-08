import Taro from "@tarojs/taro";
import { pageToLogin } from "./utils";
import { HTTP_STATUS } from "./config";
import modal from "../utils/modal";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;
  const { showToast } = requestParams;
  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      pageToLogin();
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      pageToLogin();
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      if (res.data.code === HTTP_STATUS.LOGIN_TIME) {
        pageToLogin();
        return Promise.reject("登录过期");
      } else if (res.data.code !== 200) {
        const errorMessage = res.data.message || "服务器出错，请稍候再试";
        if (showToast) {
          modal({
            content: errorMessage
          });
        }
        return Promise.reject(errorMessage);
      }
      return res.data;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
