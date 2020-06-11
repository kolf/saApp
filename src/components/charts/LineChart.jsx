import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import F2 from "@antv/f2";

export default class Index extends Component {
  static defeultProps = {
    dataSource: []
  };

  drawData = (canvas, width, height) => {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(this.props.dataSource, {
      date: {
        tickCount: 7,
        range: [0, 1]
      },
      value: {
        tickCount: 5
      }
    });
    // chart.axis("date", {
    //   labelOffset: 20,
    //   tickLine: {
    //     length: 4,
    //     stroke: "#e8e8e8",
    //     lineWidth: 1
    //   },
    //   type: {
    //     textAlign: "center",
    //     textBaseline: "middle",
    //     rotate: 75
    //   }
    // });
    chart
      .line()
      .position("date*value")
      .color("type")
      .shape("smooth");
    chart.render();
  };

  render() {
    return (
      <View style={{ width: "100vw", height: "320px" }}>
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}
