import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";

import "./index.scss";
import { getMyJF } from "../../servers/apis";
import { goTo } from "../../utils";

class Index extends Component {
  config = {
    navigationBarTitleText: "我的积分"
  };

  state = {
    total: 0
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    getMyJF().then(res => {
      this.setState({
        total: res.data.zf
      });
    });
  };

  render() {
    const { total } = this.state;
    return (
      <View className="page bg-gray">
        <View className="content">
          <AtList className="gap-top">
            <AtListItem
              title="您已获得的积分"
              arrow="right"
              extraBange={total}
              onClick={goTo.bind(this, "integral-details")}
            />
            <AtListItem
              title="积分兑换平台(敬请期待)"
              // arrow="right"
              // onClick={goTo.bind(this, "shop")}
            />
          </AtList>
        </View>
      </View>
    );
  }
}

export default Index;
