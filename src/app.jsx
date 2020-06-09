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
      "pages/admin-index/index",
      "pages/owner-index/index",
      "pages/all-order/index",
      "pages/my-employees/index",
      "pages/admin-profile/index",
      "pages/service-index/index",
      'pages/new-employees/index',
      'pages/employees-details/index',
      'pages/order-list/index'
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
