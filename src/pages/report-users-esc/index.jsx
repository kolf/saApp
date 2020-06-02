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
    navigationBarTitleText: "二手车顾问"
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
      title: `二手车顾问(${title})`
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
      const { WCNum } = data;
      this.tendencyRef.guide().text({
        position: ["50%", "45%"],
        content: WCNum.total,
        style: {
          fill: "#333333", // 文本颜色
          fontSize: "29", // 文本大小
          fontWeight: "bold" // 文本粗细
        }
      });
      delete data.DateTime;
      delete data.CSNum;
      delete data.TPNum;
      //    delete  data.WCNum
      for (let d in data) {
        data[d].transactionRate = data[d].proportion;
      }
      console.log(data + "21212121212121212121222");
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
            let num10;
            if (v === "ZHTotal") {
              name = "推荐置换台数";
              date = obj.date;
              num = obj[v];
              num10 = obj[v];
            } else if (v === "PGTotal") {
              name = "评估台数";
              date = obj.date;
              num = obj[v];
              num10 = obj[v];
            }
            rebuildData.push({
              name,
              date,
              num,
              num10
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
    const total = data ? data.WCNum.total : 0;
    if (total == 0) {
      return [
        {
          name: "评估占比",
          percent: 0.5,
          a: "1"
        },
        {
          name: "推荐置换占比",
          percent: 0.5,
          a: "1"
        }
      ];
    }
    delete data.Total;
    delete data.DateTime;
    delete data.CSNum;
    delete data.ToNum;
    delete data.WCNum;

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
            title="完成台数"
          />
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-6">业务项</View>

              <View className="at-col at-col-6">总台数</View>
            </View>
            <View className="table-body">
              <View className="at-row at-list__item">
                <View className="at-col at-col-6">接单台数</View>

                <View className="at-col at-col-6">{data.Total.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-6">完成台数</View>

                <View className="at-col at-col-6">{data.WCNum.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-6">超时台数</View>

                <View className="at-col at-col-6">{data.CSNum.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-6">仅评估台数</View>

                <View className="at-col at-col-6">{data.PGNum.total}</View>
              </View>
              <View className="at-row at-list__item">
                <View className="at-col at-col-6">推荐置换台数</View>
                <View className="at-col at-col-6">{data.ZHNum.total}</View>
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
              <View className="at-col at-col-3">评估台数</View>
              <View className="at-col at-col-3">推荐置换台数</View>

              <View className="at-col at-col-3">完成台数</View>
            </View>
            <View className="table-body">
              {data.map(d => (
                <View className="at-row at-list__item">
                  <View className="at-col at-col-3">{d.date}</View>
                  <View className="at-col at-col-3">{d.PGTotal}</View>
                  <View className="at-col at-col-3">{d.ZHTotal}</View>

                  <View className="at-col at-col-3">{d.Total}</View>
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
            values={["完成报表", "完成趋势"]}
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
