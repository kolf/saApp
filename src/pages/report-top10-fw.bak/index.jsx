import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtSegmentedControl, AtActivityIndicator } from "../../npm/taro-ui/dist";
import { F2Canvas } from "taro-f2";
import moment from "moment";
import Pager from "../../components/pager";
import { getsaStatistics, getsaTopTotal } from "../../servers/apis";
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
    navigationBarTitleText: "服务部排行榜"
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
        console.log("服务部", res);
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
      return getsaTopTotal(this.makeParams());
    } else if (showType === 1) {
      return getsaStatistics(this.makeParams());
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
        selectDate,
        ...newParams
      };
    } else {
      return {
        dateType,
        selectDate,
        ...newParams
      };
    }
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
    const { showType, data, isFetching } = this.state;
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

        {this.renderMain()}
      </View>
    );
  }
}
