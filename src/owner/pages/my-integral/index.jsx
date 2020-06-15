import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "@/npm/taro-ui/dist";

import "./index.scss";
import { getMyJF, getCreditStatus } from "@/servers/apis";
import { goTo } from "@/utils";
import modal from "@/utils/modal";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的积分"
  };

  state = {
    total: 0,
    status: false
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = async () => {
    const res1 = await getMyJF().then(res => res.data);
    const res2 = await getCreditStatus({}).then(res => res.data);

    this.setState({
      total: res1.zf,
      status: res2
    });
  };

  goToGiftList = () => {
    const { status } = this.state;
    if (!status) {
      modal({
        content: "积分兑换活动已结束，敬请期待",
        showCancel: false
      });
      return;
    }

    goTo("/owner/pages/gift-list");
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
              onClick={goTo.bind(this, "/owner/pages/integral-details")}
            />
            <AtListItem
              title="积分兑换"
              arrow="right"
              onClick={this.goToGiftList}
            />
          </AtList>
        </View>
      </View>
    );
  }
}
