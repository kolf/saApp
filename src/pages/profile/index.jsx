import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Text } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "../../npm/taro-ui/dist";
import storage from "../../utils/storage";
import ListItem from "../../components/list-item";
import "./index.scss";
import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import {
  submitDZ,
  updateGender,
  updateWorkStart,
  getUserInfo
} from "../../servers/apis";
import { getOptions, getOptionLabel } from "../../utils/options";
import { goTo } from "../../utils";
import getBaseUrl from "../../servers/baseUrl";
function loop(e) {
  e.stopPropagation();
}
const genders = getOptions("genders");
class Index extends Component {
  config = {
    navigationBarTitleText: "完善个人信息"
  };

  state = {
    confirmLoading: false,
    userInfo: {},
    submitUserInfo: {},
    genderNames: genders.map(o => o.label)
  };

  componentDidShow() {
    this.loadData();
    if (storage.get("submitRealName")) {
      this.setState({
        submitUserInfo: {
          ...this.state.submitUserInfo,
          realName: storage.get("submitRealName")
        }
      });
    }
  }

  loadData = () => {
    getUserInfo().then(res => {
      const userInfo = res.data;
      this.setState({
        userInfo
      });

      storage.set("userInfo", userInfo);
    });
  };

  getSubmitDisabledStatus = () => {
    const {
      userInfo: { workStart, avatarUrl, gender, realName }
    } = this.state;
    return !workStart || !avatarUrl || !gender || !realName;
  };

  handleSubmit = () => {
    this.setState({
      confirmLoading: true
    });
    submitDZ().then(res => {
      this.setState({
        confirmLoading: false
      });

      const { userInfo } = this.state;
      const checkStatus = userInfo.checkStatus;
      Taro.redirectTo({
        url: `/pages/review-result/index?checkStatus=${checkStatus}`
      });
    });
  };

  handleGenderChange = e => {
    Taro.showModal({
      title: "提示",
      content: "性别一经确认，无法修改，请正确选择您的性别"
    }).then(res => {
      if (!res.confirm) {
        return false;
      }

      const gender = genders[e.target.value].value;
      updateGender({ gender }).then(res => {
        const nextSubmitUserInfo = {
          ...this.state.submitUserInfo,
          gender
        };
        const nextUserInfo = {
          ...this.state.userInfo,
          gender
        };
        this.setState({
          userInfo: nextUserInfo,
          submitUserInfo: nextSubmitUserInfo
        });
      });
    });
  };

  // 手机号修改后，需要使用修改后的手机号重新登录

  handleDateChange = e => {
    Taro.showModal({
      title: "提示",
      content:
        "请正确选择您在本店工作的开始时间，如果输 入有误，可能会影响车主对您的选择"
    }).then(res => {
      if (!res.confirm) {
        return false;
      }

      const workStart = e.target.value;
      updateWorkStart({
        workStart
      }).then(res => {
        const nextSubmitUserInfo = {
          ...this.state.submitUserInfo,
          workStart
        };
        const nextUserInfo = {
          ...this.state.userInfo,
          workStart
        };
        this.setState({
          userInfo: nextUserInfo,
          submitUserInfo: nextSubmitUserInfo
        });
      });
    });
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

  render() {
    const { userInfo, genderNames, submitUserInfo } = this.state;
    if (!userInfo) {
      return null;
    }

    return (
      <View className="page bg-gray">
        <View className="content">
          <AtList className="gap-top">
            <AtListItem
              isRequire
              title="头像"
              extraThumb={userInfo.avatarUrl || defaultAvatarUrl}
              onClick={this.handleAvatarChange}
              arrow="right"
            />
            <AtListItem
              isRequire
              title="姓名"
              extraText={userInfo.realName || "必填项"}
              arrow={submitUserInfo.realName ? "" : "right"}
              onClick={
                submitUserInfo.realName ? loop : goTo.bind(this, "update-name")
              }
            />
            <ListItem
              title="性别"
              isRequire
              renderExtra={
                <Picker
                  disabled={submitUserInfo.gender ? true : false}
                  mode="selector"
                  range={genderNames}
                  onChange={this.handleGenderChange}
                >
                  <Text>
                    {userInfo.gender
                      ? getOptionLabel("genders", userInfo.gender)
                      : "必填项"}
                  </Text>
                </Picker>
              }
              arrow={submitUserInfo.gender ? "" : "right"}
            />
            <AtListItem isRequire title="手机号" extraText={userInfo.phone} />
          </AtList>
          <AtList className="gap-top">
            <ListItem
              title="开始工作时间"
              isRequire
              renderExtra={
                <Picker
                  disabled={submitUserInfo.workStart ? true : false}
                  mode="date"
                  onChange={this.handleDateChange}
                >
                  <Text>{userInfo.workStart || "必填项"}</Text>
                </Picker>
              }
              arrow={submitUserInfo.workStart ? "" : "right"}
            />

            <AtListItem title="门店名称" extraText={userInfo.disName} />
            <AtListItem
              title="所在部门"
              extraText={userInfo.departName || "无"}
            />
            <AtListItem
              title="职位"
              extraText={userInfo.positionName || "无"}
            />
          </AtList>
          <View className="next-button-wrap">
            <AtButton
              type="primary"
              onClick={this.handleSubmit}
              disabled={
                this.getSubmitDisabledStatus() || this.state.confirmLoading
              }
            >
              提交至店总审核
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
