import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton } from "../../npm/taro-ui/dist";
import "./index.scss";

function loop(e) {
  e.stopPropagation();
}

const orderResultMap = {
  0: "未成交",
  1: "成交",
  "": "未成交"
};

export default function OrderCard({ dataSource, onClick }) {
  if (!dataSource) {
    return null;
  }

  let renderStatus = null;
  const { processStatus, timeoutFlag } = dataSource;
  if (processStatus === "FINISH") {
    renderStatus = <Text className="text-success">订单已完成</Text>;
  } else if (timeoutFlag === 1 && processStatus !== "WAIT_XS_C_CARD") {
    renderStatus = <Text className="text-warning">订单已超时</Text>;
  } else {
    renderStatus = <Text className="text-primary">订单正常</Text>;
  }

  return (
    <View className="at-card order-card__root" onClick={onClick}>
      <View className="at-card__header order-card__header">
        <Text className="taro-text at-card__header-title order-card__header-title">
          {dataSource.orderTypeName}
        </Text>
        <View className="taro-text at-card__header-extra">{renderStatus}</View>
      </View>
      <View className="at-card__content order-card__content">
        <View className="at-row">
          <View className="at-col at-col-4">订单日期：</View>
          <View className="at-col at-col-8">{dataSource.createTime}</View>
        </View>
        <View className="at-row">
          <View className="at-col at-col-4">客户姓名：</View>
          <View className="at-col at-col-8">{dataSource.realName}</View>
        </View>
        <View className="at-row">
          <View className="at-col at-col-4">手机号码：</View>
          <View className="at-col at-col-8">{dataSource.phone}</View>
        </View>
        {dataSource.orderType === 1 && (
          <View>
            <View className="at-row">
              <View className="at-col at-col-4">评估车型：</View>
              <View className="at-col at-col-8">
                {dataSource.carName || "无"}
              </View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">购车时间：</View>
              <View className="at-col at-col-8">
                {dataSource.buyTime ? `${dataSource.buyTime} 年` : "无"}
              </View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">车架号VIN码：</View>
              <View className="at-col at-col-8 at-col--wrap">
                {dataSource.vinCode || "无"}
              </View>
            </View>
          </View>
        )}

        {dataSource.orderType === 4 && (
          <View>
            <View className="at-row">
              <View className="at-col at-col-4">被介绍人姓名：</View>
              <View className="at-col at-col-8">
                {dataSource.newRealName || "无"}
              </View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-5">被介绍人手机号：</View>
              <View className="at-col at-col-7">
                {dataSource.newPhone || "无"}
              </View>
            </View>
          </View>
        )}
        <View className="order-card__footer" onClick={loop}>
          {dataSource.orderType !== 1 && dataSource.orderStatus === 3 && (
            <AtButton type="secondary" size="small" className="btn-mini">
              {/\d+/g.test(dataSource.orderResult + "")
                ? orderResultMap[dataSource.orderResult]
                : dataSource.orderResult}
            </AtButton>
          )}

          {dataSource.orderStatus === 3 && (
            <AtButton type="secondary" size="small" className="btn-mini">
              {dataSource.evaluationStatus === 1 ? "已" : "未"}评价
            </AtButton>
          )}
          {dataSource.orderStatus !== 3 && (
            <AtButton type="secondary" size="small" className="btn-mini">
              {dataSource.processStatusName}
            </AtButton>
          )}
        </View>
      </View>
    </View>
  );
}
