import Taro, { Component } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

class Index extends Component {
  config = {
    navigationBarTitleText: "积分商城"
  };

  render() {
    return (
      <WebView src="http://wx.member.ftms.com.cn/weixin/integralShop/page?customerid=4028e5bc6e871c11016e88304dd10965" />
    );
  }
}

export default Index;
