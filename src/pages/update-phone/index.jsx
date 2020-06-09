import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "../../npm/taro-ui/dist";
import CountDown from "../../components/count-down";
import "./index.scss";
import { updatePhone, verificationCode } from "../../servers/apis";
import storage from "../../utils/storage";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "修改手机号"
  };

  state = {
    formData: {
      phone: "",
      vfCode: ""
    }
  };

  handleSubmit = () => {
    const {
      formData: { phone, vfCode }
    } = this.state;

    if (!phone) {
      Taro.showToast({
        title: "请输入您的新手机号！",
        icon: "none"
      });
      return;
    }
    if (!vfCode) {
      Taro.showToast({
        title: "请输入验证码",
        icon: "none"
      });
      return;
    }

    Taro.showModal({
      title: "修改手机号",
      content: "手机号修改后，需要使用修改后的手机号重新登录"
    }).then(res => {
      if (!res.confirm) {
        return false;
      }

      updatePhone({ phone, vfCode }).then(res => {
        storage.clear();
        Taro.redirectTo("login");
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

  isPhone = () => {
    const { phone } = this.state.formData;
    return !/^1[3456789]\d{9}$/.test(phone);
  };

  render() {
    const { formData } = this.state;
    return (
      <View className='page'>
        <AtForm>
          <AtInput
            clear
            type='phone'
            maxLength='11'
            value={formData.phone}
            onChange={this.handleChange.bind(this, "phone")}
            placeholder='请输入新手机号'
            className='text-primary'
          >
            <CountDown onStart={this.sendSMS} disabled={!formData.phone} />
          </AtInput>
          <AtInput
            clear
            type='number'
            maxLength='6'
            minLength='6'
            value={formData.vfCode}
            onChange={this.handleChange.bind(this, "vfCode")}
            placeholder='请输入验证码'
          ></AtInput>
        </AtForm>
        <View className='submit-button-wrap'>
          <AtButton
            type='primary'
            onClick={this.handleSubmit}
            disabled={!formData.phone}
          >
            确定
          </AtButton>
        </View>
      </View>
    );
  }
}
