import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "@/npm/taro-ui/dist";
import "./index.scss";

import { goTo } from "@/utils";
export default  class Index extends Component {
  config = {
    navigationBarTitleText: "排行榜"
  };

  state = {
    listData: [
      {
        title: "服务部",
        key: "FWB"
      },
      {
        title: "二手车部",
        key: "ESCB"
      },
      {
        title: "销售部",
        key: "XSB"
      }
    ]
  };

  handleClick = key => {
    if (key === "FWB") {
      goTo("/admin/pages/report-top10-fw");
      return;
    } else if (key == "ESCB") {
      goTo("/admin/pages/report-top10-esc");
    } else {
      goTo("/admin/pages/report-top10-xs");
    }
  };

  render() {
    const { listData } = this.state;
    return (
      <View className="page owner-category__root bg-gray">
        <View className="owner-category__list">
          <AtList hasBorder={false}>
            {listData.map((item, index) => (
              <AtListItem
                className={index === listData.length-1 ? "no-border" : ""}
                key={item.key}
                title={item.title}
                onClick={this.handleClick.bind(this, item.key)}
                arrow="right"
              />
            ))}
          </AtList>
        </View>
      </View>
    );
  }
}


