import Taro, { Component } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import { AtButton, AtIcon, AtForm } from "@/npm/taro-ui/dist";
import CountDown from "@/components/count-down";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
import { isPhone } from "@/utils/validator";
import logoUrl from "@/assets/images/logo_title.png";
import "./index.scss";

import { login, verificationCode } from "@/servers/apis";

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
          goTo("/admin/pages/index", null, false);
        } else {
          goTo("/owner/pages/index", null, false);
        }
      })
      .catch(error => {
        this.setState({
          confirmLoading: false
        });
      });
  };

  handleChange = (key, e) => {
    const nextValue = e.target.value.replace(/\D/g, "");
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
              style="width:160px"
            />
          </View>

          <View className="login__form">
            <View className="login__form-item">
              <View className="login__label">手机号</View>
              <View className="login__control">
                <View className="login__input-wrap">
                  <View className="login__input-icon"><AtIcon prefixClass='iconfont' value='phone' size={18}/></View>
                  <Input
                    className="login__input"
                    placeholder="请输入手机号"
                    value={formData.phone}
                    onChange={this.handleChange.bind(this, "phone")}
                    maxLength={11}
                  />
                  <View className="login__input-extra">
                    <CountDown
                      onStart={this.sendSMS}
                      onError={this.showPhoneError}
                      disabled={!isPhone(formData.phone)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="login__form-item">
              <View className="login__label">验证码</View>
              <View className="login__control">
                <View className="login__input-wrap">
                  <View className="login__input-icon"><AtIcon prefixClass='iconfont' value='password' size={18}/></View>
                  <Input
                    className="login__input"
                    placeholder="请输入验证码"
                    value={formData.vfCode}
                    maxLength={6}
                    onChange={this.handleChange.bind(this, "vfCode")}
                  />
                </View>
              </View>
            </View>
          </View>

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
              onClick={goTo.bind(this, "/pages/register", null)}
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
