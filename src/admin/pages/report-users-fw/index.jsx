import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "@/npm/taro-ui/dist";

import Pager from "../../components/pager";
import TendencyChart from "../../components/charts/TendencyChart";
import StatisticalChart from "../../components/charts/StatisticalChart";
import moment from "moment";
import {
  getAdvisoryReportYesterday,
  getAdvisoryReportLast7Days
} from "@/servers/apis";
import { toPercentage } from "@/utils";
import "./index.scss";

const format = "YYYY-MM-DD";
const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];
const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(format);

export default class Index extends Component {
  config = {
    navigationBarTitleText: "服务顾问"
  };

  state = {
    dateType: 0,
    showType: 0,
    data: null,
    isFetching: true,
    selectedDate: DEFAULT_DATE //默认前一天
  };

  componentWillMount() {
    const { title } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: `服务顾问(${title})`
    });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { showType, dateType } = this.state;

    this.setState({
      isFetching: true
    });

    let res = null;
    if (showType === 0) {
      res = await getAdvisoryReportYesterday(this.makeParams());
    } else if (showType === 1) {
      res = await getAdvisoryReportLast7Days(
        {
          dateTime: this.makeParams().endDateTime,
          uId: this.makeParams().uId
        },
        tabList[dateType].value
      );
    }

    this.setState({
      isFetching: false,
      data: res.data
    });
  };

  makeParams = () => {
    let { id } = this.$router.params;
    const { selectedDate, dateType } = this.state;
    return {
      uId: id,
      startDateTime: moment(selectedDate)
        .subtract(1, tabList[dateType].value)
        .format(format),
      endDateTime: selectedDate
    };
  };

  makeTendencyData = data => {
    const total = data ? data.TOTAL.orderTypeTotal : 0;
    if (total === 0) {
      return [
        {
          type: "二手车评估占比",
          percent: 0.33,
          total: 0
        },
        {
          type: "再购新车占比",
          percent: 0.33,
          total: 0
        },
        {
          type: "转介绍占比",
          percent: 0.34,
          total: 0
        }
      ];
    }
    return Object.values(data)
      .filter(item => item.orderType > 0)
      .map(item => ({
        total,
        type: item.orderTypeName + "占比",
        percent: item.proportion / 100
      }));
  };

  makeTendencyTableData = data => {
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

  makeStatisticalData = data => {
    return data.reduce((result, item) => {
      const { ESCTotal, ZGXCTotal, ZJSTotal, date } = item;
      const count = ESCTotal + ZGXCTotal + ZJSTotal;
      result = [
        ...result,
        {
          type: "二手车评估",
          date,
          value: ESCTotal,
          count
        },
        {
          type: "再购新车",
          date,
          value: ZGXCTotal,
          count
        },
        { type: "转介绍", date, value: ZJSTotal, count }
      ];

      return result;
    }, []);
  };

  makeStatisticalTableData = data => {
    return Array.isArray(data) ? data : [];
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

  render() {
    const { dateType, showType, data, isFetching } = this.state;

    return (
      <View className="page report__root">
        <AtTabs
          current={dateType}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.onSegmentedControl}
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

        {isFetching && (
          <AtActivityIndicator size={64} mode="center" content="加载中..." />
        )}

        {data && showType === 0 && (
          <View className="report__main">
            <TendencyChart
              title="总成交台数"
              dataSource={this.makeTendencyData(data)}
            />
            <View className="table">
              <View className="table-head at-row bg-gray">
                <View className="at-col at-col-4">业务项</View>
                <View className="at-col at-col-4">推荐客户量</View>
                <View className="at-col at-col-4">业务占比</View>
              </View>
              <View className="table-body">
                <View className="at-row border-bottom">
                  <View className="at-col at-col-4">总计推荐</View>
                  <View className="at-col at-col-4">
                    {data.TOTAL.orderTypeTotal}
                  </View>
                  <View className="at-col at-col-4">---</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-4">二手车评估</View>
                  <View className="at-col at-col-4">
                    {data.ESCPG.orderTypeTotal}
                  </View>
                  <View className="at-col at-col-4">
                    {data.ESCPG.proportion}%
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-4">再购新车</View>
                  <View className="at-col at-col-4">
                    {data.ZGXC.orderTypeTotal}
                  </View>
                  <View className="at-col at-col-4">
                    {data.ZGXC.proportion}%
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-4">转介绍</View>
                  <View className="at-col at-col-4">
                    {data.ZJS.orderTypeTotal}
                  </View>
                  <View className="at-col at-col-4">
                    {data.ZJS.proportion}%
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {data && showType === 1 && (
          <View className="report__main">
            <StatisticalChart dataSource={this.makeStatisticalData(data)} />
            <View className="table">
              <View className="table-head at-row bg-gray">
                <View className="at-col at-col-3">日期</View>
                <View className="at-col at-col-3 at-col--wrap">二手车评估</View>
                <View className="at-col at-col-2">再购新车</View>
                <View className="at-col at-col-2">转介绍</View>
                <View className="at-col at-col-2">推荐总量</View>
              </View>
              <View className="table-body">
                {data.map(d => (
                  <View className="at-row border-bottom">
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
        )}
      </View>
    );
  }
}
