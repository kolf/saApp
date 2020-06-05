import Taro from "@tarojs/taro";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  if (process.env.TARO_ENV === "h5") {
    return window.location.href.split("#/")[1].split("/");
  }
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  let path = getCurrentPageUrl();
  if (!path.includes("login")) {
    Taro.redirectTo({
      url: "/pages/login/index"
    });
  }
};

export const stringifyUrl = data => {
  return Object.keys(data)
    .reduce((result, key) => {
      return [...result, `${key}=${data[key]}`];
    }, [])
    .join("&");
};
