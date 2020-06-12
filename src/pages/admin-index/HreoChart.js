import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";

const data = [
  {
    name: "再购新车占比",
    percent: 21,
    a: "1"
  },
  {
    name: "转介绍占比",
    percent: 34,
    a: "1"
  },
  {
    name: "置换新车占比",
    percent: 45,
    a: "1"
  }
];

const map = {};
data.forEach(function(item) {
  map[item.name] = item.percent + "%";
});

function drawData(canvas, width, height) {
  fixF2(F2);

  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
    padding: [0, 0, 0, 140]
  });

  chart.source(data, {
    percent: {
      formatter: function formatter(val) {
        return val + "%";
      }
    }
  });
  chart.tooltip(false);
  chart.legend({
    position: "left",
    itemFormatter: function itemFormatter(val) {
      return val + "    " + map[val];
    }
  });
  chart.coord("polar", {
    transposed: true,
    innerRadius: 0.8,
    radius: 0.8
  });
  chart.axis(false);
  chart
    .interval()
    .position("a*percent")
    .color("name", ["#F7B579", "#6478D3", "#CDCDD7"])
    .adjust("stack");

  chart.render();
}

export default function HreoChart({ dataSource = [] }) {
  return (
    <View style={{ width: "100%", height: "140px" }}>
      <F2Canvas onCanvasInit={drawData} />
    </View>
  );
}
