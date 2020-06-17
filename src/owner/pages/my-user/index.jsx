import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtIndexes, AtSearchBar } from "@/npm/taro-ui/dist";
import EmptyData from "@/components/empty-data";
import NetworkError from "@/components/network-error";
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
    isFetching: false,
    isError: false,
    keyword: "",
    userInfo: storage.get("userInfo") || {}
  };

  componentDidShow() {
    this.loadData();
  }

  handleClick = ({ key }) => {
    goTo("/owner/pages/user-details", {
      id: key
    });
  };

  handleChange = value => {
    this.setState({ keyword: value });
  };

  handleSubmit = () => {
    this.loadData();
  };

  handleClear = () => {
    this.setState(
      {
        keyword: ""
      },
      this.loadData
    );
  };

  loadData = () => {
    this.setState({
      isFetching: true,
      isError: false
    });
    getCuList({
      realName: this.state.keyword
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
      <View className="page owner__root">
        {!isError && (
          <View className="owner__main">
            <AtIndexes className='indexes__list' list={listData} onClick={this.handleClick.bind(this)}>
              <AtSearchBar
                className="owner__search-bar"
                onClear={this.handleClear}
                value={this.state.keyword}
                onChange={this.handleChange.bind(this)}
                onActionClick={this.handleSubmit.bind(this)}
              />
              {type === "FW" && (
                <AtList className="gap-top">
                  <AtListItem
                    arrow="right"
                    title="新的客户"
                    thumb={newFriendUrl}
                    extraBange={newCUCount}
                    onClick={goTo.bind(this, "/owner/pages/new-user")}
                  />
                </AtList>
              )}

              {listData.length === 0 && (
                <EmptyData
                  loading={isFetching}
                  style={{ padding: "20vh 60px" }}
                >
                  你还没有添加过客户 我们一起努力吧
                </EmptyData>
              )}
            </AtIndexes>
            <View className="owner__list-total text-center">
              共{total}位客户
            </View>
          </View>
        )}
        {isError && <NetworkError onClick={this.loadData} />}
      </View>
    );
  }
}
