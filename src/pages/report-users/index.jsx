import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { AtTabs, AtSegmentedControl } from "taro-ui";
import F2 from "@antv/f2";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "个人统计"
  };

  drawRadar(canvas, width, height) {
    const data = [
      { year: "07/01", sales: 38 },
      { year: "07/02", sales: 52 },
      { year: "07/03", sales: 61 },
      { year: "07/04", sales: 145 },
      { year: "07/05", sales: 48 },
      { year: "07/06", sales: 38 },
      { year: "07/07", sales: 38 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const { items } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = "¥ " + items[0].value;
      }
    });
    chart.interval().position("year*sales");
    chart.render();
    return chart;
  }
  handleTabClick = e => {
    this.setState({
      activeKey: e
    });
  };

  render() {
    const { activeKey } = this.state;

    const tabList = [
      { title: `日`, value: "0" },
      { title: `周`, value: "1" },
      { title: `月`, value: "2" }
    ];
    return (
      <View className="page report__root">
        <AtTabs
          current={activeKey}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
        />
        <View className="report__control-wrap">
          <AtSegmentedControl values={["成交率报表", "成交率趋势"]} />
        </View>
        <View style="width:100%;height:320px">
          <F2Canvas onCanvasInit={this.drawRadar.bind(this)}></F2Canvas>
        </View>
        <View className="at-list  text-center">
          <View className="at-row at-list__item table-head text-center">
            <View className="at-col at-col-3">业务项</View>
            <View className="at-col at-col-3">销售部</View>
            <View className="at-col at-col-3">二手车部</View>
            <View className="at-col at-col-3">总台数</View>
          </View>
          <View className="table-body">
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">接单台数</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">接单台数</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">超时台数</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">超时率</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">超时成交</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
            <View className="at-row at-list__item">
              <View className="at-col at-col-3">超时未成交</View>
              <View className="at-col at-col-3">15</View>
              <View className="at-col at-col-3">10</View>
              <View className="at-col at-col-3">45</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
