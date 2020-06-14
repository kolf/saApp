import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ProfilePanel from "../../components/profile-panel";
import "./index.scss";
import storage from "../../utils/storage";
export default class Index extends Component {
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
      <View className="page profile-card__root">
        <View style={{ margin: "auto", width: "100%" }}>
          <ProfilePanel dataSource={userInfo} />
        </View>
      </View>
    );
  }
}
