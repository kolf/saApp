import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtSegmentedControl, AtActivityIndicator } from "../../npm/taro-ui/dist";
import { F2Canvas } from "taro-f2";
import moment from "moment";
import Pager from "../../components/pager";
import { getxsTopTotal, getxsTrend } from "../../servers/apis";
import { toPercentage } from "../../utils";
import F2 from "@antv/f2";
import "./index.scss";

const formatStr = "YYYY-MM-DD";

const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];

export default class Index extends Component {
  config = {
    navigationBarTitleText: "销售部排行榜"
  };

  state = {
    activeKey: 0,
    showType: 0,
    data: {},
    zheData: [],
    zhuData: [],
    isFetching: false,
    endDate: moment()
      .subtract(1, "days")
      .format(formatStr) //默认前一天
  };

  componentDidShow() {
    this.loadData();
  }
  //请求数据
  loadData = () => {
    this.setState({
      isFetching: true
    });
    const { showType, activeKey } = this.state;
    if (showType == 0) {
      this.fetchAction().then(res => {
        console.log("服务部", res.data);
        this.setState({
          isFetching: false,
          data: res.data
        });
      });
    } else {
      this.fetchAction().then(res => {
        this.setState({
          isFetching: false,
          data: res.data
        });
      });
    }
  };
  //发起请求
  fetchAction = () => {
    const { showType } = this.state;
    if (showType === 0) {
      return getxsTopTotal(this.makeParams());
    } else if (showType === 1) {
      return getxsTrend(this.makeParams());
    }
  };
  //接口参数
  makeParams = (newParams = {}) => {
    const { endDate, activeKey, showType } = this.state;
    let startDate = endDate;
    let dateType = null;
    let selectDate = null;
    let parms = {};
    if (activeKey === 1) {
      startDate = moment(endDate)
        .subtract(1, "weeks")
        .format(formatStr);
      dateType = "WEEK";
    } else if (activeKey === 2) {
      startDate = moment(endDate)
        .subtract(1, "months")
        .format(formatStr);
      dateType = "MONTH";
    } else {
      dateType = "DAY";
    }
    if (showType) {
      parms.dateTime = endDate;
      selectDate = endDate;
    } else {
      parms.startDateTime = startDate;
      parms.endDateTime = endDate;
      selectDate = endDate;
    }
    if (showType == 0) {
      return {
        dateType,
        endDate,
        ...newParams
      };
    } else {
      return {
        dateType,
        endDate,
        ...newParams
      };
    }
  };
  //柱状图
  drawDatass = (canvas, width, height) => {
    const { data } = this.state;
    let shuju = data.xsTopReports;
    let arr = [];
    if (shuju) {
      shuju.map(val => {
        arr.push({ action: val.name, value: val.totalCount });
      });
    }
    var Global = F2.Global;
    var datas = arr.sort((a, b) => a.value - b.value);
    var chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(datas, {
      sales: {
        tickCount: 1
      }
    });
    chart.coord({
      transposed: true
    });
    chart.axis("action", {
      line: Global._defaultAxis.line,
      grid: null
    });
    chart.axis("value", {
      line: null,
      grid: Global._defaultAxis.grid,
      label: function label(text, index, total) {
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = "left";
        } else if (index === total - 1) {
          textCfg.textAlign = "right";
        }
        return textCfg;
      }
    });
    chart.interval().position("action*value");
    // 绘制文本
    datas.map(function(obj) {
      chart.guide().text({
        position: [obj.opaction, obj.value],
        content: obj.value,
        style: {
          textAlign: "start"
        },
        offsetX: 10
      });
    });
    chart.render();
  };
  //折线图
  drawData = (canvas, width, height) => {
    const { data } = this.state;
    let shuju = data.xsTrendList;

    let arr = [];
    if (shuju) {
      shuju.map(val => {
        val.list.map(item => {
          arr.push({
            country: item.name,
            year: val.dateStr,
            value: item.count
          });
        });
        return arr;
      });
    }
    var datas = arr;
    var chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(datas, {
      year: {
        range: [0, 1]
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      custom: true,
      onChange: function onChange(obj) {
        var legend = chart.get("legendController").legends.top[0];
        var tooltipItems = obj.items;
        var legendItems = legend.items;
        var map = {};
        legendItems.map(function(item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.map(function(item) {
          var name = item.name;
          var value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        var legend = chart.get("legendController").legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart
      .line()
      .position("year*value")
      .color("country")
      .size(2)
      .adjust("stack");
    chart
      .point()
      .position("year*value")
      .color("country")
      .adjust("stack");
    chart.render();
  };
  //柱状图标下方的表格数据
  makeTendencyTableData = data => {
    let newArr = JSON.parse(JSON.stringify(data));
    let sdata = newArr.xsTopReports;
    if (sdata) {
      sdata.unshift(newArr.total);
      sdata.push(newArr.avg);
      // this.setState({
      //   zhuData:sdata
      // })
      // console.log('5555',sdata)
      return Object.values(sdata).map(item => ({
        name: item.name, //顾问
        gxcCount: item.gxcCount, //二手车评估
        zhxcCount: item.zhxcCount, //再购新车
        zjsCount: item.zjsCount, //再购新车
        totalCount: item.totalCount //转介绍//推荐总量
      }));
    }
  };
  //折线图下方表格数据
  makeStatisticalTableData = data => {
    // console.log('销售部折线',data)
    let result = data.xsTrendList;
    let newArr = [];
    if (result) {
      this.setState({
        zheData: result[0].list
      });
      result.map(item => {
        let oldData = {};
        let orderDate = item.dateStr;
        item.list.map(val => {
          oldData.dateStr = orderDate;
          oldData[val.userId] = val.count;
        });
        newArr.push(oldData);
      });
      return newArr;
    }
    return Object.values(newArr).map(item => ({
      dateStr: item.dateStr,
      total: item.count
    }));
  };
  //时间切换数据变化
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
  //切换趋势和总排行
  handleTabClick = e => {
    this.setState(
      {
        activeKey: e,
        endDate: moment()
          .subtract(1, "days")
          .format(formatStr)
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
  //切换年月日数据变化
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
    const { showType, data, isFetching, zheData } = this.state;
    if (isFetching) {
      return <AtActivityIndicator mode="center" content="加载中..." />;
    }
    if (showType === 0) {
      return (
        <View className="report__main">
          <View style="width:100%;height:320px">
            <F2Canvas onCanvasInit={this.drawDatass} />
          </View>
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-2">顾问</View>
              <View className="at-col at-col-3">再购新车</View>
              <View className="at-col at-col-2">置换新车</View>
              <View className="at-col at-col-2">转介绍</View>
              <View className="at-col at-col-3">完成总台数</View>
            </View>
            <View className="table-body">
              {data &&
                this.makeTendencyTableData(data).map(item => (
                  <View className="at-row at-list__item" key={item.name}>
                    <View className="at-col at-col-2">{item.name}</View>
                    <View className="at-col at-col-3">{item.gxcCount}</View>
                    <View className="at-col at-col-2">{item.zhxcCount}</View>
                    <View className="at-col at-col-2">{item.zjsCount}</View>
                    <View className="at-col at-col-3">{item.totalCount}</View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      );
    } else if (showType === 1) {
      return (
        <View className="report__main">
          <View style="width:100%;height:320px">
            <F2Canvas onCanvasInit={this.drawData} />
          </View>
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-3">日期</View>
              {this.state.zheData.map(item => (
                <View className="at-col at-col-3">{item.name}</View>
              ))}
            </View>
            <View className="table-body">
              {this.makeStatisticalTableData(data).map(item => (
                <View className="at-row at-list__item" key={item.dateStr}>
                  <View className="at-col at-col-3">{item.dateStr}</View>
                  {zheData.map(val => (
                    <View className="at-col at-col-3">
                      {item[val.userId] || 0}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    const { activeKey, showType } = this.state;
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
            values={["销售完成台数", "销售完成台数趋势"]}
          />
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
