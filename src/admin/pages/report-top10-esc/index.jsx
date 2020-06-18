import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTabs,
  AtSegmentedControl,
  AtActivityIndicator
} from "@/npm/taro-ui/dist";
import Tabs from "@/components/tabs";
import Pager from "../../components/pager";
import BasicChart from "../../components/charts/BasicChart";
import LineChart from "../../components/charts/LineChart";

import moment from "moment";
import { getescstatistics, getesTopTotal } from "@/servers/apis";
import { toPercentage } from "@/utils";
import "./index.scss";
const format = "YYYY-MM-DD";

const tabList = [
  { label: `日`, value: "days", paramValue: "DAY" },
  { label: `周`, value: "weeks", paramValue: "WEEK" },
  { label: `月`, value: "months", paramValue: "MONTH" }
];

const DEFAULT_DATE = moment()
  .subtract(1, "days")
  .format(format);

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

  //柱状图标下方的表格数据
  makeTendencyTableData = data => {
    let newArr = JSON.parse(JSON.stringify(data));
    let sdata = newArr.escTopReports;
    if (sdata) {
      sdata.unshift(newArr.total);
      sdata.push(newArr.avg);
      return Object.values(sdata).map(item => ({
        name: item.name,
        escpgTotal: item.escpgTotal,
        escpgTotal: item.esczhTotal,
        total: item.total
      }));
    }
  };
  //折线图下方表格数据
  makeStatisticalTableData = data => {
    let result = data.resultList;
    let newArr = [];
    if (result) {
      this.setState({
        zheData: result[0].dataList
      });
      result.map(item => {
        let oldData = {};
        let orderDate = item.orderDate;
        item.dataList.map(val => {
          oldData.orderDate = orderDate;
          oldData[val.escUserId] = val.count;
        });
        newArr.push(oldData);
      });
      // console.log('55555555555555555555555555555555',newArr)
      return newArr;
    }
    return Object.values(newArr).map(item => ({
      name: item.name,
      escpgTotal: item.escpgTotal,
      escpgTotal: item.esczhTotal,
      total: item.total
    }));
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
                <View className="at-col at-col-1">顾问</View>
                <View className="at-col at-col-4">仅评估台数</View>
                <View className="at-col at-col-4">推荐置换台数</View>
                <View className="at-col at-col-3">完成总台数</View>
              </View>
              <View className="table-body">
                {data &&
                  this.makeTendencyTableData(data).map(item => (
                    <View className="at-row border-bottom" key={item.name}>
                      <View className="at-col at-col-3">{item.name}</View>
                      <View className="at-col at-col-3">{item.escpgTotal}</View>
                      <View className="at-col at-col-3">{item.escpgTotal}</View>
                      <View className="at-col at-col-3">{item.total}</View>
                    </View>
                  ))}
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
                {[].map(item => (
                  <View className="at-col at-col-3">{item.realName}</View>
                ))}
              </View>
              <View className="table-body">
                {this.makeStatisticalTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.orderDate}>
                    <View className="at-col at-col-3">{item.orderDate}</View>
                    {[].map(val => (
                      <View className="at-col at-col-3">
                        {item[val.escUserId] || 0}
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
