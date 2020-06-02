import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";

import imgUrl from "../../assets/images/logo_title.png";

import "./index.scss";

export default class Index extends Component {
  static defaultProps = {
    style: null
  };

  render() {
    if (this.props.loading) {
      return (
        <View className="empty-data__root">
          <AtActivityIndicator mode="center" content="加载中..." />
        </View>
      );
    }

    return (
      <View className="empty-data__root" style={this.props.style}>
        <View className="empty-data__title">
          <Image
            src={imgUrl}
            className="img"
            mode="widthFix"
            style="width:200px"
          />
        </View>
        <View className="empty-data__content">{this.props.children}</View>
      </View>
    );
  }
}
