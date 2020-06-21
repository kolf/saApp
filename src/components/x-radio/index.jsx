import Taro, { Component } from "@tarojs/taro";
import { AtCheckbox } from "@/npm/taro-ui/dist";
import "./index.scss";

export default class Index extends Component {
  static defaultProps = {
    onChange() {}
  };

  state = {
    checkedList: []
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { checkedList } = this.state;
    let value = "";
    if (e.length === 0 && checkedList.length === 1) {
      value = checkedList[0];
    } else if (e.length > 1) {
      value = e[1];
    } else {
      value = e[0];
    }
    this.setState({
      checkedList: [value]
    });

    onChange(value);
  };

  render() {
    const { options } = this.props;
    const { checkedList } = this.state;

    return (
      <AtCheckbox
        className='radio-xs no-border'
        options={options}
        selectedList={checkedList}
        onChange={this.handleChange}
      />
    );
  }
}
