import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import OrderCard from "@/components/order-card";
import EmptyData from "@/components/empty-data";
import "./index.scss";

import { goTo } from "@/utils";
import storage from "@/utils/storage";
import { getOrderList } from "@/servers/apis";
export default  class Index extends Component {
  config = {
    navigationBarTitleText: "订单列表"
  };

  state = {
    isFetching: true,
    listData: []
  };

  componentDidShow() {
    this.loadData();
    this.removeOrderTempData();
  }

  removeOrderTempData = () => {
    storage.remove("orderAdviserData");
  };

  loadData = () => {
    this.setState({
      isFetching: true
    });
    const { orderType, orderStatus } = this.$router.params;

    getOrderList(
      {
        orderType,
        orderStatus
      },
      "DZ"
    ).then(res => {
      this.setState({
        isFetching: false,
        listData: res.data
      });
    });
  };

  handleClick = ({ orderId }) => {
    goTo("/pages/order-details", {
      id: orderId
    });
  };

  render() {
    const { listData, isFetching } = this.state;
    return (
      <View className="page order__root bg-gray">
        {listData.length > 0 ? (
          <View className="order__list">
            {listData.map(order => {
              return (
                <View className="order__list-item" key={order.orderId}>
                  <OrderCard
                    dataSource={order}
                    onClick={this.handleClick.bind(this, order)}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <EmptyData loading={isFetching}>
            系统还没有此类订单 我相信就在今天
          </EmptyData>
        )}
      </View>
    );
  }
}


