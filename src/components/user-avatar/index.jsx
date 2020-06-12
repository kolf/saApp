import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar } from "../../npm/taro-ui/dist";
import "./index.scss";
import defaultAvatar from "../../assets/images/default-avatar.png";

export default class Index extends PureComponent {
  render() {
    return (
      <View className="user-avatar__root">
        <AtAvatar image={this.props.avatarUrl || defaultAvatar} />
        <View className="user-avatar__content">
          <View className="user-avatar__name">{this.props.name}</View>
          <View className="user-avatar__desc">{this.props.desc}</View>
        </View>
      </View>
    );
  }
}

