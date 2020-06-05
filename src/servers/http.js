import Taro from "@tarojs/taro";
import getBaseUrl from "./baseUrl";
import interceptors from "./interceptors";
import { stringifyUrl } from "./utils";
import storage from "../utils/storage";

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class httpRequest {
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    const JSESSIONID = storage.get("JSESSIONID");
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Cookie: JSESSIONID ? `SESSION=${JSESSIONID}` : null
      }
    };

    return Taro.request(option);
  }

  get(url, query = "") {
    let options = { url, data: query };
    return this.baseOptions(options);
  }

  post(url, query, options) {
    return this.baseOptions(
      {
        url: query ? `${url}?${stringifyUrl(query)}` : url,
        ...options
      },
      "POST"
    );
  }
}

export default new httpRequest();
