import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";

const data = [
  {
    type: "1951 年",
    value: 38
  },
  {
    type: "1952 年",
    value: 52
  },
  {
    type: "1956 年",
    value: 61
  },
  {
    type: "1957 年",
    value: 145
  },
  {
    type: "1958 年",
    value: 48
  },
  {
    type: "1959 年",
    value: 38
  },
  {
    type: "1960 年",
    value: 38
  },
  {
    type: "1962 年",
    value: 38
  }
];

export default class Index extends Component {

  drawData = (canvas, width, height) => {
    fixF2(F2);
    const Global = F2.Global;
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(this.props.dataSource, {
      value: {
        tickCount: 5
      }
    });
    chart.coord({
      transposed: true
    });

    chart.axis("type", {
      line: Global._defaultAxis.line,
      grid: null
    });
    // chart.axis("value", {
    //   line: null,
    //   grid: Global._defaultAxis.grid,
    //   label: function label(text, index, length) {
    //     var textCfg = {};
    //     if (index === 0) {
    //       textCfg.textAlign = "left";
    //     } else if (index === length - 1) {
    //       textCfg.textAlign = "right";
    //     }
    //     return textCfg;
    //   }
    // });

    chart.interval().position("type*value");

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

  getHeight = () => {
    const { dataSource } = this.props;
    return Math.ceil(dataSource.length / 10) * 480;
  };

  render() {
    return (
      <View style={{ width: "100vw", height: this.getHeight() + "rpx" }}>
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}
