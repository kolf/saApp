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
import { dealStatisticsReport, getStatisticsReport } from "@/servers/apis";
import { toPercentage } from "@/utils";
import "./index.scss";

const format = "YYYY-MM-DD";
const tabList = [
  { label: `日`, value: "days" },
  { label: `周`, value: "weeks" },
  { label: `月`, value: "months" }
];
const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(format);

export default class Index extends Component {
  config = {
    navigationBarTitleText: "成交率"
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
      res = await dealStatisticsReport(this.makeParams());
    } else if (showType === 1) {
      res = await getStatisticsReport(
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
        .format(format),
      endDate: selectedDate
    };
  };

  makeTendencyData = data => {
    const total = data.TOTAL.orderDealTotal;
    if (total === 0) {
      return [
        {
          type: "转介绍占比",
          percent: 0.34,
          total: 0
        },
        {
          type: "再购新车占比",
          percent: 0.33,
          total: 0
        },
        {
          type: "置换新车占比",
          percent: 0.33,
          total: 0
        }
      ];
    }
    return Object.values(data)
      .filter((item) => item.orderType > 0)
      .map(item => ({
        total,
        type: item.orderTypeName + "占比",
        percent: (item.orderDealTotal / total).toFixed(2) * 1
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
      const { zgxcTotal, zhxcTotal, zjsTotal, orderDate } = item;
      const count = zgxcTotal + zhxcTotal + zjsTotal;
      result = [
        ...result,
        {
          type: "再购新车",
          date: orderDate,
          value: zgxcTotal,
          count
        },
        {
          type: "置换新车",
          date: orderDate,
          value: zhxcTotal,
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
        <Tabs
          current={dateType}
          options={tabList}
          onChange={this.handleTabClick.bind(this)}

        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.onSegmentedControl}
            values={["成交率报表", "成交率趋势"]}
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
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">业务项</View>
                <View className="at-col at-col-3">接单台数</View>
                <View className="at-col at-col-3">成交台数</View>
                <View className="at-col at-col-3">当前成交率</View>
              </View>
              <View className="table-body">
                {this.makeTendencyTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.name}>
                    <View className="at-col at-col-3">{item.name}</View>
                    <View className="at-col at-col-3">{item.total}</View>
                    <View className="at-col at-col-3">{item.dealTotal}</View>
                    <View className="at-col at-col-3">{item.scale}</View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {data && showType === 1 && (
          <View className="report__main">
            <StatisticalChart dataSource={this.makeStatisticalData(data)} />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">日期</View>
                <View className="at-col at-col-3">接单台数</View>
                <View className="at-col at-col-3">成交台数</View>
                <View className="at-col at-col-3">成交率</View>
              </View>
              <View className="table-body">
                {this.makeStatisticalTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.orderDate}>
                    <View className="at-col at-col-3">{item.orderDate}</View>
                    <View className="at-col at-col-3">
                      {item.orderTotal || 0}
                    </View>
                    <View className="at-col at-col-3">
                      {item.orderDealTotal || 0}
                    </View>
                    <View className="at-col at-col-3">
                      {toPercentage(item.transactionRate)}
                    </View>
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
