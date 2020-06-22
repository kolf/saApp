import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSegmentedControl, AtActivityIndicator } from "@/npm/taro-ui/dist";
import Tabs from "@/components/tabs";
import Pager from "../../components/pager";
import BasicChart from "../../components/charts/BasicChart";
import LineChart from "../../components/charts/LineChart";

import moment from "moment";
import { getescstatistics, getesTopTotal } from "@/servers/apis";
import "./index.scss";
const FORMAT = "YYYY-MM-DD";
const FORMAT_CN = "YYYY年M月D日";
const tabList = [
  { label: `日`, value: "days", paramValue: "DAY" },
  { label: `周`, value: "weeks", paramValue: "WEEK" },
  { label: `月`, value: "months", paramValue: "MONTH" }
];

const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(FORMAT);

export default class Index extends Component {
  config = {
    navigationBarTitleText: "二手车部排行榜"
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
    const { showType } = this.state;

    this.setState({
      isFetching: true
    });

    let res = null;
    if (showType === 0) {
      res = await getesTopTotal(this.makeParams());
    } else if (showType === 1) {
      res = await getescstatistics(this.makeParams());
    }

    this.setState({
      isFetching: false,
      data: res.data
    });
  };

  makeParams = () => {
    const { selectedDate, dateType } = this.state;
    return {
      dateType: tabList[dateType].paramValue,
      selectDate: selectedDate
    };
  };

  makeBasicData = data => {
    const list = data.escTopReports || [];
    return list
      .reduce((result, item) => {
        return [
          ...result,
          {
            type: item.name,
            value: item.total * 1
          }
        ];
      }, [])
      .sort((a, b) => a.value - b.value);
  };

  makeBasicTableData = data => {
    return data.escTopReports || [];
  };

  makeLineData = data => {
    const list = data.resultList || [];
    return list.reduce((result, item) => {
      return [
        ...result,
        ...item.dataList.map(c => ({
          date: item.orderDate,
          type: c.realName,
          value: c.count * 1
        }))
      ];
    }, []);
  };

  makeLineTableData = data => {
    return data.resultList || [];
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
  //切换趋势和总排行
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

    console.log(data, "data1");

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
            values={["二手车完成台数", "二手车完成台数趋势"]}
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
            <BasicChart dataSource={this.makeBasicData(data)} />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">顾问</View>
                <View className="at-col at-col-3">仅评估台数</View>
                <View className="at-col at-col-3">推荐置换台数</View>
                <View className="at-col at-col-3">完成总台数</View>
              </View>
              <View className="table-body">
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">{data.total.name}</View>
                  <View className="at-col at-col-3">
                    {data.total.escpgTotal || 0}
                  </View>
                  <View className="at-col at-col-3">
                    {data.total.escpgTotal || 0}
                  </View>
                  <View className="at-col at-col-3">
                    {data.total.total || 0}
                  </View>
                </View>
                {this.makeBasicTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.name}>
                    <View className="at-col at-col-3">{item.name}</View>
                    <View className="at-col at-col-3">
                      {item.escpgTotal || 0}
                    </View>
                    <View className="at-col at-col-3">
                      {item.escpgTotal || 0}
                    </View>
                    <View className="at-col at-col-3">{item.total || 0}</View>
                  </View>
                ))}
                <View className="at-row border-bottom">
                  <View className="at-col at-col-3">{data.avg.name}</View>
                  <View className="at-col at-col-3">
                    {data.avg.escpgTotal || 0}
                  </View>
                  <View className="at-col at-col-3">
                    {data.avg.escpgTotal || 0}
                  </View>
                  <View className="at-col at-col-3">{data.avg.total || 0}</View>
                </View>
              </View>
            </View>
          </View>
        )}

        {data && showType === 1 && (
          <View className="report__main">
            <LineChart dataSource={this.makeLineData(data)} />
            <View className="table">
              <View className="at-row table-head bg-gray">
                <View className="at-col at-col-3">日期</View>
                {this.makeLineData(data).map(item => (
                  <View className="at-col at-col-3">{item.type}</View>
                ))}
              </View>
              <View className="table-body">
                {this.makeLineTableData(data).map(item => ( 
                  <View className="at-row border-bottom" key={item.orderDate}>
                    <View className="at-col at-col-3">{item.orderDate}</View>
                    {item.dataList.map(c => (
                      <View className="at-col at-col-3">
                        {c.count || 0}
                      </View>
                    ))}
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
