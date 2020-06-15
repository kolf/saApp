import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "@/npm/taro-ui/dist";
import CountDown from "@/components/count-down";
import "./index.scss";
import { updatePhone, verificationCode } from "@/servers/apis";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
import { isPhone } from "@/utils/validator";
import { goTo } from "@/utils";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "修改手机号"
  };

  state = {
    confirmLoading: false,
    formData: {
      phone: "",
      vfCode: ""
    }
  };

  handleSubmit = () => {
    const {
      formData: { phone, vfCode }
    } = this.state;

    if (!isPhone(phone)) {
      modal({
        content: "请输入正确的手机号"
      });
      return;
    }

    modal({
      title: "修改手机号",
      content: "手机号修改后，需要使用修改后的手机号重新登录",
      showCancel: true
    }).then(res => {
      if (!res.confirm) {
        return false;
      }

      this.setState({
        confirmLoading: true
      });
      updatePhone({ phone, vfCode }).then(res => {
        this.setState({
          confirmLoading: false
        });
        storage.clear();
        goTo("/pages/login", null, false);
      });
    });
  };

  handleChange = (field, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: value
      }
    });
    // this.state.formData[field] = val
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
        <AtForm>
          <AtInput
            clear
            type="phone"
            maxLength="11"
            value={formData.phone}
            onChange={this.handleChange.bind(this, "phone")}
            placeholder="请输入新手机号"
            className="text-primary"
          >
            <CountDown
              onStart={this.sendSMS}
              onError={this.showPhoneError}
              disabled={!isPhone(formData.phone)}
            />
          </AtInput>
          <AtInput
            className='no-border'
            clear
            type="number"
            maxLength="6"
            minLength="6"
            value={formData.vfCode}
            onChange={this.handleChange.bind(this, "vfCode")}
            placeholder="请输入验证码"
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
            确定
          </AtButton>
        </View>
      </View>
    );
  }
}
