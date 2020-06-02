import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtIcon, AtForm } from "taro-ui";

import storage from "../../utils/storage";
import imgUrl from "../../assets/images/logo_title.png";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "与丰同行助理"
  };

  componentDidShow() {
    const userInfo = storage.get("userInfo");
    if (userInfo) {
      if (userInfo.checkStatus !== 1) {
        Taro.redirectTo({
          url: `/pages/review-result/index?checkStatus=${userInfo.checkStatus}`
        });
        return;
      }
      if (userInfo.type === "DZ") {
        Taro.redirectTo({
          url: `/pages/my-employees/index`
        });
        return;
      } else {
        Taro.redirectTo({
          url: `/pages/my-owner/index`
        });
      }
    }
  }

  goToLogin = () => {
    Taro.showModal({
      title: "提示",
      content: "您没有相应权限，请先登陆",
      confirmText: "去登陆",
      success(res) {
        if (res.confirm) {
          Taro.redirectTo({
            url: `/pages/login/index`
          });
        }
      }
    });
  };

  render() {
    return (
      <View className="page index__root">
        <View className="page-content">
          <View className="index__lead">
            <Image
              src={imgUrl}
              className="img"
              mode="widthFix"
              style="width:200px"
            />
          </View>
          <View className="index__feature-list">
            <View>
              <AtIcon value="heart" />
              <Text className="index__feature-item-title">客户维系</Text>
            </View>
            <View>
              <AtIcon value="money" />
              <Text className="index__feature-item-title">业务处理</Text>
            </View>
            <View>
              <AtIcon value="analytics" />
              <Text className="index__feature-item-title">业务查看</Text>
            </View>
          </View>
        </View>
        <View className="page-footer" style={{ padding: "48px 12px" }}>
          <AtButton onClick={this.goToLogin} type="primary">
            开始使用
          </AtButton>
        </View>
      </View>
    );
  }
}
