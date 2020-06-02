import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import CountDown from "../../components/count-down";
import storage from "../../utils/storage";
import logoUrl from "../../assets/images/logo_title.png";
import "./index.scss";

import { login, verificationCode } from "../../servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  state = {
    confirmLoading: false,
    formData: {}
  };

  handleLogin = () => {
    const { formData } = this.state;

    if (!formData.phone) {
      Taro.showToast({
        title: "请输入手机号",
        icon: "none"
      });
      return;
    }
    if (!formData.vfCode) {
      Taro.showToast({
        title: "请输入验证码",
        icon: "none"
      });
      return;
    }

    this.setState({
      confirmLoading: true
    });
    login(formData)
      .then(res => {
        this.setState({
          confirmLoading: false
        });
        const userInfo = res.data;
        const { sessionId, type, checkStatus } = userInfo;

        storage.set("JSESSIONID", sessionId);
        storage.set("userInfo", userInfo);

        if (checkStatus !== 1) {
          Taro.redirectTo({
            url: `/pages/review-result/index?checkStatus=${checkStatus}`
          });
          return;
        }

        if (type === "DZ") {
          Taro.redirectTo({
            url: `/pages/my-employees/index`
          });
          return;
        }
        Taro.redirectTo({
          url: `/pages/my-owner/index`
        });
      })
      .catch(error => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  gotoRegister = () => {
    Taro.navigateTo({
      url: `/pages/register/index`
    });
  };

  handleChange = (key, value) => {
    // this.state.formData[key] = value;
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: value
      }
    });
  };

  sendSMS = () => {
    const { phone } = this.state.formData;
    verificationCode({ phone });
  };

  isPhone = () => {
    const { phone } = this.state.formData;
    return !/^1[03456789]\d{9}$/.test(phone);
  };

  render() {
    const { formData } = this.state;
    return (
      <View className="page">
        <View className="page-content">
          <View className="login__title">
            <Image
              src={logoUrl}
              className="img"
              mode="widthFix"
              style="width:200px"
            />
          </View>
          <AtForm>
            <AtInput
              clear
              type="phone"
              maxLength="11"
              placeholder="请输入手机号"
              className="text-primary"
              value={formData.phone}
              onChange={this.handleChange.bind(this, "phone")}
            >
              <CountDown onStart={this.sendSMS} disabled={this.isPhone()} />
            </AtInput>
            <AtInput
              clear
              type="number"
              maxLength="6"
              minLength="6"
              placeholder="请输入验证码"
              value={formData.vfCode}
              onChange={this.handleChange.bind(this, "vfCode")}
            />
          </AtForm>
          <View className="submit-button-wrap">
            <AtButton
              type="primary"
              onClick={this.handleLogin}
              loading={this.state.confirmLoading}
            >
              登录
            </AtButton>
          </View>
        </View>
        <View className="page-footer">
          <AtButton
            onClick={this.gotoRegister}
            className="login__register-button text-primary"
          >
            我要开通帐号
          </AtButton>
        </View>
      </View>
    );
  }
}
