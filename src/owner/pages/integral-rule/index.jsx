import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtActivityIndicator } from "@/npm/taro-ui/dist";
import { getActivityList } from "@/servers/apis";
import "./index.scss";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "积分规则说明"
  };

  state = { imgUrl: "", isFetching: true };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ isFetching: true });
    const res = await getActivityList({ status: 1, activityType: 3 });
    try {
      const imgUrl = res.data.list[0].detailImageUrl;
      this.setState({ imgUrl, isFetching: false });
    } catch (error) {}
  };

  render() {
    const { imgUrl, isFetching } = this.state;

    if (isFetching) {
      return (
        <View className="page bg-gray">
          <AtActivityIndicator size={64} mode="center" content="加载中..." />
        </View>
      );
    }

    return (
      <View className="page bg-gray">
        {imgUrl && <Image src={imgUrl} mode="widthFix" style="width:100%" />}
      </View>
    );
  }
}
