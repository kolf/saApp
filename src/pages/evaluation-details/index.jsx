import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtRate, AtActivityIndicator } from "../../npm/taro-ui/dist";
import RetaRadio from "../../components/reta-radio";
import UserAvatar from "../../components/user-avatar";
import "./index.scss";

import { getOrderEvaluationInfos } from "../../servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "评价详情"
  };

  state = {
    isFetching: false,
    distributor: {},
    tobeEvaluations: [{}, {}]
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
      const { distributor, tobeEvaluations } = res.data;
      this.setState({
        isFetching: false,
        distributor,
        tobeEvaluations
      });
    });
  };

  render() {
    const { distributor, tobeEvaluations, isFetching } = this.state;

    if (isFetching) {
      return (
        <View className='page eva__root bg-gray'>
          <AtActivityIndicator mode='center' content='加载中...' />
        </View>
      );
    }
    const [saUser, xsUser] = tobeEvaluations;
    return (
      <View className='page eva__root'>
        <View className='eva__heading'>{distributor.name}</View>
        <View className='eva__panel'>
          <View className='eva__panel-title'>经销商评价</View>
          <AtRate
            size='28'
            margin={28}
            value={distributor.evaluationResult * 1}
          />
        </View>
        <View className='eva__heading'>
          <UserAvatar
            name={saUser.adviserRealName}
            desc={saUser.positionName}
            avatarUrl={saUser.avatarUrl}
          />
        </View>
        <View className='eva__panel'>
          <View className='eva__panel-title'>服务评价</View>
          <RetaRadio activeKey={saUser.evaluationResult * 1 - 1} />
        </View>

        {xsUser && (
          <View className='eva__heading'>
            <UserAvatar
              name={xsUser.adviserRealName}
              desc={xsUser.positionName}
              avatarUrl={xsUser.avatarUrl}
            />
          </View>
        )}
        {xsUser && (
          <View className='eva__panel'>
            <View className='eva__panel-title'>服务评价</View>
            <RetaRadio activeKey={xsUser.evaluationResult * 1 - 1} />
          </View>
        )}
      </View>
    );
  }
}
