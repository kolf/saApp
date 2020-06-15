import Taro, { Component } from "@tarojs/taro";
import { AtIcon } from "@/npm/taro-ui/dist";
import { View, Image } from "@tarojs/components";
import EmptyData from "@/components/empty-data";
import "./index.scss";
import { getScore, getGiftList } from "@/servers/apis";
import { goTo } from "@/utils";
import modal from "@/utils/modal";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "积分兑换"
  };

  state = {
    isFetching: true,
    integralTotal: 0,
    listData: []
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      isFetching: true,
      listData: []
    });

    try {
      const res = await getGiftList().then(res => res.data);
      const res1 = await getScore().then(res => res.data);

      this.setState({
        listData: res.list,
        integralTotal: res1 || 0,
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
    goTo("owner/pages/gift-details", { ...item, integralTotal });
  };

  render() {
    const { listData, isFetching } = this.state;

    return (
      <View className="page gift-list__root">
        <View className="gift-list__header">
          <View className="gift-list__header-name">当前剩余积分</View>
          <View className="gift-list__header-total">
            <AtIcon prefixClass="iconfont" value="jifen" size={20} />{" "}
            {integralTotal}
          </View>
          <View
            className="gift-list__header-button"
            onClick={e => goTo("owner/pages/gift-order-list")}
          >
            我的兑换
          </View>
        </View>

        {listData.length > 0 ? (
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
                      <AtIcon prefixClass="iconfont" value="jifen" size={16} />
                      {item.score} 积分
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <EmptyData loading={isFetching}>系统还没有此类商品~</EmptyData>
        )}
      </View>
    );
  }
}
