import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtTabs } from "@/npm/taro-ui/dist";
import Tabs from "@/components/tabs";
import "./index.scss";
import { goTo } from "@/utils";
import { getOrderTypeList } from "@/servers/apis";

const tabList = [
  { label: "处理中", value: "1" },
  { label: "处理完成", value: "3" }
];
export default class Index extends Component {
  config = {
    navigationBarTitleText: "全部订单"
  };

  state = {
    tabIndex: 0,
    listData: []
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    const orderStatus = tabList[this.state.tabIndex].value;
    getOrderTypeList(
      {
        orderStatus
      },
      "DZ"
    ).then(res => {
      this.setState({
        listData: this.makeData(res.data)
      });
    });
  };

  makeData = data => {
    return data.map(item => ({
      ...item,
      count: item.count + ""
    }));
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

  handleClick = ({ orderType }) => {
    const orderStatus = tabList[this.state.tabIndex].value;
    goTo("/admin/pages/order-list", {
      orderType,
      orderStatus
    });
  };

  render() {
    const { listData } = this.state;
    return (
      <View className="page order-category__root bg-gray">
        <Tabs
          current={this.state.tabIndex}
          options={tabList}
          onChange={this.handleTabClick.bind(this)}
        />
        <AtList className="order-category__list no-border">
          {listData.map((item, index) => (
            <AtListItem
              title={item.orderTypeName}
              extraText={item.count}
              onClick={this.handleClick.bind(this, item)}
              className={index === listData.length - 1 ? "no-border" : ""}
              arrow="right"
            />
          ))}
        </AtList>
      </View>
    );
  }
}
