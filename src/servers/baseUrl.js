const getBaseUrl = url => {
  let BASE_URL = "";
  if (process.env.NODE_ENV === "development") {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes("/api/")) {
      BASE_URL = "https://xcxjkdev.eqiying.com";
    }
  } else {
    // 生产环境
    if (url.includes("/api/")) {
      BASE_URL = "https://xcxjkdev.eqiying.com";
    }
  }
  return BASE_URL;
};
//
export default getBaseUrl;
