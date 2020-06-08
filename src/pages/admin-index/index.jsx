import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import NavPanel from "../../components/nav-panel";
import "./index.scss";
import { goTo } from "../../utils";
import storage from "../../utils/storage";
import leadUrl from "../../assets/images/lead.svg";
import noteLargeUrl from "../../assets/images/note-large.svg";
import usersLargeUrl from "../../assets/images/users-large.svg";
import serviceUrl from "../../assets/images/service.svg";
import userLargeUrl from "../../assets/images/user-large.svg";

export default class Index extends Component {
  state = {
    userData: storage.get("userInfo") || {}
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
    const { userData } = this.state;

    return (
      <View className="page admin-index__root">
        <View className="admin-index__header">
          <View className="admin-index__header-title">
            <View className="admin-index__header-name">
              你好，{userData.positionName}
            </View>
            <View className="admin-index__header-desc">{userData.disName}</View>
          </View>
          <View className="admin-index__header-avatar">
            <AtAvatar image={userData.avatarUrl} circle />
          </View>
        </View>
        <View style={{ margin: "16rpx -16rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <View className="admin-index__nav" style={{ fontSize: 0 }}>
                <Image
                  src={leadUrl}
                  className="img"
                  style={{ width: "100%", fontSize: 0 }}
                  mode="widthFix"
                />
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="admin-index__nav">
                <NavPanel
                  title="员工订单"
                  onClick={this.handleClick.bind(this, "all-order")}
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
              <View className="admin-index__nav">
                <NavPanel
                  title="员工列表"
                  onClick={this.handleClick.bind(this, "my-employees")}
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
              <View className="admin-index__nav">
                <NavPanel
                  title="联系客服"
                  onClick={this.handleClick.bind(this, "service-index")}
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
              <View className="admin-index__nav">
                <NavPanel
                  title="我的"
                  onClick={this.handleClick.bind(this, "admin-profile")}
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
