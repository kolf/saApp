import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "@/npm/taro-ui/dist";
import "./index.scss";

import UserPanelAvatar from "@/components/user-panel-avatar";
import storage from "@/utils/storage";
import { goTo } from "@/utils";
import { getOptionLabel, getOptions } from "@/utils/options";
import { logout, updateBirthday, getUserInfo } from "@/servers/apis";
import getBaseUrl from "@/servers/baseUrl";

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
          url: getBaseUrl("/api/v1") + "/api/v1/base/upload",
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
        <View className="my-profile__content">
          <View className="card card__has-avatar">
            <UserPanelAvatar
              imageUrl={userInfo.avatarUrl}
              onChange={this.handleAvatarChange}
              editable
            />
            <AtList className="no-border">
              <AtListItem
                title="姓名"
                extraText={userInfo.realName || "未填写"}
                arrow={userInfo.realName ? "" : "right"}
                onClick={
                  userInfo.realName
                    ? "javascript:;"
                    : goTo.bind(this, "/pages/update-name")
                }
              />
              <AtListItem
                title="手机号"
                extraText={userInfo.phone}
                arrow="right"
                onClick={goTo.bind(this, "/pages/update-phone")}
              />
              <AtListItem title="经销店名称" extraText={userInfo.disName} />
              <AtListItem
                className="no-border"
                title="职位"
                extraText={getOptionLabel("roles", userInfo.type)}
              />
            </AtList>
          </View>
        </View>
        <View style={{ padding: "0 32rpx" }}>
          <AtButton
            className="btn-lg btn-secondary box-shadow"
            loading={this.state.confirmLoading}
            type="secondary"
            onClick={this.handleLogout}
          >
            退出登录
          </AtButton>
        </View>
      </View>
    );
  }
}
