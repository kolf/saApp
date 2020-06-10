import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "../../npm/taro-ui/dist";
import "./index.scss";

import { goTo } from "../../utils";

class Index extends Component {
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
      goTo("report-top10-fw");
      return;
    } else if (key == "ESCB") {
      goTo("report-top10-esc");
    } else {
      goTo("report-top10-xs");
    }
  };

  render() {
    return (
      <View className="page all-employees__root bg-gray">
        <View className="all-employees__list gap-top">
          <AtList hasBorder={false}>
            {this.state.listData.map(item => (
              <AtListItem
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

export default Index;
