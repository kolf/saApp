import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import "./index.scss";
import defaultAvatar from "../../assets/images/default-avatar.png";

class Index extends PureComponent {
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
export default Index;
