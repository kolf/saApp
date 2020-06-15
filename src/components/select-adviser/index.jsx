import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar } from "@/npm/taro-ui/dist";
import XRadio from "../../components/x-radio";
import "./index.scss";
import avatarUrl from "@/assets/images/default-avatar.png";
import { getadvisersList } from "../../servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "选择顾问"
  };

  state = {
    listData: [],
    keyword: ""
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { userType } = this.props;
    getadvisersList({
      positionName: userType,
      realName: this.state.keyword
    }).then(res => {
      this.setState({
        listData: this.markData(res.data)
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
        extraText: item.phone,
        thumb: item.avatarUrl || avatarUrl
      }));
  };

  handleChange = adviserId => {
    this.props.onChange(adviserId);
  };

  render() {
    const { listData } = this.state;

    return (
      <View className="page bg-gray adviser__root">
        <AtSearchBar className="adviser__search-bar" />
        {listData.length > 0 && (
          <View className="adviser__list">
            <XRadio options={listData} onChange={this.handleChange} />
          </View>
        )}
      </View>
    );
  }
}
