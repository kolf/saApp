import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton } from "../../npm/taro-ui/dist";
import PropTypes from "prop-types";
import imgUrl from "../../assets/images/network_error.png";
import "./index.scss";

export default class Index extends Component {
  static defaultProps = {
    onClick: () => {},
    content: "系统太忙了，请稍后再试"
  };

  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    return (
      <View className="network-error__root">
        <View className="img">
          <Image src={imgUrl} mode="widthFix" style="width:200px" />
        </View>
        <View className="network-error__content text-center">
          {this.props.content}
        </View>
        <View className="text-center">
          <AtButton
            size="small"
            type="secondary"
            onClick={this.props.onClick}
            style={{ width: 120 }}
          >
            刷新
          </AtButton>
        </View>
      </View>
    );
  }
}
