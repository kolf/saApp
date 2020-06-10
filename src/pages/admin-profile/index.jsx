import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "../../npm/taro-ui/dist";
import "./index.scss";

import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import storage from "../../utils/storage";
import { goTo } from "../../utils";
import { getOptionLabel, getOptions } from "../../utils/options";
import { logout, updateBirthday, getUserInfo } from "../../servers/apis";
import getBaseUrl from "../../servers/baseUrl";

export default class Index extends Component {
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
          <AtList className="no-border">
            {/* <AtListItem
              title="头像"
              extraThumb={userInfo.avatarUrl || defaultAvatarUrl}
              arrow="right"
              onClick={this.handleUpdateAvatar}
            /> */}
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
            <AtListItem title="经销店名称" extraText={userInfo.disName} />
            <AtListItem
              className="no-border"
              title="职位"
              extraText={getOptionLabel("roles", userInfo.type)}
            />
          </AtList>
          <View className="next-button-wrap">
            <AtButton
              type="secondary"
              className="btn-lg"
              onClick={this.handleLogout}
              loading={confirmLoading}
            >
              退出登录
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
