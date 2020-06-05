import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";

class Index extends PureComponent {
  static defaultProps = {
    className: "",
    onPrev() {},
    onNext() {}
  };

  state = {};
  render() {
    return (
      <View className={this.props.className + " pager__root"}>
        <View className='pager__buttom' onClick={this.props.onPrev}>
          <AtIcon value='chevron-left' />
        </View>
        <Text className='pager__title'>{this.props.title}</Text>
        <View className='pager__buttom' onClick={this.props.onNext}>
          <AtIcon className='page__buttom' value='chevron-right' />
        </View>
      </View>
    );
  }
}
export default Index;
