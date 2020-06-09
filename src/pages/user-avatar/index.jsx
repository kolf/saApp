import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRate } from "../../npm/taro-ui/dist";
import RetaRadio from "../reta-radio";
import "./index.scss";

import { getOrderEvaluationInfos } from "../../servers/apis";

export default class Index extends Component {
  state = {
    isFetching: false,
    data: {}
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { orderId } = this.$router.params;
    this.setState({
      isFetching: true
    });
    getOrderEvaluationInfos({ orderId }).then(res => {
      this.setState({
        isFetching: false,
        data: res.data
      });
    });
  };

  render() {
    return (
      <View className="page eva__root">
        <RetaRadio activeKey={1} />
        <AtRate size="36" value={3} />
      </View>
    );
  }
}
