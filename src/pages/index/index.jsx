import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtIcon } from "@/npm/taro-ui/dist";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
import imgUrl from "@/assets/images/logo_title.png";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "与丰同行助理"
  };

  componentDidShow() {
    const userInfo = storage.get("userInfo");
    // console.log(userInfo, 'userInfo')
    if (userInfo) {
      // goTo('/pages/order-details',{id:1107});
      // return
      if (userInfo.checkStatus !== 1) {
        goTo("/pages/review-result", { checkStatus: userInfo.checkStatus }, false);
        return;
      }
      if (userInfo.type === "DZ") {
        goTo("/admin/pages/index", null, false);
      } else {
        goTo("/owner/pages/index", null, false);
      }
    }
  }

  toLogin = () => {
    modal({
      title: "提示",
      content: "您没有相应权限，请先登陆",
      confirmText: "去登陆",
      showCancel: true,
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
              <AtIcon value="bell" size={24} />
              <Text className="index__feature-item-title">客户维系</Text>
            </View>
            <View>
              <AtIcon value="blocked" />
              <Text className="index__feature-item-title">业务处理</Text>
            </View>
            <View>
              <AtIcon value="bookmark" />
              <Text className="index__feature-item-title">业务查看</Text>
            </View>
          </View>
        </View>
        <View className="page-footer" style={{ padding: "48px 12px" }}>
          <AtButton
            onClick={this.toLogin}
            type="primary"
            className="btn-primary btn-lg"
          >
            开始使用
          </AtButton>
        </View>
      </View>
    );
  }
}
