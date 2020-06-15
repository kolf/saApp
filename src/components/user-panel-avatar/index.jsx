import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import defaultImageUrl from "@/assets/images/default-avatar.png";
import "./index.scss";

export default function UserPanelAvater({ imageUrl, onClick }) {
  return (
    <View className="user-panel-avatar__root">
      <Image
        className="user-panel-avatar__img"
        src={imageUrl || defaultImageUrl}
        mode="aspectFill"
        onClick={onClick || null}
      />
    </View>
  );
}
