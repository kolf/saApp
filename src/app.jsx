import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      "pages/index/index",
      "pages/login/index",
      "pages/register/index",
      "pages/profile/index",
      "pages/review-result/index",
      "pages/update-name/index",
      "pages/update-phone/index",
      "pages/my-owner/index",
      "pages/new-owner/index",
      "pages/select-adviser/index",
      "pages/my-order/index",
      "pages/my-profile/index",
      "pages/profile-card/index",
      "pages/owner-details/index",
      "pages/order-details/index",
      "pages/my-integral/index",
      "pages/integral-details/index",
      "pages/my-employees/index",
      "pages/new-employees/index",
      "pages/employees-details/index",
      "pages/report/index",
      "pages/report-success/index",
      "pages/report-error/index",
      "pages/report-users/index",
      "pages/report-users-fw/index",
      "pages/report-users-esc/index",
      "pages/report-users-xs/index",
      "pages/report-top10/index",
      "pages/all-order/index",
      "pages/admin-profile/index",
      "pages/order-list/index",
      "pages/evaluation-details/index",
      "pages/all-employees/index",
      "pages/report-top10-fw/index",
      "pages/report-top10-er/index",
      "pages/report-top10-xs/index",
      "pages/rule-details/index",
      "pages/shop/index",
      "pages/integral-rule/index",
      "pages/question-list/index",
      "pages/service-index/index",
      "pages/my-help/index",
      "pages/question-post/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#2254f5",
      navigationBarTitleText: "App",
      navigationBarTextStyle: "white"
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
