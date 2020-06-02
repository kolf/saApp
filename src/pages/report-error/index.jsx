import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtSegmentedControl, AtActivityIndicator } from "taro-ui";

import moment from "moment";
import Pager from "../../components/pager";
import TendencyChart from "../../components/charts/tendency-chart";
import StatisticalChart from "../../components/charts/statistical-chart";
import {
  timeoutDayStatisticsReport,
  getTimeoutStatisticsReport
} from "../../servers/apis";
import { toPercentage } from "../../utils";
import "./index.scss";

const formatStr = "YYYY-MM-DD";

const tabList = [
  { title: `日`, value: "days" },
  { title: `周`, value: "weeks" },
  { title: `月`, value: "months" }
];

export default class Index extends Component {
  config = {
    navigationBarTitleText: "异常统计"
  };

  state = {
    activeKey: 0,
    showType: 0,
    data: {},
    isFetching: false,
    endDate: moment()
      .subtract(1, "days")
      .format(formatStr) //默认前一天
  };

  tendencyRef = null;

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    this.setState({
      isFetching: true
    });

    this.fetchAction().then(res => {
      this.setState({
        isFetching: false,
        data: res.data
      });

      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.drawData();
      }, 300);
    });
  };

  fetchAction = () => {
    const { showType, activeKey } = this.state;
    if (showType === 0) {
      return timeoutDayStatisticsReport(this.makeParams());
    } else if (showType === 1) {
      return getTimeoutStatisticsReport(
        {
          selectDate: this.state.endDate
        },
        tabList[activeKey].value
      );
    }
  };

  makeParams = (newParams = {}) => {
    const { endDate, activeKey } = this.state;
    let startDate = endDate;
    if (activeKey === 1) {
      startDate = moment(endDate)
        .subtract(1, "weeks")
        .format(formatStr);
    } else if (activeKey === 2) {
      startDate = moment(endDate)
        .subtract(1, "months")
        .format(formatStr);
    }
    return {
      startDate,
      endDate,
      ...newParams
    };
  };

  drawData = () => {
    const { data, showType } = this.state;
    if (showType === 0) {
      // console.log(data);
      const { timeoutTotal } = data;
      this.tendencyRef.guide().text({
        position: ["50%", "45%"],
        content: timeoutTotal.total,
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

  makeTendencyData = data => {
    const { escTotal, xsTotal, total } = data.timeoutTotal;

    return [
      {
        name: "二手车部占比",
        percent: total === 0 ? 0.5 : (escTotal / total).toFixed(2) * 1,
        a: "1"
      },
      {
        name: "销售部占比",
        percent: total === 0 ? 0.5 : (xsTotal / total).toFixed(2) * 1,
        a: "1"
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
          name: "二手车评估",
          date: orderDate,
          num: escpgTotal,
          count
        },
        {
          name: "置换新车",
          date: orderDate,
          num: zhxcTotal,
          count
        },
        {
          name: "再购新车",
          date: orderDate,
          num: zgxcTotal,
          count
        },

        { name: "转介绍", date: orderDate, num: zjsTotal, count }
      ];

      return result;
    }, []);
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
        .format(formatStr);
    } else if (n === 1) {
      nextEndDate = moment(endDate)
        .add(1, "days")
        .format(formatStr);
    }
    this.setState(
      {
        endDate: nextEndDate
      },
      this.loadData
    );
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
      return <AtActivityIndicator mode='center' content='加载中...' />;
    }
    if (showType === 0) {
      return (
        <View className='report__main'>
          <TendencyChart
            title='超时台数'
            saveRef={r => (this.tendencyRef = r)}
          />
          <View className='at-list  text-center'>
            <View className='at-row at-list__item table-head text-center bg-gray'>
              <View className='at-col at-col-3'>业务项</View>
              <View className='at-col at-col-3'>销售部</View>
              <View className='at-col at-col-3'>二手车部</View>
              <View className='at-col at-col-3'>总台数</View>
            </View>
            <View className='table-body'>
              <View className='at-row at-list__item'>
                <View className='at-col at-col-3'>{data.orderTotal.name}</View>
                <View className='at-col at-col-3'>
                  {data.orderTotal.xsTotal}
                </View>
                <View className='at-col at-col-3'>
                  {data.orderTotal.escTotal}
                </View>
                <View className='at-col at-col-3'>{data.orderTotal.total}</View>
              </View>
              <View className='at-row at-list__item'>
                <View className='at-col at-col-3'>
                  {data.timeoutTotal.name}
                </View>
                <View className='at-col at-col-3'>
                  {data.timeoutTotal.xsTotal}
                </View>
                <View className='at-col at-col-3'>
                  {data.timeoutTotal.escTotal}
                </View>
                <View className='at-col at-col-3'>
                  {data.timeoutTotal.total}
                </View>
              </View>
              <View className='at-row at-list__item'>
                <View className='at-col at-col-3'>{data.timeoutRate.name}</View>
                <View className='at-col at-col-3'>
                  {toPercentage(data.timeoutRate ? data.timeoutRate.xsRate : 0)}
                </View>
                <View className='at-col at-col-3'>
                  {toPercentage(
                    data.timeoutRate ? data.timeoutRate.escRate : 0
                  )}
                </View>
                <View className='at-col at-col-3'>
                  {toPercentage(
                    data.timeoutRate ? data.timeoutRate.totalRate : 0
                  )}
                </View>
              </View>
              <View className='at-row at-list__item'>
                <View className='at-col at-col-3'>{data.timeoutDeal.name}</View>
                <View className='at-col at-col-3'>
                  {data.timeoutDeal.timeoutDealTotal}
                </View>
                <View className='at-col at-col-3'>-</View>
                <View className='at-col at-col-3'>
                  {data.timeoutDeal.timeoutDeal}
                </View>
              </View>
              <View className='at-row at-list__item'>
                <View className='at-col at-col-3'>
                  {data.timeoutNoDeal.name}
                </View>
                <View className='at-col at-col-3'>
                  {data.timeoutNoDeal.timeoutNoDealTotal}
                </View>
                <View className='at-col at-col-3'>-</View>
                <View className='at-col at-col-3'>
                  {data.timeoutNoDeal.timeoutDeal}
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (showType === 1) {
      return (
        <View className='report__main'>
          <StatisticalChart saveRef={r => (this.statisticalRef = r)} />
          <View className='at-list  text-center'>
            <View className='at-row at-list__item table-head text-center bg-gray'>
              <View className='at-col at-col-2'>日期</View>
              <View className='at-col at-col-2 at-col--wrap'>二手车评估</View>
              <View className='at-col at-col-2 at-col--wrap'>置换新车</View>
              <View className='at-col at-col-2 at-col--wrap'>再购新车</View>
              <View className='at-col at-col-2 at-col--wrap'>转介绍</View>
              <View className='at-col at-col-2 at-col--wrap'>超时总台数</View>
            </View>
            <View className='table-body'>
              {this.makeStatisticalTableData(data).map(item => (
                <View className='at-row at-list__item'>
                  <View className='at-col at-col-2 at-col--wrap'>
                    {item.orderDate}
                  </View>
                  <View className='at-col at-col-2'>
                    {item.escpgTotal || 0}
                  </View>
                  <View className='at-col at-col-2'>{item.zhxcTotal || 0}</View>
                  <View className='at-col at-col-2'>{item.zgxcTotal || 0}</View>
                  <View className='at-col at-col-2'>{item.zjsTotal || 0}</View>
                  <View className='at-col at-col-2'>{item.total || 0}</View>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }
  };

  //   escpgTotal: 0
  // orderDate: "09月13日"
  // total: 0
  // zgxcTotal: 0
  // zhxcTotal: 0
  // zjsTotal: 0

  render() {
    const { activeKey, showType } = this.state;
    return (
      <View className='page report__root'>
        <AtTabs
          current={activeKey}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          animated={false}
        />
        <View className='report__control-wrap'>
          <AtSegmentedControl
            current={showType}
            onClick={this.handleDateTypeChange}
            values={["异常统计", "异常趋势"]}
          />
        </View>
        <View className='border-bottom report__pager'>
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
//timeoutNoDeal
