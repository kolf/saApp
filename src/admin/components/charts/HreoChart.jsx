import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";
import "./HreoChart.scss";

const colors = ["#F7B579", "#6478D3", "#CDCDD7"];
function toPercentage(floatNumber = 0) {
  return parseInt(floatNumber * 100) + "%";
}

function getTotal(data) {
  return data.reduce((result, item) => {
    return result + item.total;
  }, 0);
}

function drawData(data, canvas, width, height) {
  fixF2(F2);
  const chart = new F2.Chart({
    el: canvas,
    width,
    height,
    padding: [0, 0, 0, 0]
  });

  chart.source(data);
  chart.coord("polar", {
    transposed: true,
    innerRadius: 0.5,
    radius: 0.8
  });
  chart.axis(false);
  chart.legend(false);
  chart
    .interval()
    .position("a*percent")
    .color("type", colors)
    .adjust("stack");

  chart.render();
}

export default function HreoChart({ dataSource = [] }) {
  return (
    <View className="hreo-chart__root">
      <View className="hreo-chart__left">
        {dataSource.map((item, index) => (
          <View className="chart__item-container" key={item.type}>
            <View
              className="chart__item-icon"
              style={{ backgroundColor: colors[index] }}
            />
            <View className="chart__item-cont">
              <Text className="chart__item-title">
                {toPercentage(item.percent)}
              </Text>
              <Text>{item.type}</Text>
            </View>
          </View>
        ))}
      </View>
      <View className="hreo-chart__right">
        <View style={{ height: "260rpx" }} className="hreo-chart__canvas">
          <F2Canvas onCanvasInit={drawData.bind(this, dataSource)} />
        </View>
        <View className="hreo-chart__total">昨日总成交 {getTotal(dataSource)} 台</View>
      </View>
    </View>
  );
}
