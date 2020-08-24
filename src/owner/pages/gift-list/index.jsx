import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "@/npm/taro-ui/dist";

import EmptyData from "@/components/empty-data";
import GiftClosedBlock from "../gift-closed";
import "./index.scss";
import { getScore, getCreditStatus, getGiftList } from "@/servers/apis";
import { goTo } from "@/utils";
import modal from "@/utils/modal";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "积分兑换"
  };

  state = {
    openStatus: true,
    isFetching: true,
    integralTotal: 0,
    listData: []
  };

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }

  componentDidShow() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      isFetching: true,
      listData: []
    });

    let listData = [];

    try {
      const openStatus = await getCreditStatus({}).then(res => res.data);
      if (openStatus) {
        listData = await getGiftList().then(res => res.data.list || []);
      }

      const integralTotal = await getScore().then(res => res.data || 0);

      this.setState({
        listData,
        integralTotal,
        openStatus,
        isFetching: false
      });
    } catch (error) {
      this.setState({
        isFetching: false
      });
    }
  };

  handleClick = index => {
    const { listData, integralTotal } = this.state;
    const item = listData[index];
    if (integralTotal < item.score) {
      modal({
        content: "亲您的积分不够抵扣哦～",
        showCancel: false
      });
      return;
    }
    goTo("/owner/pages/gift-details", { ...item, integralTotal });
  };

  renderBody = () => {
    const { openStatus, listData, isFetching } = this.state;
    if (!openStatus) {
      return <GiftClosedBlock />;
    }

    return listData.length > 0 ? (
      <View className="goods-list">
        <View className="goods-list__title">积分兑礼</View>
        <View className="at-row at-row--wrap">
          {listData.map((item, index) => (
            <View className="at-col at-col-6">
              <View
                className="goods-item"
                onClick={this.handleClick.bind(this, index)}
              >
                <Image src={item.imgurl} mode="aspectFit" className="img" />
                <View className="goods-item__name">{item.name}</View>
                <View className="goods-item__pirce">
                  <AtIcon prefixClass="iconfont" value="jifen" size={14} />
                  {item.score} 积分
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    ) : (
      <EmptyData loading={isFetching}>商品正在上架中，尽请期待~</EmptyData>
    );
  };

  render() {
    const { integralTotal, openStatus } = this.state;
    return (
      <View className="page gift-list__root">
        <View className="gift-list__header">
          <View className="gift-list__header-name">当前可用积分</View>
          <View className="gift-list__header-total">
            <AtIcon prefixClass="iconfont" value="jifen" size={20} />
            {integralTotal}
          </View>
          <View
            className="gift-list__header-button"
            onClick={e => goTo("/owner/pages/gift-order-list")}
          >
            我的兑换
          </View>
        </View>

        {this.renderBody()}
      </View>
    );
  }
}
