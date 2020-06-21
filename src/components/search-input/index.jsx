import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { AtIcon } from "../../npm/taro-ui/dist";
import "./index.scss";

export default class SearchInput extends Component {
  static defaultProps = {
    placeholder: "搜索",
    onSearch() {},
    onChange() {}
  };

  state = {
    value: ""
  };

  componentDidMount() {}

  onSearch = e => {
    const { value } = this.state;
    this.props.onSearch(value);
  };

  handleChange = e => {
    let nextValue = e.target.value;
    this.setState({
      value: nextValue
    });
    this.props.onChange(nextValue);
  };

  handleClear = e => {
    console.log(e, this)
    this.setState(
      {
        value: ""
      },
    );

    this.props.onSearch('')
  };

  render() {
    const { value } = this.state;
    console.log(value, 'value')
    return (
      <View className="search-input__root">
        <View className="search-input__icon">
          <AtIcon value="search" size={18} />
        </View>
        <Input
          className="search-input__input"
          placeholder={this.props.placeholder}
          type="search"
          confirmType="搜索"
          value={value}
          onInput={this.handleChange}
          onConfirm={this.onSearch}
        />
        {value && (
          <View className="search-input__clear"  onTouchStart={this.handleClear} >
            <AtIcon value="close-circle" size={16}/>
          </View>
        )}
      </View>
    );
  }
}
