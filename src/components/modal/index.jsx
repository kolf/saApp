import Taro, { PureComponent } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtModal, AtModalContent, AtModalAction } from "@/npm/taro-ui/dist";
import "./index.scss";

export default class Index extends PureComponent {
  static defaultProps = {
    onCancel() {},
    onOk() {},
    contentClassName: "modal__body"
  };

  render() {
    return (
      <AtModal isOpened className="modal__root" closeOnClickOverlay={false}>
        <View className="modal__header">{this.props.title}</View>
        <AtModalContent className={this.props.contentClassName}>
          {this.props.children}
        </AtModalContent>
        <AtModalAction className='modal__footer'>
          <Button className='modal__footer-btn' onClick={this.props.onCancel}>取消</Button>
          <Button className='modal__footer-btn' onClick={this.props.onOk}>确定</Button>
        </AtModalAction>
      </AtModal>
    );
  }
}
