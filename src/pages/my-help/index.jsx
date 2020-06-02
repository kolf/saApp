import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import NetwordError from "../../components/network-error";
import { getActivityList } from "../../servers/apis";

import "./index.scss";

class Index extends Component {
  config = {
    navigationBarTitleText: "常用问题"
  };

  state = { imgUrl: "", isFetching: false, isError: false };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ isFetching: true, isError: false });

    try {
      const res = await getActivityList({ status: 1, activityType: 4 });
      const imgUrl = res.data.list[0].detailImageUrl;
      this.setState({ imgUrl, isFetching: false });
    } catch (error) {
      this.setState({
        isFetching: false,
        isError: true
      });
    }
  };

  render() {
    const { imgUrl, isFetching, isError } = this.state;

    if (isFetching) {
      return (
        <View className="page bg-gray">
          <AtActivityIndicator mode="center" content="加载中..." />
        </View>
      );
    }

    return (
      <View className="page bg-gray">
        {!isError && imgUrl && (
          <Image src={imgUrl} mode="widthFix" style="width:100%" />
        )}
        {isError && <NetwordError onClick={this.loadData} />}
      </View>
    );
  }
}

export default Index;
