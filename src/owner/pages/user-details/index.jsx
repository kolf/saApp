import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button, Swiper, SwiperItem } from "@tarojs/components";
import {
  AtButton,
  AtList,
  AtIcon,
  AtListItem,
  AtInput,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "@/npm/taro-ui/dist";
import "./index.scss";

import UserPanelAvatar from "@/components/user-panel-avatar";
import SwiperDot from "@/components/swiper-dot";
import Modal from "@/components/modal";
import { getCuDetail, confirmBind } from "@/servers/apis";
import { getOptionLabel } from "@/utils/options";
import { getCityName, goTo } from "@/utils";

function loop(e) {
  e.stopPropagation();
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: "客户详情"
  };

  state = {
    data: null,
    newRealName: "",
    currentCarIndex: 0,
    isOpenedModal: false
  };

  componentDidMount() {
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
    goTo("/pages/order-details", {
      id
    });
  };

  loadData = () => {
    const { id } = this.$router.params;
    getCuDetail({ cuId: id }).then(res => {
      this.setState({
        data: {
          ...res.data,
          avatarUrl: res.data.avatarUrl
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

  swiperCarList = e => {
    this.setState({
      currentCarIndex: e.target.current
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
      <View className="page user-details__root bg-gray">
        {isOpenedModal && (
          <Modal
            title="提示"
            onOk={this.confirmUpdateName.bind(this, true)}
            onCancel={this.confirmUpdateName.bind(this, false)}
          >
            <View className="update-name__title">请修正车主姓名</View>
            <AtInput
              clear
              className="update-name__input no-border"
              value={newRealName}
              placeholder="绑定后不可更改"
              onChange={this.handleNameChange}
            />
          </Modal>
        )}

        <View className="user-details__content">
          <View className="card card__has-avatar">
            <UserPanelAvatar imageUrl={data.avatarUrl} />
            <AtList hasBorder={false}>
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
              {data.carList.length > 0 && (
                <View className="car-list">
                  <View className="car-list__body">
                    <Swiper
                      className="car-list__swiper"
                      style={{ height: "160rpx" }}
                      onChange={this.swiperCarList}
                    >
                      {data.carList.map(item => (
                        <SwiperItem key={item.carId} className="car-item">
                          <View className="car-item__name">
                            {item.carName || "汽车"}
                          </View>
                          <View style={{ paddingBottom: "12rpx" }}>
                            购车时间: {item.buyTime}
                          </View>
                          <View>车辆VIN码: {item.vinCode}</View>
                        </SwiperItem>
                      ))}
                    </Swiper>
                  </View>
                  <View className="car-list__footer">
                    <SwiperDot
                      size={data.carList.length}
                      current={this.state.currentCarIndex}
                    />
                  </View>
                </View>
              )}
            </AtList>
          </View>
          <View className="card">
            <AtList className="user-details__order-list">
              <AtListItem
                title="订单信息"
                extraText={`已发生${data.orderList.length}笔业务`}
                className="no-border"
              />

              {data.orderList.map(order => (
                <View
                  key={order.orderId}
                  className="user-details__order-list-item"
                  onClick={this.handleOrderClick.bind(this, order.id)}
                >
                  <View className="at-row">
                    <View className="at-col">{order.createTime}</View>
                    <View className="at-col at-col-3">
                      {order.orderTypeName}
                    </View>
                    <View className="at-col at-col-2">
                      {order.orderStatusName} <AtIcon value="chevron-right" />
                    </View>
                  </View>
                </View>
              ))}
            </AtList>
          </View>
        </View>

        {isNew === "1" && (
          <View className="next-button-wrap">
            <AtButton
              className="btn-lg btn-primary"
              type="primary"
              onClick={this.handleSubmit}
            >
              确认绑定
            </AtButton>
          </View>
        )}
      </View>
    );
  }
}
