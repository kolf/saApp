import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import EmptyData from "@/components/empty-data";
import Tabs from "@/components/tabs";
import "./index.scss";

import { goTo } from "@/utils";
import storage from "@/utils/storage";
import { getOrderList } from "@/servers/apis";
import OrderCard from "@/components/order-card";

// setNavigationBarTitle
export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的业绩"
  };

  state = {
    tabIndex: 0,
    isFetching: false,
    listData: [],
    newCount: 0,
    hisCount: 0
  };

  tabList = [];

  componentDidShow() {
    this.loadData();
    this.removeOrderTempData();
  }

  removeOrderTempData = () => {
    storage.remove("orderAdviserData");
  };

  loadData = () => {
    this.setState({ isFetching: true });
    const acceptStatus = this.tabList[this.state.tabIndex].value;
    getOrderList({
      acceptStatus
    }).then(res => {
      const { processedOrders, newCount, hisCount } = res.data;
      this.setState({
        listData: processedOrders,
        newCount,
        hisCount,
        isFetching: false
      });
    });
  };

  handleTabClick = e => {
    this.setState(
      {
        tabIndex: e
      },
      () => {
        this.loadData();
      }
    );
  };

  handleClick = ({ orderId }) => {
    goTo("/pages/order-details", {
      id: orderId
    });
  };

  getTabList = () => {
    const { newCount, hisCount } = this.state;
    return [
      { label: `新任务`, value: "0", badge: newCount },
      { label: `历史业绩（${hisCount}）`, value: "2" }
    ];
  };

  render() {
    const { listData, tabIndex, isFetching } = this.state;

    return (
      <View className="page order__root bg-gray">
        <Tabs
          current={tabIndex}
          options={this.getTabList()}
          onChange={this.handleTabClick.bind(this)}
        />

        {listData.length > 0 ? (
          <View className="order__list">
            {listData.map(order => {
              return (
                <View className="order__list-item" key={order.orderId}>
                  <OrderCard
                    showOrderStatusTag
                    dataSource={order}
                    onClick={this.handleClick.bind(this, order)}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <EmptyData loading={isFetching}>
            您还没有{this.tabList[tabIndex].title.replace(/（\d）/, "")}
            我相信就在今天
          </EmptyData>
        )}
      </View>
    );
  }
}
