import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtSearchBar } from "@/npm/taro-ui/dist";
import EmptyData from "@/components/empty-data";
import SearchInput from "@/components/search-input";
import "./index.scss";
import defaultAvatarUrl from "@/assets/images/default-avatar.png";
import { getNewStaffList } from "@/servers/apis";
import { goTo } from "@/utils";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "新的员工"
  };

  state = {
    listData: [],
    isFetching: true
  };

  keyword = ''

  componentDidShow() {
    this.loadData();
  }

  handleClick = key => {
    goTo("/admin/pages/owner-details", {
      id: key,
      isNew: "1"
    });
  };

  onSearch = keyword => {
    this.keyword=keyword;
    this.loadData();
  };

  loadData = () => {
    this.setState({
      isFetching: true
    });
    getNewStaffList({
      realName: this.keyword
    }).then(res => {
      this.setState({
        isFetching: false,
        listData: this.makeData(res.data)
      });
    });
  };

  makeData = data => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map(item => ({
      key: item.id,
      name: item.realName,
      avatar: item.avatarUrl || defaultAvatarUrl
    }));
  };

  render() {
    const { listData, isFetching } = this.state;

    return (
      <View className="page new-owner__root">
        <View className="new-owner__search-bar">
          <SearchInput onSearch={this.onSearch} />
        </View>
        {listData.length > 0 ? (
          <AtList className="gap-top">
            {listData.map(item => (
              <AtListItem
                key={item.key}
                className="new-owner__list-item"
                title={item.name}
                thumb={item.avatar}
                arrow="right"
                extraText={/^-1/g.test(item.saBing) ? "添加失败" : "未添加"}
                onClick={this.handleClick.bind(this, item.key)}
              />
            ))}
          </AtList>
        ) : (
          <EmptyData loading={isFetching}>
            暂时还没有新员工 我们一起努力吧
          </EmptyData>
        )}
      </View>
    );
  }
}
