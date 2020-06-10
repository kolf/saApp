import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "../../npm/taro-ui/dist";
import "./index.scss";
import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import storage from "../../utils/storage";

class Index extends Component {
  config = {
    navigationBarTitleText: "预览名片"
  };

  state = {
    userInfo: storage.get("userInfo")
  };

  render() {
    const { userInfo } = this.state;

    if (!userInfo) {
      return null;
    }

    return (
      <View className="page bg-gray profile-card__root">
        <View className="profile-card__content">
          <View className="profile-card__title">
            您好，我是您的{userInfo.positionName}
          </View>
          <View className="profile-card__avatar">
            <AtAvatar
              circle
              className="img"
              image={userInfo.avatarUrl || defaultAvatarUrl}
            />
          </View>
          <View className="profile-card__name">{userInfo.realName}</View>

          <View className="at-row profile-card__text">
            <View className="at-col at-col-4">职 位：</View>
            <View className="at-col">{userInfo.positionName}</View>
          </View>
          <View className="at-row profile-card__text">
            <View className="at-col at-col-4">服务经验：</View>
            <View className="at-col">{userInfo.workYear || "0"}年</View>
          </View>
          <View className="at-row profile-card__text">
            <View className="at-col at-col-4">联系方式：</View>
            <View className="at-col">{userInfo.phone}</View>
          </View>
          <View className="at-row profile-card__text">
            <View className="at-col at-col-4">经销店名称：</View>
            <View className="at-col at-col--wrap">{userInfo.disName}</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
