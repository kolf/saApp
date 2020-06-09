import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { AtTabs, AtSegmentedControl, AtActivityIndicator } from "../../npm/taro-ui/dist";
import TendencyChart from "../../components/charts/tendency-chart";
import StatisticalChart from "../../components/charts/statistical-chart";
import Pager from "../../components/pager";
import moment from "moment";
import { getAdvisoryReportYesterday, getAdvisoryReportLast7Days } from "../../servers/apis";
import "./index.scss";

const formatStr = "YYYY-MM-DD";

const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];
export default class Index extends Component {
  config = {
    navigationBarTitleText: "销售顾问"
  };

  state = {
    activeKey: 0,
    showType: 0,
    listData: [],
    isFetching: false,
    endDate: moment()
      .subtract(1, "days")
      .format(formatStr) //默认前一天
  };

  tendencyRef = null;

  componentWillMount() {
    const { title } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: `销售顾问(${title})`
    });
  }

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      isFetching: true
    });
    const { showType, activeKey } = this.state;
    //饼状图
    if (showType == 0) {
      getAdvisoryReportYesterday(this.makeParams()).then(res => {
        this.setState({
          isFetching: false,
          data: res.data
        });
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.drawData();
        }, 300);
      });
    } else {
      getAdvisoryReportLast7Days(this.makeParams(), tabList[activeKey].value).then(res => {
        this.setState({
          isFetching: false,
          data: res.data
        });
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.drawData();
        }, 300);
      });

    }


  };

  drawData = () => {
    if (this.state.showType === 0) {
      const { data, showType } = this.state;
      const { CJProportionPie } = data;
      this.tendencyRef.guide().text({
        position: ['50%', '45%'],
        content: CJProportionPie.total,
        style: {
          fill: '#333333', // 文本颜色
          fontSize: '29', // 文本大小
          fontWeight: 'bold' // 文本粗细
        }
      });
      delete data.DateTime;
     /* for (let d in data) {
        data[d].transactionRate = data[d].proportion;
      }*/

      this.tendencyRef.changeData(this.makeData(data));
    } else if (this.state.showType === 1) {
      let { data } = this.state;
      let rebuildData = [];
      data.map((obj, i) => {
        for (let v in obj) {
          if (v !== 'date' && v !== 'Total') {
            let name;
            let date;
            let num;
            if (v === 'ACTotal') {
              name = 'A卡台数';
              date = obj.date;
              num = obj[v]-obj['CJTotal'];
            } else if (v === 'CJTotal') {
              name = '完成台数';
              date = obj.date;
              num = obj[v];
            }

            rebuildData.push({
              name,
              date,
              num,
            });
          }
        }
      });
      data = rebuildData;
      const _this = this;
      var map = {},
        dest = [];
      for (var i = 0; i < data.length; i++) {
        var ai = data[i];
        if (!map[ai.date]) {
          dest.push({
            date: ai.date,
            name: ai.name,
            data: [ai]
          });
          map[ai.date] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.date == ai.date) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      dest.map((d, i) => {
        let count = 0;
        d.data.map((n, m) => {
          count += n.num;
        });
        d.count = count;
      });
      let newData = [];
      dest.map(function (obj, i) {
        obj.data.map((o, i) => {
          o.count = obj.count;
          newData.push(o);
          if (i === 0) {
            _this.statisticalRef.guide().text({
              position: [obj.date, obj.count],
              content: obj.count,
              style: {
                textAlign: 'center',
                textBaseline: 'bottom'
              },
              offsetY: -4
            });
          }
        });
      });

      this.statisticalRef.changeData(newData);
    }
  };

  makeTableData = data => {
    return Object.values(data).map(item => ({
      name: item.orderTypeName,
      total: item.orderTotal,
      dealTotal: item.orderDealTotal,
      scale:
        (item.orderTotal === 0
          ? ''           : parseInt((item.orderDealTotal / item.orderTotal) * 100)) + "%"
    }));
  };

  makeParams = (newParams = {}) => {
    let { id } = this.$router.params;
    const { endDate, activeKey, showType } = this.state;
    let startDate = endDate;
    let parms = {};
    if (activeKey === 1) {
      startDate = moment(endDate)
        .subtract(1, "weeks")
        .format(formatStr);
    } else if (activeKey === 2) {
      startDate = moment(endDate)
        .subtract(1, "months")
        .format(formatStr);
    }
    if (showType) {
      parms.dateTime = endDate;
    } else {
      parms.startDateTime = startDate;
      parms.endDateTime = endDate;
    }
    return {
      uId: id,
      ...parms,
      ...newParams
    };
  };

  drawStatisticalRefRadar(canvas, width, height) {

    var chart = new F2.Chart({
      el: canvas,
      width,
      height,
    });
    chart.source([], {
      'num': {
        tickCount: 10
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        var legend = chart.get('legendController').legends.top[0];
        var tooltipItems = obj.items;
        var legendItems = legend.items;
        var map = {};
        legendItems.map(function (item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.map(function (item) {
          var name = item.name;
          var value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        var legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.legend({
      position: "bottom",
      align: 'center',
      marker: {
        symbol: 'square',
        radius: 5,
      },
    });
    chart.interval().position('date*num').color('name', [
      "l(90) 0:#7DE3FF 1:#0056E0",
      "l(90) 0:#FFF686 1:#FF9538",
      "l(90) 0:#A7F592 1:#4ADD4E",
    ]).adjust('stack');
    chart.line().position('date*num').color('#EC3333');
    this.statisticalRef = chart;
    // 柱状图添加文本

    chart.render();
    return chart;
  }

  drawRadar(canvas, width, height) {
    const _F = F2;
    const Util = _F.Util;
    const G = _F.G;
    const Vector2 = G.Vector2;
    F2.Shape.registerShape('interval', 'pie-with-text', {
      draw: function draw(cfg, container) {
        var points = this.parsePoints(cfg.points);
        var style = Util.mix({
          fill: cfg.color
        }, cfg.style);
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
          var numbricCenter = _getEndPoint(cfg.center, middleAngle, (r + r0) / 2);
          var sector = container.addShape('Sector', {
            className: 'interval',
            attrs: Util.mix({
              x: x,
              y: y,
              r: r,
              r0: r0,
              startAngle: startAngle,
              endAngle: endAngle
            }, style)
          });
          var text = container.addShape('text', {
            attrs: {
              x: numbricCenter.x,
              y: numbricCenter.y,
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: 12,
              text: cfg.origin._origin.percent * 100 + '%',
              fill: '#fff',
              fontWeight: '400'
            }
          });
          return [sector, text];
        }
      }
    });

    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
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
      align: 'center',
      marker: {
        symbol: 'square',
        radius: 5,
      },
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
        "l(0) 0:#7DE3FF 1:#0056E0",
      ])
      .adjust("stack")
      .style({
        lineWidth: 1,
        stroke: "#fff",
        lineJoin: "round",
        lineCap: "round"
      }).shape('pie-with-text');
    // 饼图内部文字
    chart.guide().text({
      position: ['50%', '58%'],
      content: '总成交台数'
    });


    this.tendencyRef = chart;
    chart.render();
    return chart;

  }
  handleTabClick = e => {
    this.setState({
      activeKey: e,
      endDate: moment()
        .subtract(1, "days")
        .format(formatStr)
    },
      this.loadData
    );
  };

  makeData = data => {
    const total =  data ? data.CJProportionPie.total : 0;
    if (total === 0) {
      return [
        {
          name: "再购新车",
          percent: 0.33,
          a: "1"
        },
        {
          name: "置换新车",
          percent: 0.33,
          a: "1"
        },
        {
          name: "转介绍",
          percent: 0.34,
          a: "1"
        }
      ];
    }
    delete data.TOTAL;
    delete data.DateTime;
  let array=[]
  for(var name in data.CJProportionPie){


    if(name=='ZGXCTotal'){
      let obj={}
      obj['name']='再购新车'
      obj['percent']=data.CJProportionPie.ZGXCTotal/ 100
      array.push(obj)
    }
    if(name=='ZHXCTotal'){
      let obj={}
      obj['name']='置换新车'
      obj['percent']=data.CJProportionPie.ZHXCTotal/ 100
      array.push(obj)
    }
    if(name=='ZJSTotal'){
      let obj={}
      obj['name']='转介绍'
      obj['percent']=data.CJProportionPie.ZJSTotal/ 100
      array.push(obj)
    }

  }
  console.log(array)
  return array
    /*return Object.values(data.CJProportionPie)
      .map(item => ({
        name: item.orderTypeName,
        percent: item.transactionRate / 100,
        a: "1"
      }));*/
  };


  handleDateChange = n => {
    const { endDate, activeKey } = this.state;
    const unit = tabList[activeKey].value;

    let nextEndDate = null;
    if (n === -1) {
      nextEndDate = moment(endDate)
        .subtract(1, unit)
        .format(formatStr);
    } else if (n === 1) {
      nextEndDate = moment(endDate)
        .add(1, unit)
        .format(formatStr);
    }
    this.setState(
      {
        endDate: nextEndDate
      },
      this.loadData
    );
  };

  handleDateTypeChange = e => {
    this.setState(
      {
        showType: e,
        endDate: moment()
          .subtract(1, "days")
          .format(formatStr)
      },
      this.loadData
    );
  };

  getPagerTitle = () => {
    const { endDate, activeKey } = this.state;
    const unit = tabList[activeKey].value;
    let endDateStr = moment(endDate).format("YYYY年MM月D日");
    let startDateStr = moment(endDate).format("YYYY年MM月D日");

    if (activeKey === 1) {
      startDateStr = moment(endDate)
        .subtract(1, unit)
        .format("YYYY年MM月D日");
    } else if (activeKey === 2) {
      startDateStr = moment(endDate)
        .subtract(1, unit)
        .format("YYYY年MM月D日");
    }

    if (startDateStr === endDateStr) {
      return startDateStr;
    } else {
      return `${startDateStr}-${endDateStr}`;
    }
  };

  renderMain = () => {
    const { showType, data, isFetching } = this.state;
    if (isFetching) {
      return <AtActivityIndicator mode="center" content="加载中..." />;
    }
    if (showType === 0) {
      return (
        <View className="report__main">
          <TendencyChart
            saveRef={r => (this.tendencyRef = r)}
            title="总成交台数"
          />
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-2">业务项</View>
              <View className="at-col at-col-3">再购新车</View>
              <View className="at-col at-col-3">置换新车</View>
    <View className="at-col at-col-2">转介绍</View>
    <View className="at-col at-col-2">总台数</View>
            </View>
            <View className="table-body">
              <View className="at-row at-list__item">
                <View className="at-col at-col-2">接单台数 </View>
  <View className="at-col at-col-3">{data.Total.ZGXCTotal}</View>
<View className="at-col at-col-3">{data.Total.ZHXCTotal}</View>
<View className="at-col at-col-2">{data.Total.ZJSTotal}</View>
<View className="at-col at-col-2">{data.Total.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-2">A卡台数</View>
                <View className="at-col at-col-3">{data.ACNum.ZGXCTotal}</View>
                <View className="at-col at-col-3">{data.ACNum.ZHXCTotal}</View>
<View className="at-col at-col-2">{data.ACNum.ZJSTotal}</View>
<View className="at-col at-col-2">{data.ACNum.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-2">成交台数</View>
                <View className="at-col at-col-3">{data.CJNum.ZGXCTotal}</View>
                <View className="at-col at-col-3">{data.CJNum.ZHXCTotal}</View>
<View className="at-col at-col-2">{data.CJNum.ZJSTotal}</View>
<View className="at-col at-col-2">{data.CJNum.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-2">成交率</View>
  <View className="at-col at-col-3">{data.CJProportion.ZGXCTotal}%</View>
<View className="at-col at-col-3">{data.CJProportion.ZHXCTotal}%</View>
<View className="at-col at-col-2">{data.CJProportion.ZJSTotal}%</View>
<View className="at-col at-col-2">{data.CJProportion.total}%</View>
              </View>
<View className="at-row at-list__item">
  <View className="at-col at-col-2">超时台数</View>
  <View className="at-col at-col-3">{data.CSNum.ZGXCTotal}</View>
<View className="at-col at-col-3">{data.CSNum.ZHXCTotal}</View>
<View className="at-col at-col-2">{data.CSNum.ZJSTotal}</View>
<View className="at-col at-col-2">{data.CSNum.total}</View>
</View>
<View className="at-row at-list__item">
  <View className="at-col at-col-2">超时率</View>
  <View className="at-col at-col-3">{data.CSProportion.ZGXCTotal}%</View>
<View className="at-col at-col-3">{data.CSProportion.ZHXCTotal}%</View>
<View className="at-col at-col-2">{data.CSProportion.ZJSTotal}%</View>
<View className="at-col at-col-2">{data.CSProportion.total}%</View>
</View>
            </View>
          </View>
        </View>
      );
    } else if (showType === 1) {
      return (
        <View className="report__main">
          <StatisticalChart saveRef={r => (this.statisticalRef = r)} />
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-4">日期</View>
              <View className="at-col at-col-4">A卡台数</View>


              <View className="at-col at-col-4">成交台数</View>
            </View>
            <View className="table-body" >
              {
                data.map( d => (
                  <View className="at-row at-list__item">
                    <View className="at-col at-col-4">{d.date}</View>
                    <View className="at-col at-col-4">{d.ACTotal}</View>
                    <View className="at-col at-col-4">{d.CJTotal}</View>


                  </View>
                ))
              }
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    const { activeKey, endDate, showType } = this.state;
    return (
      <View className="page report__root">
        <AtTabs
          current={activeKey}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.handleDateTypeChange}
            values={["成交统计", "成交统计趋势"]} />
        </View>
        <View className="border-bottom report__pager">
          <Pager
            title={this.getPagerTitle()}
            onNext={this.handleDateChange.bind(this, +1)}
            onPrev={this.handleDateChange.bind(this, -1)}
          />
        </View>

        {this.renderMain()}
      </View>
    );
  }
}
