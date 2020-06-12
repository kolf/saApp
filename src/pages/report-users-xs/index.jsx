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

const orderTypeNameMap = {
  ZGXCTotal: "再购新车",
  ZHXCTotal: "置换新车",
  ZJSTotal: "转介绍"
};
export default class Index extends Component {
  config = {
    navigationBarTitleText: "销售顾问"
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
      title: `销售顾问(${title})`
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
    const dataObj = data.CJProportionPie || {};
    const total = dataObj.total || 0;
    if (total === 0) {
      return [
        {
          type: "再购新车占比",
          percent: 0.33,
          total: 0
        },
        {
          type: "置换新车占比",
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
    return Object.keys(dataObj).reduce((result, key) => {
      if (/(ZGXCTotal|ZHXCTotal|ZJSTotal)/.test(key)) {
        result.push({
          total,
          type: orderTypeNameMap[key] + "占比",
          percent: dataObj[key] / 100
        });
      }
      return result;
    }, []);
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
      const { ACTotal, CJTotal, date } = item;
      const count = ACTotal + CJTotal;
      result = [
        ...result,
        {
          type: "A卡台数",
          date,
          value: ACTotal,
          count
        },
        {
          type: "完成台数",
          date,
          value: CJTotal,
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
            values={["成交统计", "成交统计趋势"]}
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
              <View className="at-row table-head text-center bg-gray">
                <View className="at-col at-col-2">业务项</View>
                <View className="at-col at-col-3">再购新车</View>
                <View className="at-col at-col-3">置换新车</View>
                <View className="at-col at-col-2">转介绍</View>
                <View className="at-col at-col-2">总台数</View>
              </View>
              <View className="table-body">
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">接单台数 </View>
                  <View className="at-col at-col-3">
                    {data.Total.ZGXCTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.Total.ZHXCTotal}
                  </View>
                  <View className="at-col at-col-2">{data.Total.ZJSTotal}</View>
                  <View className="at-col at-col-2">{data.Total.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">A卡台数</View>
                  <View className="at-col at-col-3">
                    {data.ACNum.ZGXCTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.ACNum.ZHXCTotal}
                  </View>
                  <View className="at-col at-col-2">{data.ACNum.ZJSTotal}</View>
                  <View className="at-col at-col-2">{data.ACNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">成交台数</View>
                  <View className="at-col at-col-3">
                    {data.CJNum.ZGXCTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.CJNum.ZHXCTotal}
                  </View>
                  <View className="at-col at-col-2">{data.CJNum.ZJSTotal}</View>
                  <View className="at-col at-col-2">{data.CJNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">成交率</View>
                  <View className="at-col at-col-3">
                    {data.CJProportion.ZGXCTotal}%
                  </View>
                  <View className="at-col at-col-3">
                    {data.CJProportion.ZHXCTotal}%
                  </View>
                  <View className="at-col at-col-2">
                    {data.CJProportion.ZJSTotal}%
                  </View>
                  <View className="at-col at-col-2">
                    {data.CJProportion.total}%
                  </View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">超时台数</View>
                  <View className="at-col at-col-3">
                    {data.CSNum.ZGXCTotal}
                  </View>
                  <View className="at-col at-col-3">
                    {data.CSNum.ZHXCTotal}
                  </View>
                  <View className="at-col at-col-2">{data.CSNum.ZJSTotal}</View>
                  <View className="at-col at-col-2">{data.CSNum.total}</View>
                </View>
                <View className="at-row border-bottom">
                  <View className="at-col at-col-2">超时率</View>
                  <View className="at-col at-col-3">
                    {data.CSProportion.ZGXCTotal}%
                  </View>
                  <View className="at-col at-col-3">
                    {data.CSProportion.ZHXCTotal}%
                  </View>
                  <View className="at-col at-col-2">
                    {data.CSProportion.ZJSTotal}%
                  </View>
                  <View className="at-col at-col-2">
                    {data.CSProportion.total}%
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
                <View className="at-col at-col-4">日期</View>
                <View className="at-col at-col-4">A卡台数</View>

                <View className="at-col at-col-4">成交台数</View>
              </View>
              <View className="table-body">
                {data.map(d => (
                  <View className="at-row border-bottom">
                    <View className="at-col at-col-4">{d.date}</View>
                    <View className="at-col at-col-4">{d.ACTotal}</View>
                    <View className="at-col at-col-4">{d.CJTotal}</View>
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
