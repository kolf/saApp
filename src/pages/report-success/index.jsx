import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "../../npm/taro-ui/dist";

import moment from "moment";
import Pager from "../../components/pager";
import TendencyChart from "../../components/charts/TendencyChart";
// import StatisticalChart from "../../components/charts/statistical-chart";
import { dealStatisticsReport, getStatisticsReport } from "../../servers/apis";
import { toPercentage } from "../../utils";
import "./index.scss";

const format = "YYYY-MM-DD";
const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];
const defaultDate = moment()
  .subtract(1, "days")
  .format(format);
export default class Index extends Component {
  config = {
    navigationBarTitleText: "成交率11"
  };

  state = {
    tabKey: 0,
    showType: 0,
    data: null,
    isFetching: false,
    endDate: defaultDate //默认前一天
  };

  tendencyRef = null;

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { showType, tabKey } = this.state;

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
        tabList[tabKey].value
      );
    }

    this.setState({
      isFetching: false,
      data: res.data
    });
  };

  makeParams = () => {
    const { endDate, tabKey } = this.state;
    let startDate = endDate;
    if (tabKey === 1) {
      startDate = moment(endDate)
        .subtract(1, "weeks")
        .format(format);
    } else if (tabKey === 2) {
      startDate = moment(endDate)
        .subtract(1, "months")
        .format(format);
    }
    return {
      startDate,
      endDate
    };
  };

  drawData = () => {
    const { data, showType } = this.state;
    const { TOTAL } = data;
    if (showType === 0) {
      this.tendencyRef.guide().text({
        position: ["50%", "45%"],
        content: TOTAL.orderDealTotal,
        style: {
          fill: "#333333", // 文本颜色
          fontSize: "29", // 文本大小
          fontWeight: "bold" // 文本粗细
        }
      });
      this.tendencyRef.changeData(this.makeTendencyData(data));
    } else if (showType === 1) {
      this.statisticalRef.changeData(this.makeStatisticalData(data));
    }
  };

  makeStatisticalData = data => {
    return data.reduce((result, item) => {
      const { zgxcTotal, zhxcTotal, zjsTotal, orderDate } = item;
      const count = zgxcTotal + zhxcTotal + zjsTotal;
      result = [
        ...result,
        {
          name: "再购新车",
          date: orderDate,
          num: zgxcTotal,
          count
        },
        {
          name: "置换新车",
          date: orderDate,
          num: zhxcTotal,
          count
        },
        { name: "转介绍", date: orderDate, num: zjsTotal, count }
      ];

      return result;
    }, []);
  };

  makeTendencyData = data => {
    const total = data.TOTAL.orderDealTotal;
    if (total === 0) {
      return [
        {
          name: "再购新车",
          percent: 0.33,
          a: "1"
        },
        {
          name: "置换新车",
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
    return Object.values(data)
      .filter((item, index) => index > 0)
      .map(item => ({
        name: item.orderTypeName,
        percent: (item.orderDealTotal / total).toFixed(2) * 1,
        a: "1"
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

  makeStatisticalTableData = data => {
    return Array.isArray(data) ? data : [];
  };

  handleDateChange = n => {
    const { endDate } = this.state;

    let nextEndDate = null;
    if (n === -1) {
      nextEndDate = moment(endDate)
        .subtract(1, "days")
        .format(format);
    } else if (n === 1) {
      nextEndDate = moment(endDate)
        .add(1, "days")
        .format(format);
    }
    this.setState(
      {
        endDate: nextEndDate
      },
      this.loadData
    );
  };

  handleTabClick = tabKey => {
    this.setState(
      {
        tabKey,
        endDate: defaultDate
      },
      this.loadData
    );
  };

  handleDateTypeChange = showType => {
    this.setState(
      {
        showType,
        endDate: defaultDate
      },
      this.loadData
    );
  };

  getPagerTitle = () => {
    const { endDate, tabKey } = this.state;
    const unit = tabList[tabKey].value;
    let endDateStr = moment(endDate).format("YYYY年MM月D日");
    let startDateStr = moment(endDate).format("YYYY年MM月D日");

    if (tabKey === 1) {
      startDateStr = moment(endDate)
        .subtract(1, unit)
        .format("YYYY年MM月D日");
    } else if (tabKey === 2) {
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
            title="总成交台数"
            saveRef={r => (this.tendencyRef = r)}
          />
          <View className="at-list  text-center">
            <View className="at-row at-list__item table-head text-center bg-gray">
              <View className="at-col at-col-3">业务项</View>
              <View className="at-col at-col-3">接单台数</View>
              <View className="at-col at-col-3">成交台数</View>
              <View className="at-col at-col-3">当前成交率</View>
            </View>
            <View className="table-body">
              {this.makeTendencyTableData(data).map(item => (
                <View className="at-row at-list__item" key={item.name}>
                  <View className="at-col at-col-3">{item.name}</View>
                  <View className="at-col at-col-3">{item.total}</View>
                  <View className="at-col at-col-3">{item.dealTotal}</View>
                  <View className="at-col at-col-3">{item.scale}</View>
                </View>
              ))}
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
              <View className="at-col at-col-3">接单台数</View>
              <View className="at-col at-col-3">成交台数</View>
              <View className="at-col at-col-3">成交率</View>
            </View>
            <View className="table-body">
              {this.makeStatisticalTableData(data).map(item => (
                <View className="at-row at-list__item">
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
      );
    }
  };

  render() {
    const { tabKey, showType, data } = this.state;
    console.log(1);
    return (
      <View className="page report__root">
        <AtTabs
          current={tabKey}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.handleDateTypeChange}
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
        {data && <TendencyChart dataSource={this.makeTendencyData(data)} />}
      </View>
    );
  }
}
