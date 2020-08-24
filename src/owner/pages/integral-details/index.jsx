import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";
import { getMyJF } from "@/servers/apis";
import { goTo } from "@/utils";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "已获得的积分"
  };

  state = {
    listData: {}
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getMyJF().then(res => {
      const { mx = [], zf = 0 } = res.data;
      this.setState({
        listData: mx.reverse(),
        total: zf
      });
    });
  };

  render() {
    const { listData, total } = this.state;
    return (
      <View className="page integral-details__root">
        <View className="at-row integral-details__heading text-primary">
          <View className="at-col">累计积分总计</View>
          <View className="at-col text-right">{total}</View>
        </View>
        <View className="integral-details__content">
          <View className="box-shadow integral-details__card">
            <View className="table">
              <View className="at-row table-head border-bottom">
                <View
                  className="at-col at-col-4 text-underline"
                  onClick={e => goTo("/owner/pages/integral-rule", null)}
                >
                  达成要求?
                </View>
                <View className="at-col text-center">订单号</View>
                <View className="at-col at-col-2 text-center">积分值</View>
              </View>
              <View className="table-body">
                {listData.map(item => {
                  return (
                    <View key={item.id} className="at-row ">
                      <View className="at-col at-col-4 at-col--wrap">
                        {item.rewardName}
                      </View>
                      <View className="at-col text-center">
                        {item.orderNo || "无"}
                      </View>
                      <View className="at-col at-col-2 text-center">
                        {item.direction == 1 ? "+" : "-"}
                        {item.integral}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
