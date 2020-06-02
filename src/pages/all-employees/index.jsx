import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtAccordion } from "taro-ui";
import "./index.scss";

import { goTo } from "../../utils";
import { getStaffList } from "../../servers/apis";

class Index extends Component {
  config = {
    navigationBarTitleText: "选择员工"
  };

  state = {
    activeIndex: 0,
    isFetching: false,
    listData: [
      {
        title: "服务顾问",
        key: "FW",
        children: []
      },
      {
        title: "二手车顾问",
        key: "ESC",
        children: []
      },
      {
        title: "销售顾问",
        key: "XS",
        children: []
      }
    ]
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      isFetching: true
    });
    getStaffList().then(res => {
      const { staffList } = res.data;
      this.setState({
        listData: this.makeData(staffList),
        isFetching: false
      });
    });
  };

  makeData = data => {
    if (
      this.state.listData[0].children.length === 0 &&
      this.state.listData[1].children.length === 0 &&
      this.state.listData[2].children.length === 0
    ) {
      return data.reduce((result, item) => {
        let parentIndex = result.findIndex(r => item.type === r.key);
        result[parentIndex].children.push({
          id: item.id + "",
          title: item.realName
        });
        return result;
      }, this.state.listData);
    } else {
      return this.state.listData;
    }
  };

  handleAccordionChange = index => {
    this.setState({
      activeKey: this.state.activeKey === index ? -1 : index
    });
  };

  handleClick = (c, key) => {
    goTo(`report-users-${key.toLowerCase()}`, c);
  };

  render() {
    return (
      <View className="page all-employees__root bg-gray">
        <View className="all-employees__list">
          {this.state.listData.map((item, index) => (
            <AtAccordion
              key={item.id}
              title={item.title}
              className="all-employees__list-item"
              open={this.state.activeKey === index}
              onClick={this.handleAccordionChange.bind(this, index)}
            >
              <AtList hasBorder={false}>
                {item.children.map(c => (
                  <AtListItem
                    title={c.title}
                    onClick={this.handleClick.bind(this, c, item.key)}
                    arrow="right"
                  />
                ))}
              </AtList>
            </AtAccordion>
          ))}
        </View>
      </View>
    );
  }
}

export default Index;
