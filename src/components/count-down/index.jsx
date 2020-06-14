import Taro, { PureComponent } from "@tarojs/taro";
import { Text } from "@tarojs/components";

export default class Index extends PureComponent {
  static defaultProps = {
    onError() {},
    onStart() {}
  };

  state = {
    count: 0
  };

  onStart = () => {
    this.setState({
      count: 60
    });

    const timer = setInterval(() => {
      const { count } = this.state;
      if (count === 0) {
        clearInterval(timer);
        return;
      }
      this.setState({
        count: count - 1
      });
    }, 1000);
  };

  handleClick = () => {
    if (this.props.disabled) {
      this.props.onError();
      return;
    }

    if (this.state.count !== 0) {
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
