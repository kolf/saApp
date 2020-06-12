import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavPanel from "../../components/nav-panel";
import "./index.scss";
import img1Url from "../../assets/images/statistics-1.svg";
import img2Url from "../../assets/images/statistics-2.svg";
import img3Url from "../../assets/images/statistics-3.svg";
import img4Url from "../../assets/images/statistics-4.svg";
import imgMoreUrl from "../../assets/images/statistics-more.svg";

import { goTo } from "../../utils";
export default  class Index extends Component {
  config = {
    navigationBarTitleText: "报表"
  };

  state = {};

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }

  handleClick = path => {
    goTo(path);
  };

  render() {
    return (
      <View className="page report-index__root bg-gray">
        <View style={{ margin: "16rpx -16rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-6">
              <View className="report-index__nav">
                <NavPanel
                  title="成交率"
                  onClick={this.handleClick.bind(this, "report-success")}
                >
                  <Image
                    src={img1Url}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="report-index__nav">
                <NavPanel
                  title="异常"
                  onClick={this.handleClick.bind(this, "report-error")}
                >
                  <Image
                    src={img2Url}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="report-index__nav">
                <NavPanel
                  title="排行榜"
                  onClick={this.handleClick.bind(this, "report-top10")}
                >
                  <Image
                    src={img3Url}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="report-index__nav">
                <NavPanel
                  title="个人统计"
                  onClick={this.handleClick.bind(this, "all-employees")}
                >
                  <Image
                    src={img4Url}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="report-index__nav">
                <NavPanel title="敬请期待">
                  <Image
                    src={imgMoreUrl}
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


