import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtIcon} from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    current: 0,
    height: 600
  };

  componentDidMount() {

    // const height = window.innerHeight - 80;
    // this.setState({
    //   height
    // });
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  render() {
    return (
      <AtTabs
        current={this.state.current}
        scroll
        height='100vh'
        tabDirection="vertical"
        tabList={[
          { title: "客户信息",icon: 'user' },
          { title: "意向车型",icon: 'faver' },
          { title: "经销店信息",icon: 'shops' },
          { title: "服务订单信息",icon: 'user-love' },
          { title: "A卡信息",icon: 'pin' },
          { title: "成交信息",icon: 'note' },
          { title: "预约试驾",icon: 'steering' },
          { title: "订单是否有效",icon: 'note-error' }
        ]}
        onClick={this.handleClick.bind(this)}
      >
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={0}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            <AtIcon prefixClass='icon' value='user' />标签页一的内容
          </View>
        </AtTabsPane>
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={1}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            标签页二的内容
          </View>
        </AtTabsPane>
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={2}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            标签页三的内容
          </View>
        </AtTabsPane>
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={3}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            标签页四的内容
          </View>
        </AtTabsPane>
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={4}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            标签页五的内容
          </View>
        </AtTabsPane>
        <AtTabsPane
          tabDirection="vertical"
          current={this.state.current}
          index={5}
        >
          <View style="font-size:18px;text-align:center;height:200px;">
            标签页六的内容
          </View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}
