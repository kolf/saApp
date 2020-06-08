import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";

export default function GoodsPanel({ name, imgurl, number, totalScore,onClick }) {
  return (
    <View className="goods-panel__root" onClick={onClick || null}>
      <View className="at-row">
        <View className="at-col at-col-4">
          <View className="goods-panel__left">
            <Image src={imgurl} mode="aspectFit" className="img" />
          </View>
        </View>
        <View className="at-col at-col-8">
          <View className="goods-panel__right">
            <View className="goods-panel__name">{name}</View>
            <View
              className="at-row goods-panel__text"
              style={{ marginTop: "12rpx" }}
            >
              <View className="at-col at-col-6">数量</View>
              <View className="at-col at-col-6 text-right">x{number}</View>
            </View>
            <View className="at-row goods-panel__text">
              <View className="at-col at-col-6">实际消费积分</View>
              <View className="at-col at-col-6 text-right">
                {totalScore}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
