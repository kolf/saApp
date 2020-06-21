import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtSearchBar } from "@/npm/taro-ui/dist";
import EmptyData from "@/components/empty-data";
import SearchInput from "@/components/search-input";
import "./index.scss";
import defaultAvatarUrl from "@/assets/images/default-avatar.png";
import { getNewCUList } from "@/servers/apis";
import { goTo } from "@/utils";

function loop(e) {
  e.stopPropagation();
}

const bindStatusMap = {
  "-1": "添加失败",
  0: "未添加",
  1: "已添加"
};
export default class Index extends Component {
  config = {
    navigationBarTitleText: "新的客户"
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
    goTo("/owner/pages/user-details", {
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
    getNewCUList({
      realName: this.keyword
    }).then(res => {
      this.setState({
        isFetching: false,
        listData: this.makeData(res.data.newCUs)
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
      status: item.saBind,
      avatar: item.avatarUrl || defaultAvatarUrl
    }));
  };

  render() {
    const { listData, isFetching } = this.state;

    return (
      <View className="page bg-gray new-user__root">
        <View className="new-user__search-bar">
          <SearchInput onSearch={this.onSearch} />
        </View>
        {listData.length > 0 ? (
          <AtList className="gap-top">
            {listData.map(item => (
              <AtListItem
                key={item.key}
                className="new-user__list-item"
                title={item.name}
                arrow={item.status !== 1 ? "right" : null}
                extraText={bindStatusMap[item.status]}
                thumb={item.avatar}
                onClick={
                  item.status !== 1
                    ? this.handleClick.bind(this, item.key)
                    : loop
                }
              />
            ))}
          </AtList>
        ) : (
          <EmptyData loading={isFetching}>
            您暂时还没有新客户 我们一起努力吧
          </EmptyData>
        )}
      </View>
    );
  }
}
