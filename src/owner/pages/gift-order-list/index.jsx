import Taro, { Component } from "@tarojs/taro";
import { AtIcon, AtList } from "@/npm/taro-ui/dist";
import { View } from "@tarojs/components";
import GoodsPanel from "@/components/goods-panel";
import EmptyData from "@/components/empty-data";
import "./index.scss";
import { getGiftOrderList } from "@/servers/apis";
import { goTo } from "@/utils";
import storage from "@/utils/storage";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "我的兑换"
  };

  state = {
    isFetching: true,
    listData: [],
    orderby: "time",
    seq: "0"
  };

  componentDidMount() {
    const userInfo = storage.get("userInfo");
    if (!userInfo) {
      return;
    }

    this.userId = userInfo.id;
    this.loadData();
  }

  loadData = () => {
    const { orderby, seq } = this.state;
    this.setState({
      isFetching: true
    });
    getGiftOrderList({
      orderby,
      seq,
      userId: this.userId
    }).then(res => {
      const { list } = res.data;
      this.setState({
        isFetching: false,
        listData: list
      });
    });
  };

  handleTabClick = value => {
    const { orderby, seq } = this.state;
    let nextSeq = "0";
    if (value === orderby) {
      nextSeq = seq === "0" ? "1" : "0";
    }
    this.setState({ orderby: value, seq: nextSeq }, this.loadData);
  };

  handleClick = index => {
    const { id } = this.state.listData[index];
    goTo("/owner/pages/gift-order-details", { id });
  };

  render() {
    const { isFetching, listData, orderby, seq } = this.state;
    return (
      <View className="page gift-orders__root">
        <View className="at-row gift-orders__tab-list border-bottom">
          <View className="at-col at-col-3 gift-orders__tab-item">全部</View>
          <View
            className={
              "at-col at-col-3 gift-orders__tab-item" +
              (orderby === "time" ? " text-primary" : "")
            }
            onClick={this.handleTabClick.bind(this, "time")}
          >
            时间
            <Text
              className={
                "arrow " +
                (orderby !== "time" || seq === "0"
                  ? "arrow--down"
                  : "arrow--up")
              }
            />
          </View>
          <View
            className={
              "at-col at-col-3 gift-orders__tab-item" +
              (orderby === "score" ? " text-primary" : "")
            }
            onClick={this.handleTabClick.bind(this, "score")}
          >
            积分
            <Text
              className={
                "arrow " +
                (orderby !== "score" || seq === "0"
                  ? "arrow--down"
                  : "arrow--up")
              }
            />
          </View>
        </View>
        {listData.length > 0 ? (
          <AtList className="gift-orders__list">
            {listData.map((item, index) => (
              <View key={item.id} className="gift-orders__item border-bottom">
                <GoodsPanel
                  {...item}
                  onClick={this.handleClick.bind(this, index)}
                />
              </View>
            ))}
          </AtList>
        ) : (
          <EmptyData loading={isFetching}>您还没有兑换任何商品~</EmptyData>
        )}
      </View>
    );
  }
}
