import Taro, { PureComponent } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";

export default class Index extends PureComponent {
  state = {
    value: "" //YYYY-MM-DD
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Picker mode="time" onChange={this.handleChange}>
        <View className="picker">{value}</View>
      </Picker>
    );
  }
}
