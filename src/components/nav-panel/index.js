import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from "taro-ui";

export default function NavPanel({ title, children, onClick }) {
  return (
    <View className="nav-panel__root box-shadow" onClick={onClick || null}>
      <View className="nav-panel__header">
        <View>{title}</View>
        <AtIcon value="arrow" />
      </View>
      <View className="nav-panel__body">{children}</View>
    </View>
  );
}
