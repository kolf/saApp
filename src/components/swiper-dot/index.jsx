import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

class Index extends PureComponent {
  render() {
    const { size } = this.props;
    if (!size) {
      return;
    }
    return (
      <View className="swiper-dot__root">
        {Array.from({ length: size }, () => 1).map((o, index) => (
          <Text
            key={o + "" + index}
            className={`swiper-dot__item${
              this.props.current === index ? " active" : ""
            }`}
          />
        ))}
      </View>
    );
  }
}
export default Index;
