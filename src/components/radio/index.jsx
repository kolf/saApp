import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  static defaultProps = {
    options: [],
    onClick() {},
    value: ""
  };

  handleClick = (index, e) => {
    const { options, onClick } = this.props;
    onClick(options[index].value);
  };

  render() {
    const { options, value } = this.props;

    return (
      <View className="at-radio radio__root">
        {options.map((o, index) => (
          <View
            key={o.value}
            className="at-radio__option"
            onClick={this.handleClick.bind(this, index)}
          >
            <View className="at-radio__option-wrap">
              <View className="at-radio__option-container">
                <View className="at-radio__title">{o.label}</View>
                <View
                  className={classNames("at-radio__icon radio__icon", {
                    active: value === o.value
                  })}
                ></View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
