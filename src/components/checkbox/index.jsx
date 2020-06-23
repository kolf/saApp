import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "@/npm/taro-ui/dist";
import classNames from "classnames";
import "./index.scss";

export default function Checkbox({ children, checked, onClick }) {
  return (
    <View className="checkbox__root" onClick={onClick}>
      <View
        className={classNames("checkbox__icon-cnt", {
          checked
        })}
      >
        {checked && (
          <AtIcon className="checkbox__icon" value="check" size={10} />
        )}
      </View>
      <Text className="checkbox__title">{children}</Text>
    </View>
  );
}
