import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { AtIcon } from "../../npm/taro-ui/dist";
import "./index.scss";

export default class SearchInput extends Component {
  static defaultProps = {
    placeholder: "搜索"
  };

  state = {};

  componentDidMount() {}

  render() {
    return (
      <View className="search-input__root">
        <View className="search-input__icon">
          <AtIcon value="search" size={18} />
        </View>
        <Input
         className='search-input__input'
          placeholder={this.props.placeholder}
          type="search"
          confirmType="搜索"
        />
      </View>
    );
  }
}
