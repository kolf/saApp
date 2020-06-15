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
    navigationBarTitleText: "信息展示墙"
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

  loadData = () => {
    getUserInfo().then(res => {
      const userInfo = res.data;
      this.setState({
        userInfo
      });

      storage.set("userInfo", userInfo);
    });
  };

  handleAvatarChange = () => {
    const JSESSIONID = storage.get("JSESSIONID");
    Taro.chooseImage({
      number: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: getBaseUrl("/api/") + "/api/v1/base/upload",
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

  render() {
    const { userInfo } = this.state;

    return (
      <View className="page bg-gray my-profile__root">
        <View className="my-profile__content">
          <View className="card card__has-avatar">
            <UserPanelAvatar
              imageUrl={userInfo.avatarUrl}
              onClick={this.handleAvatarChange}
            />

            <AtList className="no-border">
              <AtListItem
                title="姓名"
                extraText={userInfo.realName || "未填写"}
              />
              <AtListItem
                title="性别"
                extraText={
                  getOptionLabel("genders", userInfo.gender) || "未填写"
                }
              />
              <AtListItem
                title="手机号"
                extraText={userInfo.phone}
                arrow="right"
                className="no-border"
                onClick={goTo.bind(this, "update-phone", null)}
              />
            </AtList>
          </View>

          <View className="card" style={{ marginTop: "32rpx" }}>
            <AtList className="no-border">
              <AtListItem
                title="开始工作时间"
                extraText={userInfo.workStart || "未填写"}
              />
              <AtListItem title="经销店名称" extraText={userInfo.disName} />
              <AtListItem
                title="职位"
                className={userInfo.type === "FW" ? "" : "no-border"}
                extraText={getOptionLabel("roles", userInfo.type)}
              />
              {userInfo.type === "FW" && (
                <AtListItem
                  title="积分"
                  arrow="right"
                  className="no-border"
                  onClick={goTo.bind(this, "owner/pages/my-integral")}
                />
              )}
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
        {userInfo.type === "FW" && (
          <View className="next-button-wrap">
            <AtButton
              className="btn-lg btn-primary"
              style="marginButtom: 24px"
              type="primary"
              onClick={goTo.bind(this, "owner/pages/profile-card")}
            >
              预览名片
            </AtButton>
          </View>
        )}
      </View>
    );
  }
}
