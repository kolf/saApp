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
} from "@/npm/taro-ui/dist";
import ListItem from "@/components/list-item";
import "./index.scss";

import modal from "@/utils/modal";
import { getMessageTypeList, putMessageBoard } from "@/servers/apis";

export default class Index extends Component {
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
      modal({
        content: `稍后客服人员会在24小时内与您联系，请保持电话畅通`,
        success(r) {
          if (r.confirm) {
            Taro.navigateBack({
              delta: 1
            });
          }
        }
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

  handleInputChange = value => {
    this.setState({
      inputValue: value
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
      <View className="page question-post__root">
        <AtList className="no-border">
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

          <View className="pad">
            <AtTextarea
              className="question-post__input no-border"
              name="value"
              placeholder="请简要描述您要反馈的问题，限200字以内"
              maxLength={200}
              height={320}
              onChange={this.handleInputChange}
            />
          </View>
        </AtList>

        <View className="next-button-wrap">
          <AtButton
            className="btn-lg btn-primary"
            loading={this.state.confirmLoading}
            type="primary"
            onClick={this.handleSubmit}
            disabled={selectedIndex.length === 0 || !inputValue}
          >
            提交
          </AtButton>
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


