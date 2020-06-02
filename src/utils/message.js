import Taro from "@tarojs/taro";

export default function message(options) {
  Taro.showToast({
    ...options
  });
}
