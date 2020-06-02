import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtInput, AtForm } from "taro-ui";
import storage from "../../utils/storage";
import "./index.scss";

import { updateName } from "../../servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "请完善个人信息"
  };

  state = {
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
    if (!realName) {
      Taro.showToast({
        title: "请输入您的姓名！",
        icon: "none"
      });
      return;
    }

    Taro.showModal({
      title: "提示",
      content: "填写姓名后不可修改",
      success: res => {
        if (!res.confirm) {
          return;
        }

        const userInfo = storage.get("userInfo");
        updateName({ realName }).then(() => {
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

  render() {
    const { formData } = this.state;
    return (
      <View className="page">
        <AtForm>
          <AtInput
            clear
            type="text"
            placeholder="请输入您姓名"
            maxLength="5"
            value={formData.realName}
            onChange={this.handleChange}
          ></AtInput>
        </AtForm>
        <View className="submit-button-wrap">
          <AtButton type="primary" onClick={this.handleSubmit}>
            确定
          </AtButton>
        </View>
      </View>
    );
  }
}
