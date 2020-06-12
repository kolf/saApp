import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "../../npm/taro-ui/dist";

import Pager from "../../components/pager";
import TendencyChart from "../../components/charts/TendencyChart";
import StatisticalChart from "../../components/charts/StatisticalChart";
import moment from "moment";
import {
  getAdvisoryReportYesterday,
  getAdvisoryReportLast7Days
} from "../../servers/apis";
import { toPercentage } from "../../utils";
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
    navigationBarTitleText: "二手车顾问"
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
      title: `二手车顾问(${title})`
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
    const total = data ? data.WCNum.total : 0;
    if (total === 0) {
      return [
        {
          type: "评估台数占比",
          percent: 0.5
        },
        {
          type: "推荐置换台数占比",
          percent: 0.5
        }
      ];
    }
    return Object.keys(data)
      .filter(key => /(ZHNum|PGNum)/.test(key))
      .map(key => {
        const item = data[key];
        return {
          total,
          type: item.orderTypeName + "占比",
          percent: item.proportion / 100
        };
      });
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
      const { ZHTotal,PGTotal, date } = item;
      const count = ZHTotal + PGTotal;
      result = [
        ...result,
        {
          type: "推荐置换台数",
          date,
          value: ZHTotal,
          count
        },
        {
          type: "评估台数",
          date,
          value: PGTotal,
          count
        }
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
            <View className="at-row table-head text-center bg-gray">
              <View className="at-col at-col-6">业务项</View>

              <View className="at-col at-col-6">总台数</View>
            </View>
            <View className="table-body">
              <View className="at-row">
                <View className="at-col at-col-6">接单台数</View>

                <View className="at-col at-col-6">{data.Total.total}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-6">完成台数</View>

                <View className="at-col at-col-6">{data.WCNum.total}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-6">超时台数</View>

                <View className="at-col at-col-6">{data.CSNum.total}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-6">仅评估台数</View>

                <View className="at-col at-col-6">{data.PGNum.total}</View>
              </View>
              <View className="at-row">
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
            <View className="at-row table-head text-center bg-gray">
              <View className="at-col at-col-3">日期</View>
              <View className="at-col at-col-3">评估台数</View>
              <View className="at-col at-col-3">推荐置换台数</View>

              <View className="at-col at-col-3">完成台数</View>
            </View>
            <View className="table-body">
              {data.map(d => (
                <View className="at-row">
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
                <View className="at-col at-col-6">业务项</View>
                <View className="at-col at-col-6">总台数</View>
              </View>
              <View className="table-body">
                <View className="at-row border-bottom">
                  <View className="at-col at-col-6">接单台数</View>
                  <View className="at-col at-col-6">{data.Total.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-6">完成台数</View>
                  <View className="at-col at-col-6">{data.WCNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-6">超时台数</View>
                  <View className="at-col at-col-6">{data.CSNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-6">仅评估台数</View>
                  <View className="at-col at-col-6">{data.PGNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-6">推荐置换台数</View>
                  <View className="at-col at-col-6">{data.ZHNum.total}</View>
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
                <View className="at-col at-col-3">日期</View>
                <View className="at-col at-col-3">评估台数</View>
                <View className="at-col at-col-3">推荐置换台数</View>
                <View className="at-col at-col-3">完成台数</View>
              </View>
              <View className="table-body">
                {data.map(d => (
                  <View className="at-row border-bottom">
                    <View className="at-col at-col-3">{d.date}</View>
                    <View className="at-col at-col-3">{d.PGTotal}</View>
                    <View className="at-col at-col-3">{d.ZHTotal}</View>
                    <View className="at-col at-col-3">{d.Total}</View>
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
