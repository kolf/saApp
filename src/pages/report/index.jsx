import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import d1Url from "../../assets/images/d12x.png";
import d2Url from "../../assets/images/d22x.png";
import d3Url from "../../assets/images/d32x.png";
import d4Url from "../../assets/images/d42x.png";

import { goTo } from "../../utils";

class Index extends Component {
  config = {
    navigationBarTitleText: "报表"
  };

  state = {};

  handleClick = path => {
    goTo(path);
  };

  render() {
    return (
      <View className="page report__root bg-gray">
        <View className="report__list">
          <View
            className="report__list-item"
            onClick={this.handleClick.bind(this, "report-success")}
          >
            <Image src={d1Url} className="img" mode="widthFix" />
          </View>
          <View
            className="report__list-item"
            onClick={this.handleClick.bind(this, "report-error")}
          >
            <Image src={d4Url} className="img" mode="widthFix" />
          </View>
          <View
            className="report__list-item"
            onClick={this.handleClick.bind(this, "report-top10")}
          >
            <Image src={d2Url} className="img" mode="widthFix" />
          </View>
          <View
            className="report__list-item"
            onClick={this.handleClick.bind(this, "all-employees")}
          >
            <Image src={d3Url} className="img" mode="widthFix" />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
