import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import { AtIcon } from "../../npm/taro-ui/dist";

export default function NavPanel({ title, children, onClick }) {
  return (
    <View className="nav-panel__root box-shadow" onClick={onClick || null}>
      <View className="nav-panel__header">
        <Text className="nav-panel__title">{title}</Text>
        <View className="nav-panel__more">
          <AtIcon value="more" prefixClass="iconfont" size={16}/>
        </View>
      </View>
      <View className="nav-panel__body">{children}</View>
    </View>
  );
}
