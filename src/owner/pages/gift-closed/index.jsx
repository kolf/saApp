import { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import imgUrl from "@/assets/images/opening.svg";
import "./index.scss";
class Index extends Component {
  render() {
    return (
      <View className="gift-closed__root">
        <Image src={imgUrl} className="gift-closed__img" mode="widthFix" />
        <View className="gift-closed__title">本次活动已结束</View>
        <View className="gift-closed__desc">尽请期待下次活动</View>
      </View>
    );
  }
}
export default Index;
