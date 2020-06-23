import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "@/npm/taro-ui/dist";
import "./index.scss";
import { goTo } from "@/utils";
import EmptyData from "@/components/empty-data";
import { getMessageBoardList } from "@/servers/apis";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "人工解答"
  };

  state = {
    isFetching: false,
    listData: []
  };

  componentDidShow() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isFetching: true, listData: [] });
    getMessageBoardList().then(res => {
      try {
        this.setState({
          isFetching: false,
          listData: res.data
        });
      } catch (error) {
        this.setState({
          isFetching: false
        });
      }
    });
  };

  render() {
    const { listData, isFetching } = this.state;
    return (
      <View className="page bg-gray question-list__root">
        <View className="page-content">
          {listData.length > 0 ? (
            <View className="question-list__list">
              {listData.map(item => {
                return (
                  <View className="at-card question-list__item">
                    <View className="at-card__header question-card__header border-bottom">
                      <Text className="taro-text at-card__header-title question-list__item-date">
                        {item.feedbackTime}
                      </Text>
                      <View className="taro-text at-card__header-extra question-list__item-extra">
                        {item.typeName} {item.subTypeName}
                      </View>
                    </View>
                    <View className="at-card__content question-card__content">
                      <View className="question-list__item-title">
                        问题描述：
                      </View>
                      <View className="question-list__item-desc">
                        {item.feedbackContent}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <EmptyData loading={isFetching} showLogo>
              您还没有发起过任何问题反馈
            </EmptyData>
          )}
        </View>
        <View className="page-footer question-list__footer">
          <AtButton
            className="btn-primary btn-lg"
            type="primary"
            onClick={goTo.bind(this, "/pages/question-post")}
          >
            问题反馈
          </AtButton>
        </View>
      </View>
    );
  }
}
