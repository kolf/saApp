import Taro, { PureComponent } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "@/npm/taro-ui/dist";
import "./index.scss";
import imgUrl1 from "@/assets/images/emoji-01.png";
import imgUrl2 from "@/assets/images/emoji-02.png";
import imgUrl3 from "@/assets/images/emoji-03.png";

// const icons = ["biaoqing2", "wubiaoqing", "biaoqing"];
const options = [
  {
    value: "1",
    label: "非常差",
    imgUrl: imgUrl1
  },
  {
    value: "2",
    label: "一般",
    imgUrl: imgUrl2
  },
  {
    value: "3",
    label: "超赞",
    imgUrl: imgUrl3
  }
];

export default class Index extends PureComponent {
  static defaultProps = {
    onChange() {}
  };

  handleChange = value => {
    this.props.onChange(value);
  };

  render() {
    return (
      <View className="reta-radio__root">
        {options.map(option => (
          <View
            onClick={this.handleChange.bind(this, option.value)}
            key={option.value}
            className={
              this.props.value === option.value
                ? "reta-radio__item active"
                : "reta-radio__item"
            }
          >
            <Image src={option.imgUrl} className="img" mode="widthFix" />
            <View>{option.label}</View>
          </View>
        ))}
      </View>
    );
  }
}

