import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "../../npm/taro-ui/dist";
import TabBar from "../../components/tabbar";
import ListItem from "../../components/list-item";
import "./index.scss";

import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import storage from "../../utils/storage";
import { goTo } from "../../utils";
import { getOptionLabel, getOptions } from "../../utils/options";
import { logout, updateBirthday, getUserInfo } from "../../servers/apis";
import getBaseUrl from "../../servers/baseUrl";
// const
class Index extends Component {
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
        <View className="content">
          <AtList className="gap-top">
            <AtListItem
              title="头像"
              extraThumb={userInfo.avatarUrl || defaultAvatarUrl}
              onClick={this.handleAvatarChange}
              arrow="right"
            />
            <AtListItem
              title="姓名"
              extraText={userInfo.realName || "未填写"}
            />
            <AtListItem
              title="性别"
              extraText={getOptionLabel("genders", userInfo.gender) || "未填写"}
            />
            <AtListItem
              title="手机号"
              extraText={userInfo.phone}
              arrow="right"
              className="no-border"
              onClick={goTo.bind(this, "update-phone")}
            />
          </AtList>
          <AtList className="gap-top">
            <AtListItem
              title="开始工作时间"
              extraText={userInfo.workStart || "未填写"}
            />
            <AtListItem title="门店名称" extraText={userInfo.disName} />
            <AtListItem
              title="职位"
              extraText={getOptionLabel("roles", userInfo.type)}
            />
            {userInfo.type === "FW" && (
              <AtListItem
                title="积分"
                arrow="right"
                onClick={goTo.bind(this, "my-integral")}
              />
            )}
            <AtListItem
              title="联系客服"
              arrow="right"
              onClick={goTo.bind(this, "service-index")}
              className="no-border"
            />
          </AtList>
          <View className="next-button-wrap">
            {userInfo.type === "FW" && (
              <View className="submit-button">
                <AtButton
                  style="marginButtom: 24px"
                  type="primary"
                  onClick={goTo.bind(this, "profile-card")}
                >
                  预览名片
                </AtButton>
              </View>
            )}
            <View className="submit-button">
              <AtButton
                loading={this.state.confirmLoading}
                type="secondary"
                onClick={this.handleLogout}
              >
                退出登录
              </AtButton>
            </View>
          </View>
        </View>
        <TabBar
          activeKey={2}
          tabKeys={["my-owner", "my-order", "my-profile"]}
        />
      </View>
    );
  }
}

export default Index;
