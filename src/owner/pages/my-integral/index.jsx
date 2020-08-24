import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "@/npm/taro-ui/dist";

import "./index.scss";
import { getCreditStatus } from "@/servers/apis";
import { goTo } from "@/utils";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的积分"
  };

  // loadData = async () => {
  //   const res2 = await getCreditStatus({}).then(res => res.data);

  //   this.setState({
  //     status: res2
  //   });
  // };

  // goToGiftList = () => {
  //   const { status } = this.state;
  //   if (!status) {
  //     modal({
  //       content: "积分兑换活动已结束，敬请期待",
  //       showCancel: false
  //     });
  //     return;
  //   }

  //   goTo("/owner/pages/gift-list");
  // };

  render() {
    return (
      <View className="page bg-gray">
        <View className="content">
          <AtList className="gap-top">
            <AtListItem
              title="您已获得的积分"
              arrow="right"
              onClick={goTo.bind(this, "/owner/pages/integral-details")}
            />
            <AtListItem
              title="积分兑换"
              arrow="right"
              onClick={goTo.bind(this, "/owner/pages/gift-list")}
            />
          </AtList>
        </View>
      </View>
    );
  }
}
