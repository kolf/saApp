import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";

import "./app.scss";
import "./assets/css/iconfont.css";
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      "pages/index/index",
      "pages/login/index",
      "pages/register/index",
      "pages/profile/index",
      "pages/review-result/index",
      "pages/service-index/index",
      "pages/order-details/index",
      "pages/my-help/index",
      "pages/question-list/index",
      "pages/question-post/index",
      "pages/update-phone/index",
      "pages/update-name/index"
    ],
    subpackages: [
      {
        root: "admin",
        pages: [
          "pages/index/index",
          "pages/owner-category/index",
          "pages/my-owner/index",
          "pages/new-owner/index",
          "pages/owner-details/index",
          "pages/profile/index",
          "pages/order-category/index",
          "pages/order-list/index",
          "pages/report-index/index",
          "pages/report-success/index",
          "pages/report-error/index",
          "pages/report-top10/index",
          "pages/report-top10-esc/index",
          "pages/report-top10-fw/index",
          "pages/report-top10-xs/index",
          "pages/report-users-esc/index",
          "pages/report-users-fw/index",
          "pages/report-users-xs/index",
          'pages/evaluation-details/index'
        ]
      },
      {
        root: "owner",
        pages: [
          "pages/index/index",
          "pages/my-integral/index",
          "pages/integral-rule/index",
          "pages/integral-details/index",
          "pages/profile-card/index",
          "pages/gift-list/index",
          "pages/gift-details/index",
          "pages/gift-order-list/index",
          "pages/gift-order-details/index",
          "pages/my-order/index",
          "pages/my-user/index",
          "pages/profile/index",
          "pages/user-details/index"
        ]
      }
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "与丰同行助理",
      navigationBarTextStyle: "black"
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
