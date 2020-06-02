import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import CountDown from "../../components/count-down";
import { register, verificationCode } from "../../servers/apis";
import storage from "../../utils/storage";
import "./index.scss";

class Index extends Component {
  config = {
    navigationBarTitleText: "注册"
  };

  state = {
    formData: {},
    confirmLoading: false
  };

  checkData = data => {
    if (!data.phone) {
      Taro.showToast({
        icon: "none",
        title: "请输入手机号"
      });
      return false;
    } else if (!data.vfCode) {
      Taro.showToast({
        icon: "none",
        title: "请输入验证码"
      });
      return false;
    } else if (!data.account) {
      Taro.showToast({
        icon: "none",
        title: "请输入经销店指定账号"
      });
      return false;
    } else if (!data.password) {
      Taro.showToast({
        icon: "none",
        title: "请输入经销店指定密码"
      });
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    const { formData } = this.state;
    if (!this.checkData(formData)) {
      return;
    }
    this.setState({
      confirmLoading: true
    });
    register(formData)
      .then(res => {
        this.setState({
          confirmLoading: false
        });

        const userInfo = res.data;
        storage.set("userInfo", userInfo);
        storage.set("JSESSIONID", userInfo.sessionId);

        if (userInfo.type === "DZ") {
          Taro.redirectTo({
            url: `/pages/my-employees/index`
          });
          return;
        }
        Taro.redirectTo({
          url: `/pages/profile/index`
        });
      })
      .catch(error => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  handleChange = (key, value) => {
    const nextFormData = {
      ...this.state.formData,
      [key]: value
    };
    this.setState({
      formData: nextFormData
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
        <View className="content">
          <AtForm>
            <AtInput
              clear
              type="phone"
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={this.handleChange.bind(this, "phone")}
              className="text-primary"
            >
              <CountDown onStart={this.sendSMS} disabled={this.isPhone()} />
            </AtInput>
            <AtInput
              clear
              type="text"
              maxLength="6"
              placeholder="请输入验证码"
              value={formData.vfCode}
              onChange={this.handleChange.bind(this, "vfCode")}
            />
            <AtInput
              clear
              type="text"
              placeholder="请输入经销店指定账号"
              value={formData.account}
              onChange={this.handleChange.bind(this, "account")}
            />
            <AtInput
              clear
              type="password"
              placeholder="请输入经销店指定密码"
              value={formData.password}
              onChange={this.handleChange.bind(this, "password")}
            />
          </AtForm>
          <View className="submit-button-wrap">
            <AtButton
              type="primary"
              onClick={this.handleSubmit}
              loading={this.state.confirmLoading}
            >
              注册开通
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
