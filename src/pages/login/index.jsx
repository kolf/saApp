import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "../../npm/taro-ui/dist";
import CountDown from "../../components/count-down";
import { goTo } from "../../utils";
import storage from "../../utils/storage";
import modal from "../../utils/modal";
import { isPhone } from "../../utils/validator";
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
          goTo(
            "review-result",
            {
              checkStatus
            },
            false
          );
          return;
        }

        if (type === "DZ") {
          goTo("admin-index", null, false);
        } else {
          goTo("owner-index", null, false);
        }
      })
      .catch(error => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  handleChange = (key, value) => {
    const nextValue = value.replace(/\D/g, "");
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: nextValue
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
    return formData.phone && formData.vfCode;
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
              <CountDown
                onStart={this.sendSMS}
                onError={this.showPhoneError}
                disabled={!isPhone(formData.phone)}
              />
            </AtInput>
            <AtInput
              clear
              type="number"
              maxLength="6"
              minLength="6"
              className="no-border"
              placeholder="请输入验证码"
              value={formData.vfCode}
              onChange={this.handleChange.bind(this, "vfCode")}
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
              登录
            </AtButton>
            <AtButton
              onClick={goTo.bind(this, 'register', null)}
              className="login__register-button btn-lg no-border"
            >
              我要开通帐号
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
