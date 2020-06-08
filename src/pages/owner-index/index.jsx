import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { goTo } from "../../utils";
import storage from "../../utils/storage";

export default class Index extends Component {
  state = {
    userInfo: storage.get("userInfo") || {}
  };

  render() {
    return <View className="page owner-index__root">震天二</View>;
  }
}
