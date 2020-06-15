import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import {
  AtButton,
  AtList,
  AtListItem,
  AtInput,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "@/npm/taro-ui/dist";
import "./index.scss";

import UserPanelAvatar from "@/components/user-panel-avatar";
import { getCuDetail, confirmBind } from "@/servers/apis";
import { getOptionLabel } from "@/utils/options";
import { getCityName, goTo } from "@/utils";

function loop(e) {
  e.stopPropagation();
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: "车主详情"
  };

  state = {
    data: null,
    newRealName: "",
    isOpenedModal: false
  };

  componentDidShow() {
    this.loadData();
  }

  handleSubmit = () => {
    const { id } = this.$router.params;
    const { newRealName } = this.state;
    let params = {
      cuId: id
    };
    if (newRealName) {
      params.correctName = newRealName;
    }
    confirmBind(params).then(res => {
      Taro.navigateBack({
        delta: 1
      });
    });
  };

  handleOrderClick = id => {
    goTo("order-details", {
      id
    });
  };

  loadData = () => {
    const { id } = this.$router.params;
    getCuDetail({ cuId: id }).then(res => {
      this.setState({
        data: {
          ...res.data,
          avatarUrl: res.data.avatarUrl || defaultAvatarUrl
        }
      });
    });
  };

  handleNameClick = () => {
    this.setState({
      isOpenedModal: true
    });
  };

  confirmUpdateName = confirm => {
    if (!confirm) {
      this.setState({
        newRealName: ""
      });
    } else {
      this.setState({
        data: {
          ...this.state.data,
          realName: this.state.newRealName
        }
      });
    }
    this.setState({
      isOpenedModal: false
    });
  };

  openAvater = url => {
    Taro.previewImage({
      current: url,
      urls: [url]
    });
  };

  handleNameChange = value => {
    this.setState({
      newRealName: value
    });
  };

  render() {
    const { isNew } = this.$router.params;
    const { data, isOpenedModal, newRealName } = this.state;

    if (!data) {
      return null;
    }

    return (
      <View className="page owner-details__root bg-gray">
        <AtModal isOpened={isOpenedModal}>
          <AtModalHeader>提示</AtModalHeader>
          <AtModalContent>
            <View className="update-name__title">请修正车主姓名</View>
            <AtInput
              clear
              className="update-name__input no-border"
              value={newRealName}
              placeholder="绑定后不可更改"
              onChange={this.handleNameChange}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.confirmUpdateName.bind(this, false)}>
              取消
            </Button>
            <Button onClick={this.confirmUpdateName.bind(this, true)}>
              确定
            </Button>
          </AtModalAction>
        </AtModal>
        <View className="owner-details__content">
          <View className="card card__has-avatar">
            <UserPanelAvatar
              imageUrl={userInfo.avatarUrl}
              onClick={this.handleAvatarChange}
            />
            <AtList className="no-border">
              <AtListItem
                title="姓名"
                extraText={data.realName}
                arrow={isNew ? "right" : ""}
                onClick={isNew ? this.handleNameClick : loop}
              />
              <AtListItem
                title="性别"
                extraText={getOptionLabel("genders", data.gender)}
              />
              <AtListItem title="手机号" extraText={data.phone} />
              <AtListItem title="生日" extraText={data.birthday} />
              <AtListItem title="爱好" extraText={data.hobby} />
              <AtListItem
                title="地区"
                extraText={getCityName(data.city, data.province)}
              />
              <AtListItem
                title="所有车辆"
                extraText={`${data.carCount}辆`}
                className="no-border"
              />
              <View className="owner-details__car-list">
                {data.carList.map(car => (
                  <View
                    key={car.carId}
                    className="owner-details__car-list-item"
                  >
                    <View className="at-row">
                      <View className="at-col at-col-4">车型</View>
                      <View className="at-col">{car.carName}</View>
                    </View>
                    <View className="at-row">
                      <View className="at-col at-col-4">购车时间</View>
                      <View className="at-col">{car.buyTime} 年</View>
                    </View>
                    <View className="at-row">
                      <View className="at-col at-col-4">车架VIN码</View>
                      <View className="at-col">{car.vinCode}</View>
                    </View>
                  </View>
                ))}
              </View>
            </AtList>
          </View>
          <AtList className="owner-details__order-list">
            <AtListItem
              title="订单信息"
              extraText={`已发生${data.orderList.length}笔业务`}
              className="no-border"
            />
            <View>
              {data.orderList.map(order => (
                <View
                  key={order.orderId}
                  className="owner-details__order-list-item"
                  onClick={this.handleOrderClick.bind(this, order.id)}
                >
                  <View className="at-row">
                    <View className="at-col">{order.createTime}</View>
                    <View className="at-col at-col-3">
                      {order.orderTypeName}
                    </View>
                    <View className="at-col at-col-2">
                      {order.orderStatusName}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </AtList>
        </View>

        <View className="next-button-wrap">
          {isNew === "1" && (
            <AtButton
              className="btn-lg btn-primary"
              type="primary"
              onClick={this.handleSubmit}
            >
              确认绑定
            </AtButton>
          )}
        </View>
      </View>
    );
  }
}
