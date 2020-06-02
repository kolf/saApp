import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./index.scss";

// const icons = ["biaoqing2", "wubiaoqing", "biaoqing"];
const iconOptions = [
  {
    value: "wubiaoqing",
    label: "非常差"
  },
  {
    value: "biaoqing2",
    label: "一般"
  },
  {
    value: "biaoqing",
    label: "超赞"
  }
];

class Index extends PureComponent {
  static defaultProps = {
    onChange() {}
  };

  handleChange = index => {
    this.props.onChange(index);
  };

  render() {
    return (
      <View className="reta-radio__root">
        {iconOptions.map((icon, index) => (
          <View
            onClick={this.handleChange.bind(this, index)}
            key={icon.value}
            className={
              this.props.activeKey === index
                ? "reta-radio__item active"
                : "reta-radio__item"
            }
          >
            <AtIcon prefixClass="iconfont" value={icon.value} size="24" />
            <View>{icon.label}</View>
          </View>
        ))}
      </View>
    );
  }
}
export default Index;
