import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { AtButton } from "@/npm/taro-ui/dist";

import "./index.scss";
import indexUrl from "./index.png";
export default  class Index extends Component {
  config = {
    navigationBarTitleText: "规则说明"
  };

  render() {
    return (
      <View className="page rule-details__root">
        <Image src={indexUrl} mode="widthFix" style="width:100%" />
      </View>
    );
  }
}


