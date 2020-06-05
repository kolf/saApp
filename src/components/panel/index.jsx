import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default class Index extends PureComponent {
  static defaultProps = {
    onClick() {},
    style: null
  };

  render() {
    const { title, bodyTitle, onClick, children, style } = this.props;

    return (
      <View className="panel__root" style={style} onClick={onClick}>
        {title && (
          <View className="panel__heading">
            <Text className="panel__heading-title">{title}</Text>
            <View className="panel__heading-extra">
              {this.props.renderExtra}
            </View>
          </View>
        )}
        <View className="panel__body">
          {bodyTitle && <View className="panel__body-title">{bodyTitle}</View>}
          {children}
        </View>
        <View className="panel__footer">{this.props.renderFooter}</View>
      </View>
    );
  }
}
