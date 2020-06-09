import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtNoticebar } from "../../npm/taro-ui/dist";
import TabBar from "../../components/tabbar";
import EmptyData from "../../components/empty-data";
import "./index.scss";

import { goTo } from "../../utils";
import storage from "../../utils/storage";
import { getOrderList } from "../../servers/apis";
import OrderCard from "../../components/order-card";

// setNavigationBarTitle
class Index extends Component {
  config = {
    navigationBarTitleText: "我的业绩"
  };

  state = {
    activeKey: 0,
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
    const acceptStatus = this.tabList[this.state.activeKey].value;
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
        activeKey: e
      },
      () => {
        this.loadData();
      }
    );
  };

  handleClick = ({ orderId }) => {
    goTo("order-details", {
      id: orderId
    });
  };

  render() {
    const { listData, activeKey, newCount, hisCount, isFetching } = this.state;

    this.tabList = [
      { title: `新任务`, value: "0", badge: newCount },
      { title: `历史业绩（${hisCount}）`, value: "2" }
    ];

    return (
      <View className="page order__root bg-gray">
        <AtTabs
          current={activeKey}
          tabList={this.tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
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
            您还没有{this.tabList[activeKey].title.replace(/（\d）/, "")}
            我相信就在今天
          </EmptyData>
        )}
        <TabBar
          activeKey={1}
          tabKeys={["my-owner", "my-order", "my-profile"]}
        />
      </View>
    );
  }
}

export default Index;
