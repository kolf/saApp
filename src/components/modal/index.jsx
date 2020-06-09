import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtModal, AtModalContent,AtIcon } from "../../npm/taro-ui/dist";
import "./index.scss";

export default class Index extends PureComponent {
  static defaultProps = {
    onCancel() {},
    contentClassName: "modal__body"
  };

  render() {
    return (
      <AtModal
        isOpened
        className="modal__root"
        closeOnClickOverlay={false}
      >
        <View className="modal__header">
          {this.props.title}
          <View className="modal__close" onClick={this.props.onCancel}>
            <AtIcon value="close" size="16" color="#666" />
          </View>
        </View>
        <AtModalContent className={this.props.contentClassName}>
          {this.props.children}
        </AtModalContent>
        <View className="modal__footer">{this.props.renderFooter}</View>
      </AtModal>
    );
  }
}
