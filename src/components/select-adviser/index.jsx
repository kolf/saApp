import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import { AtSearchBar } from "@/npm/taro-ui/dist";
import KRadio from "../../components/radio";
import SearchInput from "../../components/search-input";
import "./index.scss";
import avatarUrl from "@/assets/images/default-avatar.png";
import { getadvisersList } from "../../servers/apis";

export default class Index extends Component {
  static defaultProps = {
    onChange() {}
  };

  config = {
    navigationBarTitleText: "选择顾问"
  };

  state = {
    listData: [],
    isFetching: true
  };

  keyword = "";

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { userType } = this.props;
    getadvisersList({
      positionName: userType,
      realName: this.keyword
    }).then(res => {
      this.setState({
        listData: this.markData(res.data),
        isFetching: false
      });
    });
  };

  markData = data => {
    if (!data) {
      return [];
    }
    return data
      .filter(item => item.realName)
      .map(item => ({
        value: item.id + "",
        label: item.realName,
        desc: item.phone,
        thumb: item.avatarUrl || avatarUrl
      }));
  };

  onSearch = keyword => {
    this.keyword = keyword;
    this.loadData();
  };

  handleChange = index => {
    this.props.onChange(this.state.listData[index].value);
  };

  render() {
    const {showSearch} = this.props
    const { listData } = this.state;

    return (
      <View className="page bg-gray adviser__root">
        {showSearch && <View className="adviser__search-bar">
          <SearchInput onSearch={this.onSearch} />
        </View>}
        {listData.length > 0 && (
          <View className="adviser__list">
            <KRadio options={listData} onChange={this.handleChange} />
          </View>
        )}
      </View>
    );
  }
}
