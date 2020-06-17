import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

class Index extends PureComponent {
  static defaultProps = {
    onChange() {}
  };

  state = {
    current: -1
  };

  componentWillReceiveProps(nextProps, nextContext) {}

  handleClick = current => {
    this.setState({
      current
    });
    this.props.onChange(current);
  };

  render() {
    const { options } = this.props;
    const { current } = this.state;
    return (
      <View className='tabs__root'>
        {options.map((o, index) => (
          <View
            className={classNames("tabs__item", {
              "tabs__item--active": index === current
            })}
            onClick={this.handleClick.bind(this, index)}
          >
            {o.label}
          </View>
        ))}
      </View>
    );
  }
}
export default Index;
