import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtSearchBar } from "@/npm/taro-ui/dist";
import EmptyData from "@/components/empty-data";
import "./index.scss";
import defaultAvatarUrl from "@/assets/images/default-avatar.png";
import { getNewStaffList } from "@/servers/apis";
import { goTo } from "@/utils";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "新的员工"
  };

  state = {
    keyword: "",
    listData: [],
    isFetching: true
  };

  componentDidShow() {
    this.loadData();
  }

  handleClick = key => {
    goTo("/admin/pages/owner-details", {
      id: key,
      isNew: "1"
    });
  };

  handleChange = value => {
    this.setState({ keyword: value });
  };

  handleClear = () => {
    this.setState(
      {
        keyword: ""
      },
      () => {
        this.loadData();
      }
    );
  };

  loadData = () => {
    this.setState({
      isFetching: true
    });
    getNewStaffList({
      realName: this.state.keyword
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
      <View className="page owner__root">
        <AtSearchBar
          onClear={this.handleClear}
          className="owner__search-bar"
          value={this.state.keyword}
          onChange={this.handleChange.bind(this)}
          onActionClick={this.loadData}
        />
        {listData.length > 0 ? (
          <AtList>
            {listData.map(item => (
              <AtListItem
                key={item.key}
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
