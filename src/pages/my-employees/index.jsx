import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtIndexes, AtSearchBar } from "taro-ui";
import TabBar from "../../components/tabbar";
import EmptyData from "../../components/empty-data";
import NetworkError from "../../components/network-error";
import "./index.scss";

import newFriendUrl from "../../assets/images/add2x.png";
import defaultAvatarUrl from "../../assets/images/default-avatar.png";
import { getStaffList } from "../../servers/apis";
import { goTo } from "../../utils";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "员工列表"
  };

  state = {
    listData: [],
    total: 0,
    isFetching: false,
    isError: false,
    keyword: ""
  };

  componentDidShow() {
    this.loadData();
  }

  handleClick = ({ key }) => {
    goTo("employees-details", {
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
    getStaffList({
      realName: this.state.keyword
    })
      .then(res => {
        const { staffList, newStaffCount } = res.data;
        const listData = this.makeData(staffList);
        this.setState({
          listData,
          total: staffList.length,
          newCount: newStaffCount
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
      const groupKey = /[A-Z]/.test(item.nameSZM) ? item.nameSZM : "#";
      const index = result.findIndex(r => r.key === groupKey);
      const newItem = {
        key: item.id,
        name: item.realName,
        avatar: item.avatarUrl || defaultAvatarUrl
      };
      if (index !== -1) {
        result[index].items.push(newItem);
      } else {
        result.push({
          title: groupKey,
          key: groupKey,
          items: [newItem]
        });
      }
      return result;
    }, []);
  };

  render() {
    const { listData, total, isFetching, isError, newCount } = this.state;
    return (
      <View className="page my-employees__root">
        {!isError && (
          <View className="my-employees__main">
            <AtIndexes list={listData} onClick={this.handleClick.bind(this)}>
              <AtSearchBar
                className="my-employees__search-bar"
                onClear={this.handleClear}
                value={this.state.keyword}
                onChange={this.handleChange.bind(this)}
                onActionClick={this.handleSubmit.bind(this)}
              />
              <AtList>
                <AtListItem
                  arrow="right"
                  title="新的员工"
                  thumb={newFriendUrl}
                  extraBange={newCount}
                  onClick={goTo.bind(this, "new-employees")}
                />
              </AtList>

              {listData.length === 0 && (
                <EmptyData
                  loading={isFetching}
                  style={{ padding: "20vh 60px" }}
                >
                  系统还没有添加过员工 我们一起努力吧
                </EmptyData>
              )}
            </AtIndexes>
            <View className="my-employees__list-total text-center">
              共{total}位员工
            </View>
          </View>
        )}
        {isError && <NetworkError onClick={this.loadData} />}
        <TabBar
          activeKey={0}
          tabKeys={["my-employees", "report", "all-order", "admin-profile"]}
        />
      </View>
    );
  }
}
