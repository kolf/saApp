import Taro, { PureComponent } from "@tarojs/taro";
import { Text } from "@tarojs/components";

class Index extends PureComponent {
  state = {
    count: 0
  };

  onStart = () => {
    this.setState({
      count: 60
    });

    this.timer = setInterval(() => {
      const { count } = this.state;
      if (count === 0) {
        clearInterval(this.timer);
        return;
      }
      this.setState({
        count: count - 1
      });
    }, 1000);
  };

  handleClick = () => {
    if (this.state.count !== 0 || this.props.disabled) {
      return;
    }
    this.onStart();
    this.props.onStart();
  };

  render() {
    const { count } = this.state;
    return (
      <Text onClick={this.handleClick}>
        {count <= 0 ? "获取验证码" : `验证码获取中(${count})`}
      </Text>
    );
  }
}
export default Index;
