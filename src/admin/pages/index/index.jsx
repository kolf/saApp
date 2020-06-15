import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "@/npm/taro-ui/dist";
import NavPanel from "@/components/nav-panel";
import HreoChart from "./HreoChart";
import "./index.scss";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import noteLargeUrl from "@/assets/images/note-large.svg";
import usersLargeUrl from "@/assets/images/users-large.svg";
import serviceUrl from "@/assets/images/service.svg";
import userLargeUrl from "@/assets/images/user-large.svg";

export default class Index extends Component {
  state = {
    userInfo: storage.get("userInfo") || {}
  };

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }


  render() {
    const { userInfo } = this.state;

    return (
      <View className="page admin-index__root">
        <View className="admin-index__header">
          <View className="admin-index__header-title">
            <View className="admin-index__header-name">
              你好，{userInfo.positionName}
            </View>
            <View className="admin-index__header-desc">{userInfo.disName}</View>
          </View>
          <View className="admin-index__header-avatar">
            <AtAvatar image={userInfo.avatarUrl} circle />
          </View>
        </View>
        <View style={{ margin: "16rpx -16rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <View className="admin-index__nav">
                <NavPanel
                  title="报表"
                  onClick={goTo.bind(this, "/admin/pages/report-index")}
                >
                  <HreoChart />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="admin-index__nav">
                <NavPanel
                  title="员工订单"
                  onClick={goTo.bind(this, "/admin/pages/order-category")}
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
                  onClick={goTo.bind(this, "/admin/pages/my-owner")}
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
              <View className="admin-index__nav">
                <NavPanel
                  title="我的"
                  onClick={goTo.bind(this, "/admin/pages/profile")}
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
