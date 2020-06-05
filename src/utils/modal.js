import Taro from "@tarojs/taro";

export default function modal(options) {
  Taro.showModal({
    showCancel: false,
    ...options
  });
}
