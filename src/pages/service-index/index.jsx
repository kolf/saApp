import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import qaUrl from "../../assets/images/qaList.png";
import postUrl from "../../assets/images/qaPost.png";

import { goTo } from "../../utils";

class Index extends Component {
  config = {
    navigationBarTitleText: "联系客服"
  };

  state = {};

  handleClick = name => {
    goTo(name);
  };

  render() {
    return (
      <View className="page qa-index__root bg-gray">
        <View className="qa-index__list">
          <View
            className="qa-index__list-item"
            onClick={this.handleClick.bind(this, "my-help")}
          >
            <Image src={qaUrl} className="img" mode="widthFix" />
          </View>
          <View
            className="qa-index__list-item"
            onClick={this.handleClick.bind(this, "question-list")}
          >
            <Image src={postUrl} className="img" mode="widthFix" />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
