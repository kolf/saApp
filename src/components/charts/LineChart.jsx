import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";

export default class Index extends Component {
  static defeultProps = {
    dataSource: []
  };

  // chart = null;

  shouldComponentUpdate() {
    if (this.chart) {
      return false;
    }
    return true;
  }

  drawData = (canvas, width, height) => {
    fixF2(F2);
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(this.props.dataSource);
    chart.tooltip(false);
    chart
      .line()
      .position("date*value")
      .color("type");
    chart.render();
    this.chart = chart;
  };

  getHeight = () => {
    const { dataSource } = this.props;
    return Math.ceil(dataSource.length / 2) * 12 + 320;
  };

  render() {
    console.log("render chart");
    return (
      <View style={{ width: "100vw", height: this.getHeight() + "rpx" }}>
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}
