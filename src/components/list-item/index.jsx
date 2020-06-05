import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default class Index extends PureComponent {
  static defaultProps = {
    style: null,
    className: ""
  };

  render() {
    return (
      <View
        className={"list__item at-list__item " + this.props.className}
        style={this.props.style}
      >
        <View className="at-list__item-container">
          <View className="at-list__item-content item-content">
            <View className="item-content__info">
              <View className="item-content__info-title">
                {this.props.title}
                {this.props.isRequire && (
                  <Text className="item-content__isRequire">*</Text>
                )}
              </View>
            </View>
          </View>
          <View
            className="at-list__item-extra item-extra"
            style={{ minWidth: "180px" }}
          >
            <View
              className="item-extra__info item-extra__info"
              style={{ paddingRight: this.props.arrow ? "32rpx" : 0 }}
            >
              {this.props.renderExtra}
            </View>
            {this.props.arrow && (
              <View className="item-extra__icon">
                <Text
                  className={`at-icon item-extra__icon-arrow at-icon-chevron-${this.props.arrow}`}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
