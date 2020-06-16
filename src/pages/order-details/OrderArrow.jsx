import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";
import "./OrderArrow.scss";

export default function OrderStatus({
  orderResult,
  orderType,
  orderStatus,
  timeoutFlag,
  processStatus
}) {
  let name = "正常";
  if (orderType === 1 && orderStatus >= 2) {
    name = "已评估";
  } else if (orderResult === 1) {
    name = "已成交";
  } else if (orderResult === 0) {
    name = "未成交";
  } else if (timeoutFlag === 1 && processStatus !== "WAIT_XS_C_CARD") {
    name = "已超时";
  }

  return (
    <View
      className={classNames("order-status__root", {
        error: /^已超时$/.test(name),
        disabled: /^未成交$/.test(name)
      })}
    >
      {name}
    </View>
  );
}
