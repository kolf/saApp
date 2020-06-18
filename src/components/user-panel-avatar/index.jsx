import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import defaultImageUrl from "@/assets/images/default-avatar.png";
import editUrl from "@/assets/images/edit-cover.svg";
import "./index.scss";

function handleClick(imgUrl) {
  if (!imgUrl) {
    return;
  }

  Taro.previewImage({
    current: imgUrl,
    urls: [imgUrl]
  });
}

export default function UserPanelAvater({ imageUrl, editable, onChange }) {
  return (
    <View className="user-panel-avatar__root">
      <Image
        className="user-panel-avatar__img"
        src={imageUrl || defaultImageUrl}
        mode="aspectFill"
        onClick={handleClick.bind(this, imageUrl)}
      />
  
        {editable && <Image
          src={editUrl}
          className="user-panel-avatar__icon"
          mode="aspectFill"
          onClick={onChange}
        />}
     
    </View>
  );
}
