import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "taro-ui";
import TabBar from "../../components/tabbar";
import "./index.scss";

import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import storage from "../../utils/storage";
import { goTo } from "../../utils";
import { getOptionLabel, getOptions } from "../../utils/options";
import { logout, updateBirthday, getUserInfo } from "../../servers/apis";
import getBaseUrl from "../../servers/baseUrl";

class Index extends Component {
  config = {
    navigationBarTitleText: "我的"
  };

  state = {
    confirmLoading: false,
    userInfo: storage.get("userInfo") || {},
    genders: getOptions("genders").map(o => o.label)
  };

  componentDidShow() {
    this.loadData();
  }

  handleLogout = () => {
    this.setState({
      confirmLoading: true
    });
    logout().then(res => {
      storage.clear();
      Taro.redirectTo({
        url: "/pages/login/index"
      });
    });
  };

  handleBirthdayChange = e => {
    updateBirthday({ birthday: e.target.value }).then(res => {});
  };

  handleAvatarChange = () => {
    const JSESSIONID = storage.get("JSESSIONID");
    Taro.chooseImage({
      number: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: getBaseUrl("/api/v1/base/upload") + "/api/v1/base/upload",
          filePath: tempFilePaths[0],
          name: "file",
          header: {
            Cookie: JSESSIONID ? `SESSION=${JSESSIONID}` : null
          },
          success: res => {
            const avatarUrl = JSON.parse(res.data).data;
            const nextUserInfo = {
              ...this.state.userInfo,
              avatarUrl
            };
            this.setState({
              userInfo: nextUserInfo
            });

            storage.set("userInfo", nextUserInfo);
          }
        });
      }
    });
  };

  loadData = () => {
    getUserInfo().then(res => {
      const userInfo = res.data;
      this.setState({
        userInfo
      });

      storage.set("userInfo", userInfo);
    });
  };

  render() {
    const { userInfo, confirmLoading } = this.state;

    return (
      <View className="page bg-gray my-profile__root">
        <View className="content">
          <AtList className="gap-top">
            <AtListItem
              title="头像"
              extraThumb={userInfo.avatarUrl || defaultAvatarUrl}
              arrow="right"
              onClick={this.handleUpdateAvatar}
            />
            <AtListItem
              title="姓名"
              extraText={userInfo.realName || "未填写"}
              arrow={userInfo.realName ? "" : "right"}
              onClick={
                userInfo.realName
                  ? "javascript:;"
                  : goTo.bind(this, "update-name")
              }
            />
            <AtListItem
              title="手机号"
              extraText={userInfo.phone}
              arrow="right"
              onClick={goTo.bind(this, "update-phone")}
            />
            <AtListItem title="门店名称" extraText={userInfo.disName} />
            <AtListItem
              title="职位"
              extraText={getOptionLabel("roles", userInfo.type)}
            />
            <AtListItem
              title="联系客服"
              arrow="right"
              onClick={goTo.bind(this, "service-index")}
              className="no-border"
            />
          </AtList>
          <View className="submit-button-wrap">
            <View className="submit-button">
              <AtButton
                type="secondary"
                onClick={this.handleLogout}
                loading={confirmLoading}
              >
                退出登录
              </AtButton>
            </View>
          </View>
        </View>
        <TabBar
          activeKey={3}
          tabKeys={["my-employees", "report", "all-order", "admin-profile"]}
        />
      </View>
    );
  }
}

export default Index;
