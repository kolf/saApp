import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { F2Canvas } from "taro-f2";
import { AtTabs, AtSegmentedControl, AtActivityIndicator } from "taro-ui";
import TendencyChart from "../../components/charts/tendency-chart";
import StatisticalChart from "../../components/charts/statistical-chart";
import Pager from "../../components/pager";
import moment from "moment";
import {
  getAdvisoryReportYesterday,
  getAdvisoryReportLast7Days
} from "../../servers/apis";
import "./index.scss";

const formatStr = "YYYY-MM-DD";

const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];
export default class Index extends Component {
  config = {
    navigationBarTitleText: "服务顾问"
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
      title: `服务顾问(${title})`
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
      getAdvisoryReportLast7Days(
        this.makeParams(),
        tabList[activeKey].value
      ).then(res => {
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
      const { TOTAL } = data;
      this.tendencyRef.guide().text({
        position: ["50%", "45%"],
        content: TOTAL.orderTypeTotal,
        style: {
          fill: "#333333", // 文本颜色
          fontSize: "29", // 文本大小
          fontWeight: "bold" // 文本粗细
        }
      });
      delete data.DateTime;
      //delete data.TOTAL;
      for (let d in data) {
        data[d].transactionRate = data[d].proportion;
      }

      this.tendencyRef.changeData(this.makeData(data));
    } else if (this.state.showType === 1) {
      let { data } = this.state;
      let rebuildData = [];
      data.map((obj, i) => {
        for (let v in obj) {
          if (v !== "date" && v !== "Total") {
            let name;
            let date;
            let num;
            if (v === "ESCTotal") {
              name = "二手车评估";
            } else if (v === "ZGXCTotal") {
              name = "再购新车";
            } else if (v === "ZJSTotal") {
              name = "转介绍";
            }
            date = obj.date;
            num = obj[v];
            rebuildData.push({
              name,
              date,
              num
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
      dest.map(function(obj, i) {
        obj.data.map((o, i) => {
          o.count = obj.count;
          newData.push(o);
          if (i === 0) {
            _this.statisticalRef.guide().text({
              position: [obj.date, obj.count],
              content: obj.count,
              style: {
                textAlign: "center",
                textBaseline: "bottom"
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
          ? ""
          : parseInt((item.orderDealTotal / item.orderTotal) * 100)) + "%"
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

  makeData = data => {
    const total = data ? data.TOTAL.orderTypeTotal : 0;
    if (total === 0) {
      return [
        {
          name: "二手车评估",
          percent: 0.33,
          a: "1"
        },
        {
          name: "再购新车",
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

    return Object.values(data).map(item => ({
      name: item.orderTypeName,
      percent: item.transactionRate / 100,
      a: "1"
    }));
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
            title="总推荐台数"
          />
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-4">业务项</View>
              <View className="at-col at-col-4">推荐客户量</View>
              <View className="at-col at-col-4">业务占比</View>
            </View>
            <View className="table-body">
              <View className="at-row at-list__item">
                <View className="at-col at-col-4">总计推荐</View>
                <View className="at-col at-col-4">
                  {data.TOTAL.orderTypeTotal}
                </View>
                <View className="at-col at-col-4">---</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-4">二手车评估</View>
                <View className="at-col at-col-4">
                  {data.ESCPG.orderTypeTotal}
                </View>
                <View className="at-col at-col-4">
                  {data.ESCPG.proportion}%
                </View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-4">再购新车</View>
                <View className="at-col at-col-4">
                  {data.ZGXC.orderTypeTotal}
                </View>
                <View className="at-col at-col-4">{data.ZGXC.proportion}%</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-4">转介绍</View>
                <View className="at-col at-col-4">
                  {data.ZJS.orderTypeTotal}
                </View>
                <View className="at-col at-col-4">{data.ZJS.proportion}%</View>
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
              <View className="at-col at-col-3">日期</View>
              <View className="at-col at-col-3 at-col--wrap">二手车评估</View>
              <View className="at-col at-col-2">再购新车</View>
              <View className="at-col at-col-2">转介绍</View>
              <View className="at-col at-col-2">推荐总量</View>
            </View>
            <View className="table-body">
              {data.map(d => (
                <View className="at-row at-list__item">
                  <View className="at-col at-col-3">{d.date}</View>
                  <View className="at-col at-col-3">{d.ESCTotal}</View>
                  <View className="at-col at-col-2">{d.ZGXCTotal}</View>
                  <View className="at-col at-col-2">{d.ZJSTotal}</View>
                  <View className="at-col at-col-2">{d.Total}</View>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }
  };

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
            values={["推荐客户报表", "推荐客户趋势"]}
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
