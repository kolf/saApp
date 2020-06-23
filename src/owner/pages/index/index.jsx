import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "@/npm/taro-ui/dist";
import NavPanel from "@/components/nav-panel";
import "./index.scss";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import leadUrl from "@/assets/images/lead.svg";
import noteLargeUrl from "@/assets/images/note-large.svg";
import usersLargeUrl from "@/assets/images/users-large.svg";
import serviceUrl from "@/assets/images/service.svg";
import userLargeUrl from "@/assets/images/user-large.svg";

export default class Index extends Component {
  confit = {
    disableScroll: true
  };

  state = {
    userInfo: storage.get("userInfo") || {}
  };

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }

  handleClick = name => {
    goTo(name);
  };

  render() {
    const { userInfo } = this.state;

    return (
      <View className="page owner-index__root">
        <View className="owner-index__header">
          <View className="owner-index__header-title">
            <View className="owner-index__header-name">
              你好，{userInfo.positionName}
            </View>
            <View className="owner-index__header-desc">{userInfo.disName}</View>
          </View>
          <View className="owner-index__header-avatar">
            <AtAvatar image={userInfo.avatarUrl} circle />
          </View>
        </View>
        <View style={{ margin: "16rpx -16rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <View
                className="owner-index__nav owner-index__hero"
                style={{ fontSize: 0 }}
              >
                <Image
                  src={leadUrl}
                  className="img"
                  style={{ width: "100%", fontSize: 0 }}
                  mode="widthFix"
                />
                <Text className="owner-index__hero-text">
                  功能即将上线，敬请期待
                </Text>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="owner-index__nav">
                <NavPanel
                  title="我的业绩"
                  onClick={goTo.bind(this, "/owner/pages/my-order", null)}
                >
                  <Image
                    src={noteLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="owner-index__nav">
                <NavPanel
                  title="客户列表"
                  onClick={goTo.bind(this, "/owner/pages/my-user", null)}
                >
                  <Image
                    src={usersLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="owner-index__nav">
                <NavPanel
                  title="联系客服"
                  onClick={goTo.bind(this, "/pages/service-index")}
                >
                  <View className="nav-icon">
                    <Image
                      src={serviceUrl}
                      mode="widthFix"
                      className="img nav-icon"
                    />
                  </View>
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="owner-index__nav">
                <NavPanel
                  title="信息展示墙"
                  onClick={goTo.bind(this, "/owner/pages/profile", null)}
                >
                  <Image
                    src={userLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
