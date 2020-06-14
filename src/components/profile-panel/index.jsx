import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";
import defaultAvatarUrl from "../../assets/images/default-avatar.png";

export default class Index extends Component {
  render() {
    const { dataSource, style } = this.props;

    if (!dataSource) {
      return null;
    }

    return (
      <View className="profile-panel__root" style={style}>
        <View className="profile-panel__title">您好，我是您的服务顾问</View>
        <View className="profile-panel__avatar">
          <Image
            className="img"
            src={dataSource.avatarUrl || defaultAvatarUrl}
            mode="aspectFill"
          />
        </View>
        <View className="profile-panel__name">{dataSource.realName}</View>

        <View className="at-row profile-panel__text">
          <View className="at-col at-col-4">职 位：</View>
          <View className="at-col text-right">服务顾问</View>
        </View>
        <View className="at-row profile-panel__text">
          <View className="at-col at-col-4">服务经验：</View>
          <View className="at-col text-right">
            {dataSource.workYear || "0"}年
          </View>
        </View>
        <View className="at-row profile-panel__text">
          <View className="at-col at-col-4">联系方式：</View>
          <View className="at-col text-right">{dataSource.phone}</View>
        </View>
        <View className="at-row profile-panel__text">
          <View className="at-col at-col-4">经销店名称：</View>
          <View className="at-col text-right at-col--wrap">
            {dataSource.disName}
          </View>
        </View>
      </View>
    );
  }
}
