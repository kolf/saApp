import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default class extends PureComponent {
  state = {};

  render() {
    return (
      <View className='at-list__item'>
        <View className='at-list__item-container'>
          <View className='at-list__item-content item-content'>
            <View className='item-content__info'>
              <View className='item-content__info-title'>
                {this.props.title}
                {this.props.isRequire && (
                  <Text className='item-content__isRequire'>*</Text>
                )}
              </View>
            </View>
          </View>
          <View className='at-list__item-extra item-extra'>
            <View className='item-extra__info item-extra__info'>
              {this.props.renderExtra}
            </View>
            {this.props.arrow && (
              <View className='item-extra__icon'>
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
