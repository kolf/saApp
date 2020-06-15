import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";
export default class Index extends Component {
  static defaultProps = {
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
    const typeList = dataSource.reduce((result, item) => {
      if (!result.find(t => t.type === item.type)) {
        result.push(item);
      }
      return result;
    }, []);

    return Math.ceil(typeList.length / 3) * 24 + 240;
  };

  render() {
    return (
      <View style={{ width: "100%", height: this.getHeight() + "px" }}>
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}
