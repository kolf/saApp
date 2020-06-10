import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import F2 from "@antv/f2";


export default class Index extends Component {
  static defeultProps = {
    saveRef() {}
  };

  drawData = (canvas, width, height) => {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source([], {
      count: {
        tickCount: 0
      }
    });
    chart.legend({
      position: "bottom",
      align: "center",
      marker: {
        symbol: "square",
        radius: 5
      }
    });
    chart
      .interval()
      .position("date*num")
      .color("name", [
        "l(90) 0:#7DE3FF 1:#0056E0",
        "l(90) 0:#FFF686 1:#FF9538",
        "l(90) 0:#A7F592 1:#4ADD4E",
        "l(90) 0:#c09eef 1:#782ae4"
      ])
      .adjust("stack");
    chart
      .line()
      .position("date*count")
      .color("#EC3333");
    this.props.saveRef(chart);
    chart.render();
    return chart;
  };

  render() {
    return (
      <View style="width:100%;height:320px">
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}

