import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "@/npm/taro-ui/dist";
import Tabs from "@/components/tabs";
import Pager from "../../components/pager";
import BasicChart from "../../components/charts/BasicChart";
import LineChart from "../../components/charts/LineChart";

import moment from "moment";
import { getsaStatistics, getsaTopTotal } from "@/servers/apis";
import { toPercentage } from "@/utils";
import "./index.scss";
const format = "YYYY-MM-DD";

const tabList = [
  { label: `日`, value: "days", paramValue: "DAY" },
  { label: `周`, value: "weeks", paramValue: "WEEK" },
  { label: `月`, value: "months", paramValue: "MONTH" }
];

const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(format);

export default class Index extends Component {
  config = {
    navigationBarTitleText: "服务部排行榜"
  };

  state = {
    dateType: 0,
    showType: 0,
    data: null,
    isFetching: true,
    selectedDate: DEFAULT_DATE //默认前一天
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { showType } = this.state;

    this.setState({
      isFetching: true
    });

    let res = null;
    if (showType === 0) {
      res = await getsaTopTotal(this.makeParams());
    } else if (showType === 1) {
      res = await getsaStatistics(this.makeParams());
    }

    this.setState({
      isFetching: false,
      data: res.data
    });
  };
  //接口参数
  makeParams = () => {
    const { selectedDate, dateType } = this.state;
    return {
      dateType: tabList[dateType].paramValue,
      selectDate: selectedDate
    };
  };
  //柱状图
  drawDatass = (canvas, width, height) => {
    const { data } = this.state;
    let shuju = data.escTopReports;
    let arr = [];
    if (shuju) {
      // console.log('判断予以',shuju)
      shuju.map(val => {
        arr.push({ action: val.realName, value: val.total });
      });
      // console.log('666666',arr)
    }
    // console.log('333333',arr)
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
    let shuju = data.resultList;
    console.log("sss", shuju);
    let arr = [];
    if (shuju) {
      shuju.map(val => {
        val.dataList.map(item => {
          arr.push({
            country: item.realName,
            year: val.orderDate,
            value: item.total
          });
        });
        return arr;
      });
    }
    console.log("nidenidendie", arr);
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
    let sdata = newArr.escTopReports;
    if (sdata) {
      sdata.unshift(newArr.total);
      sdata.push(newArr.avg);
      // this.setState({
      //   zhuData:sdata
      // })
      // console.log('5555',sdata)
      return Object.values(sdata).map(item => ({
        name: item.realName, //顾问
        escpgCount: item.escpgCount, //二手车评估
        zgxcCount: item.zgxcCount, //再购新车
        zjsCount: item.zjsCount, //再购新车
        total: item.total //转介绍//推荐总量
      }));
    }
  };
  //折线图下方表格数据
  makeStatisticalTableData = data => {
    // console.log('服务部折线',data)
    let result = data.resultList;
    let newArr = [];
    if (result) {
      this.setState({
        zheData: result[0].dataList
      });
      result.map(item => {
        let oldData = {};
        let orderDate = item.orderDate;
        item.dataList.map(val => {
          oldData.orderDate = orderDate;
          oldData[val.escUserId] = val.count;
        });
        newArr.push(oldData);
      });
      // console.log('55555555555555555555555555555555',newArr)
      return newArr;
    }
    return Object.values(newArr).map(item => ({
      name: item.name,
      escpgTotal: item.escpgTotal,
      escpgTotal: item.esczhTotal,
      total: item.total
    }));
  };

  makeBasicData = data => {
    const list = data.escTopReports || [];
    return list
      .reduce((result, item) => {
        return [
          ...result,
          {
            type: item.realName,
            value: item.total * 1
          }
        ];
      }, [])
      .sort((a, b) => a.value - b.value);
  };

  makeLineData = data => {
    const list = data.resultList || [];
    return list.reduce((result, item) => {
      return [
        ...result,
        ...item.dataList.map(c => ({
          date: item.orderDate,
          type: c.realName,
          value: c.total * 1
        }))
      ];
    }, []);
  };

  handleDateChange = n => {
    const { selectedDate } = this.state;

    let nextSelectedDate = null;
    if (n === -1) {
      nextSelectedDate = moment(selectedDate)
        .subtract(1, "days")
        .format(format);
    } else if (n === 1) {
      nextSelectedDate = moment(selectedDate)
        .add(1, "days")
        .format(format);
    }
    this.setState(
      {
        selectedDate: nextSelectedDate,
        data: null
      },
      this.loadData
    );
  };
  //切换趋势和总排行
  handleTabClick = dateType => {
    this.setState(
      {
        dateType,
        data: null,
        selectedDate: DEFAULT_DATE
      },
      this.loadData
    );
  };

  onSegmentedControl = showType => {
    this.setState(
      {
        showType,
        data: null,
        selectedDate: DEFAULT_DATE
      },
      this.loadData
    );
  };

  getPagerTitle = () => {
    const { selectedDate, dateType } = this.state;
    let endDateStr = moment(selectedDate).format("YYYY年MM月D日");
    let startDateStr = moment(selectedDate)
      .subtract(1, tabList[dateType].value)
      .format("YYYY年MM月D日");

    if (startDateStr === endDateStr) {
      return startDateStr;
    } else {
      return `${startDateStr}-${endDateStr}`;
    }
  };

  renderMain = () => {
    const { showType, data, isFetching } = this.state;
    if (isFetching) {
      return <AtActivityIndicator size={64} mode="center" content='加载中...' />;
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
              <View className="at-col at-col-3">二手车评估</View>
              <View className="at-col at-col-2">再购新车</View>
              <View className="at-col at-col-2">转介绍</View>
              <View className="at-col at-col-3">推荐总量</View>
            </View>
            <View className="table-body">
              {data &&
                this.makeTendencyTableData(data).map(item => (
                  <View className="at-row at-list__item" key={item.name}>
                    <View className="at-col at-col-2">{item.name}</View>
                    <View className="at-col at-col-3">{item.escpgCount}</View>
                    <View className="at-col at-col-2">{item.zgxcCount}</View>
                    <View className="at-col at-col-2">{item.zjsCount}</View>
                    <View className="at-col at-col-3">{item.total}</View>
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
                <View className="at-col at-col-3">{item.realName}</View>
              ))}
            </View>
            <View className="table-body">
              {this.makeStatisticalTableData(data).map(item => (
                <View className="at-row at-list__item" key={item.orderDate}>
                  <View className="at-col at-col-3">{item.orderDate}</View>

                  {this.state.zheData.map(val => (
                    <View className="at-col at-col-3">
                      {item[val.escUserId] || 0}
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
    const { dateType, showType, data, isFetching } = this.state;

    return (
      <View className="page report__root">
        <Tabs
          current={dateType}
          options={tabList}
          onChange={this.handleTabClick.bind(this)}

        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.onSegmentedControl}
            values={["服务推荐客户", "服务推荐客户趋势"]}
          />
        </View>
        <View className="border-bottom report__pager">
          <Pager
            title={this.getPagerTitle()}
            onNext={this.handleDateChange.bind(this, +1)}
            onPrev={this.handleDateChange.bind(this, -1)}
          />
        </View>

        {isFetching && (
          <AtActivityIndicator size={64} mode="center" content="加载中..." />
        )}
        {data && showType === 0 && (
          <View className="report__main">
            <BasicChart dataSource={this.makeBasicData(data)} />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-2">顾问</View>
                <View className="at-col at-col-3">二手车评估</View>
                <View className="at-col at-col-2">再购新车</View>
                <View className="at-col at-col-2">转介绍</View>
                <View className="at-col at-col-3">推荐总量</View>
              </View>
              <View className="table-body">
                {this.makeTendencyTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.name}>
                    <View className="at-col at-col-2">{item.name}</View>
                    <View className="at-col at-col-3">{item.escpgCount}</View>
                    <View className="at-col at-col-2">{item.zgxcCount}</View>
                    <View className="at-col at-col-2">{item.zjsCount}</View>
                    <View className="at-col at-col-3">{item.total}</View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {data && showType === 1 && (
          <View className="report__main">
            <LineChart dataSource={this.makeLineData(data)} />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">日期</View>
                {[].map(item => (
                  <View className="at-col at-col-3">{item.realName}</View>
                ))}
              </View>
              <View className="table-body">
                {this.makeStatisticalTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.orderDate}>
                    <View className="at-col at-col-3">{item.orderDate}</View>
                    {[].map(val => (
                      <View className="at-col at-col-3">
                        {item[val.escUserId] || 0}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
