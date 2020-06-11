import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2";

function getAllTotal(data) {
  return data.reduce((result, item) => {
    return (result += item.total || 0);
  }, 0);
}

// 根据角度和圆心求坐标
function _getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  };
}
export default class Index extends Component {
  static defeultProps = {
    dataSource: []
  };

  drawData = (canvas, width, height) => {
    fixF2(F2);
    const { dataSource } = this.props;
    const _F = F2;
    const Util = _F.Util;
    const G = _F.G;
    const Vector2 = G.Vector2;
    F2.Shape.registerShape("interval", "pie-with-text", {
      draw: function draw(cfg, container) {
        const points = this.parsePoints(cfg.points);
        const style = Util.mix(
          {
            fill: cfg.color
          },
          cfg.style
        );
        const coord = this._coord;
        if (cfg.isInCircle && coord.transposed) {
          // 只处理极坐标y
          const newPoints = [points[0], points[3], points[2], points[1]];
          const _cfg$center = cfg.center,
            x = _cfg$center.x,
            y = _cfg$center.y;
          const v = [1, 0];
          const v0 = [newPoints[0].x - x, newPoints[0].y - y];
          const v1 = [newPoints[1].x - x, newPoints[1].y - y];
          const v2 = [newPoints[2].x - x, newPoints[2].y - y];
          let startAngle = Vector2.angleTo(v, v1);
          let endAngle = Vector2.angleTo(v, v2);
          const r0 = Vector2.length(v0);
          const r = Vector2.length(v1);
          if (startAngle >= 1.5 * Math.PI) {
            startAngle = startAngle - 2 * Math.PI;
          }
          if (endAngle >= 1.5 * Math.PI) {
            endAngle = endAngle - 2 * Math.PI;
          }
          const middleAngle = (startAngle + endAngle) / 2;
          const numbricCenter = _getEndPoint(
            cfg.center,
            middleAngle,
            (r + r0) / 2
          );
          const sector = container.addShape("Sector", {
            className: "interval",
            attrs: Util.mix(
              {
                x: x,
                y: y,
                r: r,
                r0: r0,
                startAngle: startAngle,
                endAngle: endAngle
              },
              style
            )
          });
          const text = container.addShape("text", {
            attrs: {
              x: numbricCenter.x,
              y: numbricCenter.y,
              textAlign: "center",
              textBaseline: "middle",
              fontSize: 20,
              text:
                cfg.origin._origin.percent == 0
                  ? ""
                  : parseInt(cfg.origin._origin.percent * 100) + "%",
              fill: "#fff",
              fontWeight: "400"
            }
          });
          return [sector, text];
        }
      }
    });
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(dataSource, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + "%";
        }
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
    chart.tooltip(false);
    chart.coord("polar", {
      transposed: true,
      innerRadius: 0.5
    });
    chart.axis(false);
    chart
      .interval()
      .position("a*percent")
      .color("name", [
        "l(0) 0:#FF9F3E 1:#FFCC3E",
        "l(0) 0:#F1774A 1:#FC2B2B",
        "l(0) 0:#34BFFF 1:#6384FF"
      ])
      .adjust("stack")
      .style({
        lineWidth: 1,
        stroke: "#fff",
        lineJoin: "round",
        lineCap: "round"
      })
      .shape("pie-with-text");
    chart.guide().text({
      position: ["50%", "60%"],
      content: this.props.title
    });

    chart.guide().text({
      position: ["50%", "45%"],
      content: getAllTotal(dataSource),
      style: {
        fill: "#333333", // 文本颜色
        fontSize: "29", // 文本大小
        fontWeight: "bold" // 文本粗细
      }
    });
    chart.render();
  };

  render() {
    return (
      <View style={{ width: "100vw", height: "76vw" }}>
        <F2Canvas onCanvasInit={this.drawData} />
      </View>
    );
  }
}
