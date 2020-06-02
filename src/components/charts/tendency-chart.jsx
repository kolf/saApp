import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import F2 from "@antv/f2";

// 根据角度和圆心求坐标
function _getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  };
}
class Index extends Component {
  static defeultProps = {
    saveRef() {}
  };

  drawData = (canvas, width, height) => {
    const _F = F2;
    const Util = _F.Util;
    const G = _F.G;
    const Vector2 = G.Vector2;
    F2.Shape.registerShape("interval", "pie-with-text", {
      draw: function draw(cfg, container) {
        var points = this.parsePoints(cfg.points);
        var style = Util.mix(
          {
            fill: cfg.color
          },
          cfg.style
        );
        var coord = this._coord;
        if (cfg.isInCircle && coord.transposed) {
          // 只处理极坐标y
          var newPoints = [points[0], points[3], points[2], points[1]];
          var _cfg$center = cfg.center,
            x = _cfg$center.x,
            y = _cfg$center.y;
          var v = [1, 0];
          var v0 = [newPoints[0].x - x, newPoints[0].y - y];
          var v1 = [newPoints[1].x - x, newPoints[1].y - y];
          var v2 = [newPoints[2].x - x, newPoints[2].y - y];
          var startAngle = Vector2.angleTo(v, v1);
          var endAngle = Vector2.angleTo(v, v2);
          var r0 = Vector2.length(v0);
          var r = Vector2.length(v1);
          if (startAngle >= 1.5 * Math.PI) {
            startAngle = startAngle - 2 * Math.PI;
          }
          if (endAngle >= 1.5 * Math.PI) {
            endAngle = endAngle - 2 * Math.PI;
          }
          var middleAngle = (startAngle + endAngle) / 2;
          var numbricCenter = _getEndPoint(
            cfg.center,
            middleAngle,
            (r + r0) / 2
          );
          var sector = container.addShape("Sector", {
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
          var text = container.addShape("text", {
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

    chart.source([], {
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
        "l(0) 0:#A7F592 1:#4ADD4E",
        "#F89C63",
        "l(0) 0:#7DE3FF 1:#0056E0"
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
      position: ["50%", "55%"],
      content: this.props.title
    });
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

export default Index;
