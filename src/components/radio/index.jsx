import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  static defaultProps = {
    options: [],
    onChange() {},
    current: -1
  };

  handleClick = (index, e) => {
    const { onChange } = this.props;
    this.setState({ current: index });
    onChange(index);
  };

  render() {
    const { options } = this.props;
    const { current } = this.state;

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
                {o.thumb && (
                  <View className="radio__thumb">
                    <Image src={o.thumb} mode="aspectFill" className="img" />
                  </View>
                )}
                <View className="radio__cont">
                  <View className="at-radio__title radio__title">
                    {o.label}
                  </View>
                  {o.desc && <View className="radio__desc">{o.desc}</View>}
                </View>
                <View
                  className={classNames("at-radio__icon radio__icon", {
                    active: current === index
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
