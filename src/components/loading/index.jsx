import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import imgUrl from "../../assets/images/ClearcutGrimyLeafhopper-max-1mb.gif";
import "./index.scss";
export default class Index extends Component {
  render() {
    return (
      <View className="loading__root">
        <Image src={imgUrl} mode="widthFix" style={{ width: "100%" }} />
      </View>
    );
  }
}
