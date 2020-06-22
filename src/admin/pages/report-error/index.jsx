import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "@/npm/taro-ui/dist";
import Tabs from "@/components/tabs";
import Pager from "../../components/pager";
import TendencyChart from "../../components/charts/TendencyChart";
import StatisticalChart from "../../components/charts/StatisticalChart";
import moment from "moment";
import {
  timeoutDayStatisticsReport,
  getTimeoutStatisticsReport
} from "@/servers/apis";
import { toPercentage } from "@/utils";
import "./index.scss";

const FORMAT = "YYYY-MM-DD";
const FORMAT_CN = "YYYY年M月D日";
const tabList = [
  { label: `日`, value: "days" },
  { label: `周`, value: "weeks" },
  { label: `月`, value: "months" }
];
const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(FORMAT);

export default class Index extends Component {
  config = {
    navigationBarTitleText: "异常统计"
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
    const { showType, dateType } = this.state;

    this.setState({
      isFetching: true
    });

    let res = null;
    if (showType === 0) {
      res = await timeoutDayStatisticsReport(this.makeParams());
    } else if (showType === 1) {
      res = await getTimeoutStatisticsReport(
        {
          selectDate: this.makeParams().endDate
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
    const { selectedDate, dateType } = this.state;
    return {
      startDate: moment(selectedDate)
        .subtract(1, tabList[dateType].value)
        .format(FORMAT),
      endDate: selectedDate
    };
  };

  makeTendencyData = data => {
    const { escTotal, xsTotal, total } = data.timeoutTotal;
    return [
      {
        type: "二手车部占比",
        percent: total === 0 ? 0.5 : (escTotal / total).toFixed(2) * 1,
        total: escTotal
      },
      {
        type: "销售部占比",
        percent: total === 0 ? 0.5 : (xsTotal / total).toFixed(2) * 1,
        total: xsTotal
      }
    ];
  };

  makeStatisticalData = data => {
    return data.reduce((result, item) => {
      const {
        escpgTotal,
        zhxcTotal,
        zgxcTotal,
        zjsTotal,
        orderDate,
        total
      } = item;
      const count = total;
      result = [
        ...result,
        {
          type: "二手车评估",
          date: orderDate,
          value: escpgTotal,
          count
        },
        {
          type: "置换新车",
          date: orderDate,
          value: zhxcTotal,
          count
        },
        {
          type: "再购新车",
          date: orderDate,
          value: zgxcTotal,
          count
        },
        { type: "转介绍", date: orderDate, value: zjsTotal, count }
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
        .format(FORMAT);
    } else if (n === 1) {
      nextSelectedDate = moment(selectedDate)
        .add(1, "days")
        .format(FORMAT);
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
    let startDateStr = moment(selectedDate).format(FORMAT_CN);
    let endDateStr = moment(selectedDate).format(FORMAT_CN);

    if (dateType !== 0) {
      startDateStr = moment(selectedDate)
        .subtract(1, tabList[dateType].value)
        .format(FORMAT_CN);
    }

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
        <Tabs
          current={dateType}
          options={tabList}
          onChange={this.handleTabClick.bind(this)}

        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.onSegmentedControl}
            values={["异常统计", "异常趋势"]}
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
              title="超时台数"
              dataSource={this.makeTendencyData(data)}
            />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">业务项</View>
                <View className="at-col at-col-3">销售部</View>
                <View className="at-col at-col-3">二手车部</View>
                <View className="at-col at-col-3">总台数</View>
              </View>
              <View className="table-body">
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">
                    {data.orderTotal.name}
                  </View>
                  <View className="at-col at-col-3">
                    {data.orderTotal.xsTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.orderTotal.escTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.orderTotal.total}
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">
                    {data.timeoutTotal.name}
                  </View>
                  <View className="at-col at-col-3">
                    {data.timeoutTotal.xsTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.timeoutTotal.escTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.timeoutTotal.total}
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">
                    {data.timeoutRate.name}
                  </View>
                  <View className="at-col at-col-3">
                    {toPercentage(
                      data.timeoutRate ? data.timeoutRate.xsRate : 0
                    )}
                  </View>
                  <View className="at-col at-col-3">
                    {toPercentage(
                      data.timeoutRate ? data.timeoutRate.escRate : 0
                    )}
                  </View>
                  <View className="at-col at-col-3">
                    {toPercentage(
                      data.timeoutRate ? data.timeoutRate.totalRate : 0
                    )}
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">
                    {data.timeoutDeal.name}
                  </View>
                  <View className="at-col at-col-3">
                    {data.timeoutDeal.timeoutDealTotal}
                  </View>
                  <View className="at-col at-col-3">-</View>
                  <View className="at-col at-col-3">
                    {data.timeoutDeal.timeoutDeal}
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">
                    {data.timeoutNoDeal.name}
                  </View>
                  <View className="at-col at-col-3">
                    {data.timeoutNoDeal.timeoutNoDealTotal}
                  </View>
                  <View className="at-col at-col-3">-</View>
                  <View className="at-col at-col-3">
                    {data.timeoutNoDeal.timeoutDeal}
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
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-2">日期</View>
                <View className="at-col at-col-2 at-col--wrap">二手车评估</View>
                <View className="at-col at-col-2 at-col--wrap">置换新车</View>
                <View className="at-col at-col-2 at-col--wrap">再购新车</View>
                <View className="at-col at-col-2 at-col--wrap">转介绍</View>
                <View className="at-col at-col-2 at-col--wrap">超时总台数</View>
              </View>
              <View className="table-body">
                {this.makeStatisticalTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.orderDate}>
                    <View className="at-col at-col-2 at-col--wrap">
                      {item.orderDate}
                    </View>
                    <View className="at-col at-col-2">
                      {item.escpgTotal || 0}
                    </View>
                    <View className="at-col at-col-2">
                      {item.zhxcTotal || 0}
                    </View>
                    <View className="at-col at-col-2">
                      {item.zgxcTotal || 0}
                    </View>
                    <View className="at-col at-col-2">
                      {item.zjsTotal || 0}
                    </View>
                    <View className="at-col at-col-2">{item.total || 0}</View>
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
