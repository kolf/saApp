import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "../../npm/taro-ui/dist";
import storage from "../../utils/storage";
import modal from "../../utils/modal";
import "./index.scss";

import { updateName } from "../../servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "请完善个人信息"
  };

  state = {
    confirmLoading: false,
    formData: {}
  };

  componentDidMount() {
    const userInfo = storage.get("userInfo");
    if (userInfo) {
      this.setState({
        formData: {
          realName: userInfo.realName
        }
      });
    }
  }

  handleSubmit = () => {
    const {
      formData: { realName }
    } = this.state;

    modal({
      title: "提示",
      content: "填写姓名后不可修改",
      showCancel: true,
      success: res => {
        if (!res.confirm) {
          return;
        }
        const userInfo = storage.get("userInfo");
        this.setState({
          confirmLoading: true
        });
        updateName({ realName }).then(() => {
          this.setState({
            confirmLoading: false
          });
          storage.set("userInfo", {
            ...userInfo,
            realName
          });
          storage.set("submitRealName", realName);
          Taro.navigateBack({
            delta: 1 // 返回上一级页面。
          });
        });
      }
    });
  };

  handleChange = value => {
    this.setState({
      formData: {
        realName: value
      }
    });
  };

  checkFormData = () => {
    const { formData } = this.state;
    return formData.realName;
  };

  render() {
    const { formData } = this.state;
    return (
      <View className="page">
        <AtForm>
          <AtInput
            className="no-border"
            clear
            type="text"
            placeholder="请输入您姓名"
            maxLength="5"
            value={formData.realName}
            onChange={this.handleChange}
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
