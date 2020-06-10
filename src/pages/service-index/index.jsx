import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavPanel from "../../components/nav-panel";
import "./index.scss";
import helpUrl from "../../assets/images/help.svg";
import userCallUrl from "../../assets/images/user-call.svg";

import { goTo } from "../../utils";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "联系客服"
  };

  state = {};

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }

  handleClick = name => {
    goTo(name);
  };

  render() {
    return (
      <View className="page service-index__root bg-gray">
        <View style={{ margin: "16rpx -16rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-6">
              <View className="service-index__nav">
                <NavPanel
                  title="常用问题"
                  onClick={this.handleClick.bind(this, "my-help")}
                >
                  <Image
                    src={helpUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="service-index__nav">
                <NavPanel
                  title="人工客服"
                  onClick={this.handleClick.bind(this, "question-list")}
                >
                  <Image
                    src={userCallUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
