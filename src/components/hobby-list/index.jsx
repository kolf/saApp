import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

const options = [
  "读书",
  "打球",
  "唱歌",
  "跳舞",
  "游戏",
  "种花",
  "旅行",
  "摄影",
  "其他"
];

export default class extends PureComponent {
  static defaultProps = {
    onChange() {},
    value: [],
    style: null
  };

  state = {
    value: []
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.value, "nextProps.value");
    if (JSON.stringify(nextProps.value) !== JSON.stringify(this.state.value)) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleClick = newValue => {
    const { value } = this.state;
    let nextValue = [];
    if (value.includes(newValue)) {
      nextValue = value.filter(v => v !== newValue);
    } else {
      nextValue = [...value, newValue];
    }
    this.setState({ value: nextValue });
    this.props.onChange(nextValue);
  };

  render() {
    const { style } = this.props;
    const { value } = this.state;
    return (
      <View className="hobby-list__root" style={style}>
        <View className="at-row at-row--wrap">
          {options.map(o => (
            <View key={o} className="at-col at-col-4">
              <View
                onClick={this.handleClick.bind(this, o)}
                className={`hobby-list__item${
                  value.includes(o) ? " active" : ""
                }`}
              >
                {o}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
