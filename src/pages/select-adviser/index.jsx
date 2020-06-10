import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar, AtButton } from "../../npm/taro-ui/dist";
import XRadio from "../../components/x-radio";
import "./index.scss";
import avatarUrl from "../../assets/images/default-avatar.png";
import { getadvisersList } from "../../servers/apis";
import storage from "../../utils/storage";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "选择顾问"
  };

  state = {
    listData: [],
    keyword: ""
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    const { userType } = this.$router.params;
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
    this.setState({
      adviserId
    });
  };

  handleSubmit = () => {
    const { listData, adviserId } = this.state;

    storage.set("orderAdviserData", listData.find(o => o.value === adviserId));

    Taro.navigateBack({
      delta: 1 // 返回上一级页面。
    });
  };

  render() {
    const { listData, adviserId } = this.state;

    return (
      <View className='page bg-gray adviser__root'>
        <AtSearchBar className='adviser__search-bar' />
        {listData.length > 0 && (
          <View className='gap-top adviser__list'>
            <XRadio options={listData} onChange={this.handleChange} />
          </View>
        )}
        <View className='next-button-wrap'>
          <AtButton
            disabled={!adviserId}
            type='primary'
            onClick={this.handleSubmit}
          >
            确定
          </AtButton>
        </View>
      </View>
    );
  }
}
