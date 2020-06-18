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
import { getxsTopTotal, getxsTrend } from "@/servers/apis";
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
    navigationBarTitleText: "销售部排行榜"
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
      res = await getxsTopTotal(this.makeParams());
    } else if (showType === 1) {
      res = await getxsTrend(this.makeParams());
    }

    this.setState({
      isFetching: false,
      data: res.data
    });
  };
  //接口参数
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
    let sdata = newArr.xsTopReports;
    if (sdata) {
      sdata.unshift(newArr.total);
      sdata.push(newArr.avg);
      // this.setState({
      //   zhuData:sdata
      // })
      // console.log('5555',sdata)
      return Object.values(sdata).map(item => ({
        name: item.name, //顾问
        gxcCount: item.gxcCount, //二手车评估
        zhxcCount: item.zhxcCount, //再购新车
        zjsCount: item.zjsCount, //再购新车
        totalCount: item.totalCount //转介绍//推荐总量
      }));
    }
  };
  //折线图下方表格数据
  makeStatisticalTableData = data => {
    // console.log('销售部折线',data)
    let result = data.xsTrendList;
    let newArr = [];
    if (result) {
      this.setState({
        zheData: result[0].list
      });
      result.map(item => {
        let oldData = {};
        let orderDate = item.dateStr;
        item.list.map(val => {
          oldData.dateStr = orderDate;
          oldData[val.userId] = val.count;
        });
        newArr.push(oldData);
      });
      return newArr;
    }
    return Object.values(newArr).map(item => ({
      dateStr: item.dateStr,
      total: item.count
    }));
  };

  makeBasicData = data => {
    const list = data.xsTopReports || [];
    return list
      .reduce((result, item) => {
        return [
          ...result,
          {
            type: item.name,
            value: item.totalCount * 1
          }
        ];
      }, [])
      .sort((a, b) => a.value - b.value);
  };

  makeLineData = data => {
    const list = data.xsTrendList || [];
    return list.reduce((result, item) => {
      return [
        ...result,
        ...item.list.map(c => ({
          date: item.dateStr,
          type: c.name,
          value: c.totalCount * 1
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

  renderMain = () => {
    const { showType, data, isFetching, zheData } = this.state;
    if (isFetching) {
      return <AtActivityIndicator size={64} mode="center" content='加载中...' />;
    }
    if (showType === 0) {
      return (
        <View className="report__main">
          <View style="width:100%;height:320px">
            <F2Canvas onCanvasInit={this.drawDatass} />
          </View>
          <View className="table">
            <View className="at-row table-head text-center bg-gray">
              <View className="at-col at-col-2">顾问</View>
              <View className="at-col at-col-3">再购新车</View>
              <View className="at-col at-col-2">置换新车</View>
              <View className="at-col at-col-2">转介绍</View>
              <View className="at-col at-col-3">完成总台数</View>
            </View>
            <View className="table-body">
              {data &&
                this.makeTendencyTableData(data).map(item => (
                  <View className="at-row at-list__item" key={item.name}>
                    <View className="at-col at-col-2">{item.name}</View>
                    <View className="at-col at-col-3">{item.gxcCount}</View>
                    <View className="at-col at-col-2">{item.zhxcCount}</View>
                    <View className="at-col at-col-2">{item.zjsCount}</View>
                    <View className="at-col at-col-3">{item.totalCount}</View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      );
    } else if (showType === 1) {
      return (
        <View className="report__main">
          <View style="width:100%;height:320px">
            <F2Canvas onCanvasInit={this.drawData} />
          </View>
          <View className="table">
            <View className="at-row table-head text-center bg-gray">
              <View className="at-col at-col-3">日期</View>
              {this.state.zheData.map(item => (
                <View className="at-col at-col-3">{item.name}</View>
              ))}
            </View>
            <View className="table-body">
              {this.makeStatisticalTableData(data).map(item => (
                <View className="at-row at-list__item" key={item.dateStr}>
                  <View className="at-col at-col-3">{item.dateStr}</View>
                  {zheData.map(val => (
                    <View className="at-col at-col-3">
                      {item[val.userId] || 0}
                    </View>
                  ))}
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
        <Tabs
          current={dateType}
          options={tabList}
          onChange={this.handleTabClick.bind(this)}

        />
        <View className="report__control-wrap">
          <AtSegmentedControl
            current={showType}
            onClick={this.onSegmentedControl}
            values={["销售完成台数", "销售完成台数趋势"]}
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
                <View className="at-col at-col-2">顾问</View>
                <View className="at-col at-col-3">再购新车</View>
                <View className="at-col at-col-2">置换新车</View>
                <View className="at-col at-col-2">转介绍</View>
                <View className="at-col at-col-3">完成总台数</View>
              </View>
              <View className="table-body">
                {this.makeTendencyTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.name}>
                    <View className="at-col at-col-2">{item.name}</View>
                    <View className="at-col at-col-3">{item.gxcCount}</View>
                    <View className="at-col at-col-2">{item.zhxcCount}</View>
                    <View className="at-col at-col-2">{item.zjsCount}</View>
                    <View className="at-col at-col-3">{item.totalCount}</View>
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
                  <View className="at-col at-col-3">{item.name}</View>
                ))}
              </View>
              <View className="table-body">
                {this.makeStatisticalTableData(data).map(item => (
                  <View className="at-row border-bottom" key={item.dateStr}>
                    <View className="at-col at-col-3">{item.dateStr}</View>
                    {[].map(val => (
                      <View className="at-col at-col-3">
                        {item[val.userId] || 0}
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
