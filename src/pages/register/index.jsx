import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "@/npm/taro-ui/dist";
import CountDown from "@/components/count-down";
import { register, verificationCode } from "@/servers/apis";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
import { isPhone } from "@/utils/validator";
import "./index.scss";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "注册"
  };

  state = {
    formData: {},
    confirmLoading: false
  };

  handleSubmit = () => {
    const { formData } = this.state;

    if (!isPhone(formData.phone)) {
      modal({
        content: "请输入正确的手机号"
      });
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
          goTo("/admin/pages/index", null, false);
          return;
        }

        goTo("/pages/profile", null, false);
      })
      .catch(error => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  handleChange = (key, value) => {
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

  showPhoneError = () => {
    modal({
      content: "请输入正确的手机号"
    });
  };

  checkFormData = () => {
    const { formData } = this.state;
    return (
      formData.phone && formData.vfCode && formData.account && formData.password
    );
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
              <CountDown
                onStart={this.sendSMS}
                onError={this.showPhoneError}
                disabled={!isPhone(formData.phone)}
              />
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
          <View className="next-button-wrap">
            <AtButton
              type="primary"
              className="btn-primary btn-lg"
              onClick={this.handleSubmit}
              loading={this.state.confirmLoading}
              disabled={!this.checkFormData()}
            >
              注册开通
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
