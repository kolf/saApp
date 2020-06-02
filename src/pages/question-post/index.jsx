import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Button } from "@tarojs/components";
import {
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtTextarea,
  AtList
} from "taro-ui";
import "./index.scss";
import ListItem from "../../components/list-item";

import { getMessageTypeList, putMessageBoard } from "../../servers/apis";

// const
class Index extends Component {
  config = {
    navigationBarTitleText: "问题反馈"
  };

  state = {
    confirmLoading: false,
    dataList: [],
    selectedIndex: []
  };

  resDataList = [];

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    getMessageTypeList().then(res => {
      this.resDataList = res.data;
      const dataList = [
        this.resDataList.map(item => item.paramName),
        (this.resDataList[0].sub || []).map(item => item.paramName)
      ];
      this.setState({
        dataList
      });
    });
  };

  handleSubmit = () => {
    const { inputValue, selectedIndex } = this.state;

    putMessageBoard({
      type: this.resDataList[selectedIndex[0]].code,
      subType: this.resDataList[selectedIndex[0]].sub[selectedIndex[1]]
        .paramValue,
      feedbackContent: inputValue
    }).then(res => {
      this.setState({
        isOpened: true
      });
    });
  };

  handleSelect = e => {
    this.setState({
      selectedIndex: e.detail.value
    });
  };

  handleColumnChange = e => {
    const { column, value } = e.detail;
    if (column === 0) {
      const dataList = [
        this.resDataList.map(item => item.paramName),
        (this.resDataList[value].sub || []).map(item => item.paramName)
      ];
      this.setState({
        selectedIndex: [],
        dataList
      });
    }
  };

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  hideModal = e => {
    this.setState({ isOpened: false });
    Taro.navigateBack({
      delta: 1
    });
  };

  render() {
    const { selectedIndex, inputValue } = this.state;
    return (
      <View className="page bg-gray question-post__root">
        <AtList className="gap-top no-border">
          <ListItem
            title="问题类型"
            isRequire
            renderExtra={
              <Picker
                mode="multiSelector"
                range={this.state.dataList}
                onChange={this.handleSelect}
                onColumnChange={this.handleColumnChange}
              >
                <View>
                  {selectedIndex.length === 0
                    ? "请选择"
                    : this.resDataList[selectedIndex[0]].sub[selectedIndex[1]]
                        .paramName}
                </View>
              </Picker>
            }
            arrow="right"
          />
          <View className="at-textarea__box">
            <AtTextarea
              name="value1"
              placeholder="请简要描述您要反馈的问题，限200字以内"
              maxLength={200}
              height={320}
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </View>
        </AtList>

        <View className="submit-button-wrap">
          <View className="submit-button">
            <AtButton
              loading={this.state.confirmLoading}
              type="primary"
              onClick={this.handleSubmit}
              disabled={selectedIndex.length === 0 || !inputValue}
            >
              提交
            </AtButton>
          </View>
        </View>
        <AtModal isOpened={this.state.isOpened}>
          <AtModalHeader>提示</AtModalHeader>
          <AtModalContent className="text-center text-lg">
            <View>稍后客服人员会在24小时内与您联系</View>
            <View>请保持电话畅通</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.hideModal}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}

export default Index;
