import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

function loop(e) {
  e.stopPropagation();
}

const orderResultMap = {
  0: "未成交",
  1: "成交",
  "": "未成交"
};
export default class extends PureComponent {
  state = {};

  render() {
    const { dataSource, onClick } = this.props;

    if (!dataSource) {
      return null;
    }

    let orderStatusNode = null;
    const { processStatus, timeoutFlag } = dataSource;
    if (processStatus === "FINISH") {
      orderStatusNode = <Text className='text-success'>订单已完成</Text>;
    } else if (timeoutFlag === 1 && processStatus !== "WAIT_XS_C_CARD") {
      orderStatusNode = <Text className='text-warning'>订单已超时</Text>;
    } else {
      orderStatusNode = <Text>订单正常</Text>;
    }

    return (
      <View className='at-card order-card__root' onClick={onClick}>
        <View className='at-card__header'>
          <Text className='taro-text at-card__header-title'>
            {dataSource.orderTypeName}
          </Text>
          <View className='taro-text at-card__header-extra'>
            {orderStatusNode}
          </View>
        </View>
        <View className='at-card__content'>
          <View className='at-row'>
            <View className='at-col at-col-4'>订单日期：</View>
            <View className='at-col at-col-8'>{dataSource.createTime}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>客户姓名：</View>
            <View className='at-col at-col-8'>{dataSource.realName}</View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-4'>手机号码：</View>
            <View className='at-col at-col-8'>{dataSource.phone}</View>
          </View>
          {dataSource.orderType === 1 && (
            <View>
              <View className='at-row'>
                <View className='at-col at-col-4'>评估车型：</View>
                <View className='at-col at-col-8'>
                  {dataSource.carName || "无"}
                </View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-4'>购车时间：</View>
                <View className='at-col at-col-8'>
                  {dataSource.buyTime ? `${dataSource.buyTime} 年` : "无"}
                </View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-4'>车架号VIN码：</View>
                <View className='at-col at-col-8 at-col--wrap'>
                  {dataSource.vinCode || "无"}
                </View>
              </View>
            </View>
          )}

          {dataSource.orderType === 4 && (
            <View>
              <View className='at-row'>
                <View className='at-col at-col-4'>被介绍人姓名：</View>
                <View className='at-col at-col-8'>
                  {dataSource.newRealName || "无"}
                </View>
              </View>
              <View className='at-row'>
                <View className='at-col at-col-5'>被介绍人手机号：</View>
                <View className='at-col at-col-7'>
                  {dataSource.newPhone || "无"}
                </View>
              </View>
            </View>
          )}
          <View className='tag-list' onClick={loop}>
            {dataSource.orderType !== 1 && dataSource.orderStatus === 3 && (
              <View className='at-tag at-tag--circle'>
                {/\d+/g.test(dataSource.orderResult + "")
                  ? orderResultMap[dataSource.orderResult]
                  : dataSource.orderResult}
              </View>
            )}

            {dataSource.orderStatus === 3 && (
              <View className='at-tag at-tag--circle'>
                {dataSource.evaluationStatus === 1 ? "已" : "未"}评价
              </View>
            )}
            {dataSource.orderStatus !== 3 && (
              <View className='at-tag at-tag--circle'>
                {dataSource.processStatusName}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
