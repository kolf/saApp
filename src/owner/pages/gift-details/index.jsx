import Taro, { Component } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import { AtInputNumber, AtButton, AtIcon } from "@/npm/taro-ui/dist";
import "./index.scss";
import "@/components/goods-panel/index.scss";

import { addGiftOrder } from "@/servers/apis";
import { goTo } from "@/utils";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "确认兑换"
  };

  state = {
    data: this.$router.params,
    remark: "",
    number: 1
  };

  componentDidMount() {
    const userInfo = storage.get("userInfo");
    if (!userInfo) {
      return;
    }

    this.userInfo = userInfo;
  }

  handleChange = e => {
    this.setState({
      number: Math.max(e, 1)
    });
  };

  handleRemarkChange = e => {
    this.setState({ remark: e.target.value });
  };

  handleSubmit = e => {
    const {
      data: { score, integralTotal, id },
      number,
      remark
    } = this.state;
    const _this = this;
    if (score * number > integralTotal) {
      modal({
        content: "亲您的积分不够抵扣哦～",
        showCancel: false
      });
      return;
    }

    modal({
      title: '请确认是否兑换该礼品,确认兑换后不可取消~',
      content: `礼品将在一个月内派送至您的\r\n${this.userInfo.disName}\r\n请您耐心等待`,
      showCancel:true,
      success(res){
        if(res.confirm){
          onOk()
        }
      }
    })

    async function onOk() {
      const res = await addGiftOrder({
        id,
        number,
        remark,
        userId: _this.userInfo.id
      });

      if (res.code !== 200) {
        return;
      }

      modal({
        title: "亲您的商品已经兑换成功了哦~",
        content: `礼品将在一个月内派送至您的\r\n${_this.userInfo.disName}\r\n请您耐心等待`,
        showCancel: false,
        success() {
          Taro.navigateBack({ delta: 1 });
        }
      });
    }
  };

  render() {
    const { data, number } = this.state;
    return (
      <View className="page gift-details__root">
        <View className="page-content">
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
                        <AtIcon
                          prefixClass="iconfont"
                          value="jifen"
                          size={14}
                        />
                        {data.score}积分
                      </View>
                      <View className="at-col at-col-6 text-right">
                        <AtInputNumber
                          min={0}
                          max={100}
                          step={1}
                          value={number}
                          onChange={this.handleChange.bind(this)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* <View className="pad">
            <View className="at-row">
              <View className="at-col at-col-4">备注</View>
              <View className="at-col at-col-8 text-right text-gray">
                <Input
                  className="gift-details__input"
                  onChange={this.handleRemarkChange}
                  placeholder="选填，给管理员留言"
                />
              </View>
            </View>
          </View> */}
          <View className="pad _border-top border-bottom">
            <View className="at-row">
              <View className="at-col at-col-4">账户剩余</View>
              <View className="at-col at-col-8 text-right text-gray">
                {data.integralTotal}积分
              </View>
            </View>
          </View>
        </View>
        <View
          className="page-footer border-top"
          style={{ padding: "24rpx 36rpx" }}
        >
          <View className="at-row">
            <View className="at-col at-col-5">
              <View>
                <View>本次消费</View>
                <View className="text-primary" style={{ fontSize: "36rpx" }}>
                  {data.score * number} 积分
                </View>
              </View>
            </View>
            <View className="at-col at-col-7">
              <AtButton className='btn-lg btn-primary' type="primary" onClick={this.handleSubmit}>
                确认兑换
              </AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
