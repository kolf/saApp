import Taro from "@tarojs/taro";

export default function modal(options) {
  return Taro.showModal({
    showCancel: false,
    ...options
  });
}
