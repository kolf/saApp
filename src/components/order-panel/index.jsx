import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { AtButton } from "taro-ui";
import Panel from "../panel";

export default class extends PureComponent {
  render() {
    const { dataSource, onClick } = this.props;

    if (!dataSource) {
      return null;
    }

    return (
      <Panel
        title={dataSource.orderTypeName}
        onClick={onClick}
        renderFooter={
          <View className="order__eva-btn">
            {dataSource.evaluationStatus === 1 ? (
              <AtButton type="secondary" size="small" className="btn">
                已评价
              </AtButton>
            ) : (
              <AtButton
                type="secondary"
                size="small"
                className="btn"
                disabled={dataSource.orderStatus !== 3}
              >
                未评价
              </AtButton>
            )}
          </View>
        }
        renderExtra={
          <View>
            {dataSource.orderStatus === 3 ? (
              <Text className="order-status-text order-status-text__success">
                服务已完成
              </Text>
            ) : (
              <Text className="order-status-text order-status-text__wait">
                服务受理中
              </Text>
            )}
          </View>
        }
      >
        <View className="at-row">
          <View className="at-col at-col-5">订单日期：</View>
          <View className="at-col at-col-7">{dataSource.createTime}</View>
        </View>
        <View className="at-row">
          <View className="at-col at-col-5">服务顾问：</View>
          <View className="at-col at-col-7">{dataSource.saRealName}</View>
        </View>
        <View className="at-row">
          <View className="at-col at-col-5">服务受理经销店：</View>
          <View className="at-col at-col-7">{dataSource.distributorName}</View>
        </View>
      </Panel>
    );
  }
}
