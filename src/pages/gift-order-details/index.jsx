import Taro, { Component } from "@tarojs/taro";
import { AtButton, AtListItem, AtList,AtIcon } from "../../npm/taro-ui/dist";
import { View, Image } from "@tarojs/components";
import "./index.scss";
import "../../components/goods-panel/index.scss";
import { goTo } from "../../utils";
import { getGiftOrder } from "../../servers/apis";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "兑换详情"
  };

  state = {
    isFetching: true,
    data: {}
  };

  componentDidMount() {
    this.id = this.$router.params.id;
    this.loadData();
  }

  loadData = async () => {
    this.setState({ isFetching: true });
    const res = await getGiftOrder({ id: this.id });
    if (res.code !== 200) {
      this.setState({ isFetching: false });
      return;
    }
    this.setState({
      isFetching: false,
      data: res.data
    });
    console.log(res, "res");
  };

  render() {
    const { data } = this.state;
    return (
      <View className="page gift-order-details__root">
        <View style={{ padding: "36rpx 36rpx 0 36rpx" }}>
          <View className="goods-panel__root">
            <View className="at-row">
              <View className="at-col at-col-4">
                <View className="goods-panel__left">
                  <Image src={data.imgurl} mode="aspectFit" className="img" />
                </View>
              </View>
              <View className="at-col at-col-8">
                <View className="goods-panel__right">
                  <View className="goods-panel__name">{data.name}</View>
                  <View
                    className="at-row goods-panel__text"
                    style={{ marginTop: "52rpx" }}
                  >
                    <View className="at-col at-col-6 text-primary">
                      <AtIcon prefixClass="iconfont" value="jifen" size={16} />
                      {data.score}积分
                    </View>
                    <View className="at-col at-col-6 text-right">
                      x{data.number}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="pad">
          <View className="at-row">
            <View className="at-col at-col-4">备注</View>
            <View className="at-col at-col-8 text-right text-gray">
              {data.remark}
            </View>
          </View>
        </View>
        <View className="pad border-top border-bottom">
          <View className="at-row">
            <View className="at-col at-col-4">积分订单编号</View>
            <View className="at-col at-col-8 text-right text-gray">
              {data.orderNo}
            </View>
          </View>
          <View className="at-row" style={{ marginTop: "12rpx" }}>
            <View className="at-col at-col-4">下单时间</View>
            <View className="at-col at-col-8 text-right text-gray">
              {data.createTime}
            </View>
          </View>
        </View>
        <View className="pad">
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-6">本次消费</View>
            <View className="at-col at-col-6 text-right text-primary">
              {data.totalScore}积分
            </View>
          </View>
        </View>
      </View>
    );
  }
}


