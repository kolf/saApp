import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "@/npm/taro-ui/dist";
import logoUrl from "@/assets/images/logo_title.png";
import "./index.scss";
import storage from "@/utils/storage";
import { logout } from "@/servers/apis";

const textMap = {
  "-1": "您的信息正在审核中，请耐心等待， 我们非常期待您的加入。",
  "0":
    "您的信息已提交至店主，店主在审核中，请耐心等待， 我们非常期待您的加入。",
  "2": "非常遗憾，您的审核未能通过， 请重新填写信息后，再次提交审核。 "
};export default  class Index extends Component {
  config = {
    navigationBarTitleText: "审核结果"
  };

  state = {
    confirmLoading: false
  };

  goToProfile = () => {
    Taro.redirectTo({
      url: "/pages/profile/index"
    });
  };

  handleSubmit = () => {
    this.setState({
      confirmLoading: true
    });
    logout().then(res => {
      storage.clear();
      Taro.redirectTo({
        url: "/pages/login/index"
      });
    });
  };

  render() {
    const { checkStatus } = this.$router.params;
    return (
      <View className="page">
        <View className="page-content">
          <View className="result__title">
            <Image
              src={logoUrl}
              className="img"
              mode="widthFix"
              style="width:200px"
            />
          </View>
          <View className="result__content">{textMap[checkStatus]}</View>
        </View>
        <View className="page-footer">
          <View className="next-button-wrap">
            {checkStatus === "2" ? (
              <AtButton
                className="btn-lg btn-primary"
                type="primary"
                onClick={this.goToProfile}
              >
                重新填写信息
              </AtButton>
            ) : (
              <AtButton
                className="btn-lg btn-primary"
                type="primary"
                loading={this.state.confirmLoading}
                onClick={this.handleSubmit}
              >
                切换帐号
              </AtButton>
            )}
          </View>
        </View>
      </View>
    );
  }
}


