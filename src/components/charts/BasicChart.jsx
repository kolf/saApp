import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import F2 from "@antv/f2";

const data = [
  {
    name: "1951 年",
    value: 38
  },
  {
    name: "1952 年",
    value: 52
  },
  {
    name: "1956 年",
    value: 61
  },
  {
    name: "1957 年",
    value: 145
  },
  {
    name: "1958 年",
    value: 48
  },
  {
    name: "1959 年",
    value: 38
  },
  {
    name: "1960 年",
    value: 38
  },
  {
    name: "1962 年",
    value: 38
  }
];

export default class Index extends Component {
  static defeultProps = {
    dataSource: []
  };

  drawData = (canvas, width, height) => {
    const Global = F2.Global;
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      value: {
        tickCount: 5
      }
    });
    chart.coord({
      transposed: true
    });

    chart.axis("name", {
      line: Global._defaultAxis.line,
      grid: null
    });
    chart.axis("value", {
      line: null,
      grid: Global._defaultAxis.grid,
      label: function label(text, index, length) {
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = "left";
        } else if (index === length - 1) {
          textCfg.textAlign = "right";
        }
        return textCfg;
      }
    });

    chart.interval().position("name*value");

    // 绘制柱状图文本
    data.map(function(item, index) {
      chart.guide().text({
        position: [index, item.value],
        content: item.value,
        style: {
          textAlign: "start"
        },
        offsetX: 6
      });
    });

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
