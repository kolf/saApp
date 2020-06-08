import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import NavPanel from "../../components/nav-panel";
import "./index.scss";
import { goTo } from "../../utils";
import storage from "../../utils/storage";
import leadUrl from "../../assets/images/lead.svg";
import noteLargeUrl from "../../assets/images/note-large.svg";
import usersLargeUrl from "../../assets/images/users-large.svg";
import serviceUrl from "../../assets/images/service.svg";
import userLargeUrl from "../../assets/images/user-large.svg";

export default class Index extends Component {
  state = {
    userInfo: storage.get("userInfo") || {}
  };

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#4268e6"
    });
  }

  render() {
    return (
      <View className="page boss-index__root">
        <View style={{ margin: "12rpx -12rpx" }}>
          <View className="at-row at-row--wrap">
            <View className="at-col at-col-12">
              <View className="boss-index__nav">
                <Image
                  src={leadUrl}
                  className="img"
                  style={{ width: "100%", fontSize: 0 }}
                  mode="widthFix"
                />
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="boss-index__nav">
                <NavPanel title="员工订单">
                  <Image
                    src={noteLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="boss-index__nav">
                <NavPanel title="员工列表">
                  <Image
                    src={usersLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="boss-index__nav">
                <NavPanel title="联系客服">
                  <View className="nav-icon">
                    <Image
                      src={serviceUrl}
                      mode="widthFix"
                      className="img nav-icon"
                    />
                  </View>
                </NavPanel>
              </View>
            </View>
            <View className="at-col at-col-6">
              <View className="boss-index__nav">
                <NavPanel title="我的">
                  <Image
                    src={userLargeUrl}
                    mode="widthFix"
                    className="img nav-icon"
                  />
                </NavPanel>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
