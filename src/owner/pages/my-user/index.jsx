import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtIndexes, AtSearchBar } from "@/npm/taro-ui/dist";
import EmptyData from "@/components/empty-data";
import NetworkError from "@/components/network-error";
import SearchInput from "@/components/search-input";
import "./index.scss";

import newFriendUrl from "@/assets/images/user-add.svg";
import defaultAvatarUrl from "@/assets/images/default-avatar.png";
import { getCuList } from "@/servers/apis";
import { goTo } from "@/utils";
import storage from "@/utils/storage";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "客户列表"
  };

  state = {
    listData: [],
    total: 0,
    isFetching: true,
    isError: false,
    userInfo: storage.get("userInfo") || {}
  };

  keyword = "";

  componentDidMount() {
    this.loadData();
  }

  handleClick = ({ key }) => {
    goTo("/owner/pages/user-details", {
      id: key
    });
  };

  handleSubmit = keyword => {
    this.keyword = keyword;
    this.loadData();
  };

  loadData = () => {
    this.setState({
      isFetching: true,
      isError: false
    });
    getCuList({
      realName: this.keyword
    })
      .then(res => {
        const { cus = [], newCUCount = 0 } = res.data;
        const listData = this.makeData(cus);
        this.setState({
          isFetching: false,
          total: cus.length,
          listData,
          newCUCount
        });
      })
      .catch(error => {
        this.setState({
          isFetching: false,
          isError: true
        });
      });
  };

  makeData = data => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.reduce((result, item) => {
      const index = result.findIndex(r => r.key === item.nameSZM);
      const newItem = {
        key: item.id,
        name: item.realName,
        avatar: item.avatarUrl || defaultAvatarUrl
      };
      if (index !== -1) {
        result[index].items.push(newItem);
      } else {
        result.push({
          title: item.nameSZM,
          key: item.nameSZM,
          items: [newItem]
        });
      }
      return result;
    }, []);
  };

  render() {
    const {
      listData,
      total,
      isFetching,
      isError,
      newCUCount,
      userInfo: { type }
    } = this.state;
    return (
      <View className="page bg-gray my-user__root">
        {!isError && (
          <View className="page-content">
            <AtIndexes
              className="indexes__list"
              list={listData}
              onClick={this.handleClick.bind(this)}
            >
              <View className="my-user__search-bar">
                <SearchInput onSearch={this.handleSubmit} />
              </View>
              {type === "FW" && (
                <AtList className="no-border">
                  <AtListItem
                    arrow="right"
                    title="新的客户"
                    thumb={newFriendUrl}
                    badge={newCUCount}
                    onClick={goTo.bind(this, "/owner/pages/new-user")}
                  />
                </AtList>
              )}

              {listData.length === 0 && (
                <View style={{height:'80vh'}}>
                  <EmptyData loading={isFetching}>
                  <View style={{paddingBottom:'24rpx'}}>你还没有添加过客户</View>
                    <View>我们一起努力吧</View>
                  </EmptyData>
                </View>
              )}
            </AtIndexes>
            {listData.length > 0 && !isFetching && (
              <View className="my-user__list-total text-center">
                共{total}位客户
              </View>
            )}
          </View>
        )}
        {isError && <NetworkError onClick={this.loadData} />}
      </View>
    );
  }
}
