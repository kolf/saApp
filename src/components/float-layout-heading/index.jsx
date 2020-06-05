import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

export default class extends PureComponent {
  state = {};

  render() {
    const { onOk, onCancel } = this.props;
    return (
      <View className="float-layout-heading__root">
        <View className="cancel-btn btn text-primary" onClick={onCancel}>
          <Text>取消</Text>
        </View>
        <View className="ok-btn btn" onClick={onOk}>
          <Text>确定</Text>
        </View>
      </View>
    );
  }
}
