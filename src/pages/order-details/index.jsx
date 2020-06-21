import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker, Text } from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtButton,
  AtImagePicker,
  AtTextarea,
  AtActivityIndicator,
  AtIcon,
  AtInput
} from "@/npm/taro-ui/dist";
import SelectAdviser from "@/components/select-adviser";
import KCheckbox from "@/components/checkbox";
import RadioXS from "@/components/x-radio";
import OrderArrow from "./OrderArrow";
import { goTo, getDownTime } from "@/utils";
import storage from "@/utils/storage";
import modal from "@/utils/modal";
import { isPhone } from "@/utils/validator";
import {
  getOrder,
  setEcOrderComplete,
  uploadAcCard,
  setOrderTransfer,
  customerTestDrive,
  getCarTypeList,
  setTimeoutReason,
  getVinCodeByImg
} from "@/servers/apis";
import getBaseUrl from "@/servers/baseUrl";

import "./index.scss";

let height = 960;
try {
  const res = Taro.getSystemInfoSync();
  height = res.windowHeight * (750 / res.windowWidth) - 180;
} catch (e) {
  // Do something when catch error
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: "订单详情"
  };

  state = {
    current: -1,
    isFetching: true,
    confirmLoading: false,
    customer: {},
    fawDistributor: {},
    fawOrder: {},
    fawOrderForwards: [{}, {}],
    fawOrderItem: {},
    intentionCar: {},
    assessmentCar: {},
    orderTimeDTO: {},
    zhxcFawOrderDTO: {},
    escFiles: [],
    aCardFiles: [],
    cCardFiles: [],
    cars: [],
    updateFiles: [],
    hasReplacementOrder: "0",
    carOptions: [],
    selectCarIndex: -1,
    timeoutReason: "",
    orderResult: "1",
    orderResultSeason: "",
    downTime: [],
    vinData: {},
    selectedUserId: "",
    testDriveFlag: 1
  };

  timer = null;

  componentDidMount() {
    this.orderId = this.$router.params.id;
    this.loadData();
    this.loadCarData();
  }

  componentDidShow() {
    this.setState({
      userType: storage.get("userInfo").type
    });
  }

  selectReplaceMentOrder = value => {
    this.setState({
      hasReplacementOrder: value
    });
  };

  handleOrderResultChange = value => {
    if (value === "0") {
      this.setState({
        updateFiles: []
      });
    } else if (value === "1") {
      this.setState({
        orderResultSeason: ""
      });
    }
    this.setState({
      orderResult: value
    });
  };

  handleFileChange = files => {
    this.setState({
      updateFiles: files.filter((f, index) => index < 2)
    });
  };

  uploadAllFile = () =>
    new Promise((resolve, reject) => {
      Taro.showLoading({
        title: "上传图片中..."
      });
      const JSESSIONID = storage.get("JSESSIONID");
      const { updateFiles } = this.state;
      let successFileIds = [];
      let error = null;
      for (let file of updateFiles) {
        Taro.uploadFile({
          url: getBaseUrl("/api/v1/") + "/api/v1/base/pubUpload",
          filePath: file.url,
          name: "file",
          header: {
            Cookie: JSESSIONID ? `SESSION=${JSESSIONID}` : null
          },
          complete: res => {
            const data = JSON.parse(res.data);
            if (data.code === 200) {
              const fileObj = data.data;
              if (fileObj) {
                successFileIds.push(fileObj.id);
              }
            } else {
              error = res;
              Taro.hideLoading();
              modal({
                content: data.message
              });

              reject(error);
            }
            if (successFileIds.length === updateFiles.length) {
              Taro.hideLoading();
              resolve(successFileIds);
            }
          }
        });
      }
    });

  handleTimeoutReasonChange = e => {
    this.setState({
      timeoutReason: e
    });
  };

  handleOrderResultSeasonChange = e => {
    this.setState({
      orderResultSeason: e
    });
  };

  handleCarSelect = e => {
    this.setState({
      selectCarIndex: e.target.value
    });
  };

  loadData = () => {
    this.setState({
      isFetching: true
    });

    getOrder({ orderId: this.orderId }).then(res => {
      // console.log(res, "res");
      this.setState(
        {
          isFetching: false,
          ...res.data
        },
        () => {
          this.startDownTime();
        }
      );
    });
  };

  onPreviewImage = (iamges, image) => {
    Taro.previewImage({
      urls: iamges.map(f => f.fileUrl),
      current: image.fileUrl
    });
  };

  getStartTime = () => {
    const {
      fawOrder: { processStatus },
      orderTimeDTO
    } = this.state;
    let startTime = "";
    if (processStatus === "WAIT_SA") {
      startTime = orderTimeDTO.orderCreateTime;
    } else if (processStatus === "WAIT_ESC") {
      startTime = orderTimeDTO.saTransferTime;
    } else if (processStatus === "WAIT_XS_A_CARD") {
      startTime =
        orderTimeDTO.escCompletionTime ||
        orderTimeDTO.saTransferTime ||
        orderTimeDTO.orderCreateTime;
    } else if (processStatus === "WAIT_XS_C_CARD") {
      startTime = orderTimeDTO.xsAcceptTime;
    }
    return startTime;
  };

  startDownTime = () => {
    const startTime = this.getStartTime();
    this.setState({
      downTime: getDownTime(startTime)
    });
    this.timer = setInterval(() => {
      this.setState({
        downTime: getDownTime(startTime)
      });
    }, 1000);
  };

  loadCarData = () => {
    getCarTypeList().then(res => {
      this.setState({
        carOptions: res.data.map(item => ({
          label: item.carName,
          value: item.id
        }))
      });
    });
    customerTestDrive({ orderId: this.orderId }).then(res => {
      this.setState({
        testDriveFlag: res.data
      });
    });
  };

  checkVinData = () => {
    const { phone, vinCode, releaseDate, buyName } = this.state.vinData;

    if (!buyName) {
      modal({
        content: "请填写购车人姓名或行驶证扫描"
      });
      return false;
    }
    if (!/^[A-Z0-9]{17}$/g.test(vinCode)) {
      modal({
        content: "请填写17位VIN码或行驶证扫描"
      });
      return false;
    }

    if (!phone) {
      modal({
        content: "请填写购车人11位手机号"
      });
      return false;
    }
    if (!isPhone(phone)) {
      modal({
        content: "请填写正确的手机号"
      });
      return false;
    }

    if (!releaseDate) {
      modal({
        content: "请填写上牌时间或行驶证扫描"
      });
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
      modal({
        content: "请填写正确的上牌时间"
      });
      return false;
    }
    return true;
  };

  handleUploadAcCard = async cardType => {
    const {
      updateFiles,
      orderResult,
      orderResultSeason,
      timeoutReason,
      fawOrder,
      vinData
    } = this.state;

    let newParams = {};

    if (cardType === "A") {
      if (updateFiles.length === 0) {
        modal({
          content: "请上传图片"
        });
        return;
      }
    } else if (cardType === "C") {
      if (orderResult === "1") {
        if (!this.checkVinData()) {
          return;
        }

        newParams = {
          ...vinData
        };
      } else if (orderResult === "0") {
        if (!orderResultSeason) {
          modal({
            content: "请填写未成交原因"
          });
          return;
        }
        newParams.orderResultSeason = orderResultSeason;
      }

      newParams.orderResult = orderResult;
    }

    if (cardType === "A" && fawOrder.timeoutFlag === 1 && !timeoutReason) {
      modal({
        content: "请填写超时理由"
      });
      return;
    }

    if (cardType === "A") {
      const successFileIds = await this.uploadAllFile();

      if (successFileIds.length === 0) {
        modal({
          content: "图片上传失败"
        });
        return;
      }

      newParams.fileAcCardIds = successFileIds.join(",");
    }

    const _this = this;
    if (cardType === "A") {
      modal({
        title: "确认并继续跟进",
        content:
          "请继续跟进订单，同时请邀约用户进行试驾，并在试驾系统中及时完善预约试驾信息，以免在订单成交后影响您获取最终奖励。"
      }).then(res => {
        if (!res.confirm) {
          return false;
        }
        onOK();
      });
    } else if (cardType === "C") {
      if (this.state.testDriveFlag === 1) {
        onOK();
        return;
      }
      modal({
        title: "用户未试驾",
        content: "未查询到该用户的试驾信息，是否继续提交订单"
      }).then(res => {
        if (!res.confirm) {
          customerTestDrive({ orderId: this.orderId }).then(res => {
            this.setState({
              testDriveFlag: res.data
            });
          });
        } else {
          newParams.testDriveFlag = this.state.testDriveFlag;
          onOK();
        }
      });
    }

    function onOK() {
      _this.setState({
        confirmLoading: true
      });

      uploadAcCard({
        orderId: _this.orderId,
        cardType,
        ...newParams
      }).then(async res => {
        if (res.code !== 200) {
          _this.setState({
            confirmLoading: false
          });
          modal({
            title: res.message
          });
          return;
        }
        const res1 = await setTimeoutReason({
          orderId: _this.orderId,
          timeoutReason
        });
        Taro.navigateBack({
          delta: 1
        });
      });
    }
  };

  updateVinCode = e => {
    const JSESSIONID = storage.get("JSESSIONID");
    Taro.chooseImage({
      number: 1,
      success: res => {
        Taro.showLoading({
          title: "VIN码识别中..."
        });
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: getBaseUrl("/api/") + "/api/v1/base/pubUpload",
          filePath: tempFilePaths[0],
          name: "file",
          header: {
            Cookie: JSESSIONID ? `SESSION=${JSESSIONID}` : null
          },
          success: async res => {
            try {
              const fileId = JSON.parse(res.data).data.id;
              const res1 = await getVinCodeByImg({ fileId });
              const { releaseDate, vinCode, carOwner } = res1.data;
              this.setState({
                vinData: {
                  ...this.state.vinData,
                  releaseDate,
                  vinCode,
                  buyName: carOwner
                }
              });
              Taro.hideLoading();
            } catch (error) {
              Taro.hideLoading();
            }
          },
          error() {
            Taro.hideLoading();
          }
        });
      }
    });
  };

  handleOrderTransfer = () => {
    this.setState({
      confirmLoading: true
    });
    const { selectedUserId } = this.state;
    setOrderTransfer({
      orderId: this.orderId,
      userId: selectedUserId
    }).then(res => {
      this.setState({
        confirmLoading: false
      });

      Taro.navigateBack({
        delta: 1
      });
    });
  };

  handleEcOrderComplete = async () => {
    const {
      hasReplacementOrder,
      updateFiles,
      selectCarIndex,
      carOptions,
      selectedUserId,
      fawOrder,
      timeoutReason
    } = this.state;

    if (updateFiles.length === 0) {
      modal({
        content: "请上传图片"
      });
      return;
    }

    if (hasReplacementOrder === "1") {
      if (!selectedUserId) {
        modal({
          content: "请选择服务顾问"
        });
        return;
      }
      if (!selectCarIndex) {
        modal({
          content: "请选择意向车型"
        });
        return;
      }
    }

    const successFileIds = await this.uploadAllFile();

    if (successFileIds.length === 0) {
      modal({
        content: "图片上传失败"
      });
      return;
    }

    if (fawOrder.timeoutFlag === 1 && !timeoutReason) {
      modal({
        content: "请填写超时理由"
      });
      return;
    }

    this.setState({
      confirmLoading: true
    });
    setEcOrderComplete({
      orderId: this.orderId,
      fileIds: successFileIds.join(","),
      hasReplacementOrder,
      intentionCarId:
        hasReplacementOrder === "1" ? carOptions[selectCarIndex].value : "",
      xsId: hasReplacementOrder === "1" ? selectedUserId : ""
    }).then(async res => {
      const res1 = await setTimeoutReason({
        orderId: this.orderId,
        timeoutReason
      });

      this.setState({
        confirmLoading: false
      });

      Taro.navigateBack({
        delta: 1
      });
    });
  };

  // renderStatusImage = ()
  getStatusUrl = order => {
    if (!order) {
      return null;
    }
    if (order.orderType === 1 && order.orderStatus >= 2) {
      return statusUrlMap[14];
    } else if (order.orderResult === 1) {
      return statusUrlMap[11];
    } else if (order.orderResult === 0) {
      return statusUrlMap[7];
    } else if (
      order.timeoutFlag === 1 &&
      order.processStatus !== "WAIT_XS_C_CARD"
    ) {
      return statusUrlMap[9];
    } else {
      return statusUrlMap[10];
    }
  };

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  getTabList = () => {
    const {
      userType,
      fawOrder,
      fawOrderItem,
      escFawOrderDTO,
      zhxcFawOrderDTO,
      escFiles,
      aCardFiles,
      cCardFiles
    } = this.state;
    const userOrderStatus = `${userType}_${fawOrder.orderType}_${fawOrder.orderStatus}`;

    return [
      {
        title: "受理人选择",
        icon: "user-note",
        show:
          fawOrder.processStatus === "WAIT_SA" &&
          /^FW_[1234]_1/g.test(userOrderStatus)
      },
      {
        title: "评估信息",
        icon: "search-text",
        show: /^ESC_1_1/g.test(userOrderStatus)
      },
      {
        title: "A卡信息",
        icon: "pin",
        show:
          /^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_A_CARD"
      },
      {
        title: "A卡信息",
        icon: "pin",
        show:
          /^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_C_CARD"
      },
      {
        title: "C卡信息",
        icon: "fair",
        show:
          /^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_C_CARD"
      },
      { title: "客户信息", icon: "user" },
      {
        title: "被介绍人信息",
        icon: "users",
        show: /^(4)$/.test(fawOrder.orderType)
      },
      {
        title: "评估车辆信息",
        icon: "car",
        show: /^(1|2)$/.test(fawOrder.orderType)
      },
      {
        title: "关联订单", // 置换订单
        icon: "link",
        show: !!(
          escFawOrderDTO &&
          escFawOrderDTO.fawOrder &&
          /^(2)$/.test(fawOrder.orderType)
        )
      },
      {
        title: "关联订单", // 二手车订单
        icon: "link",
        show: !!(
          zhxcFawOrderDTO &&
          zhxcFawOrderDTO.fawOrder &&
          /^(1)$/.test(fawOrder.orderType)
        )
      },
      {
        title: "意向车型",
        icon: "faver",
        show: /^(2|3|4)$/.test(fawOrder.orderType)
      },
      { title: "经销店信息", icon: "shops" },
      { title: "服务订单信息", icon: "user-love" },
      {
        title: "评估单照片",
        icon: "calendar",
        show: escFiles.length > 0
      },
      {
        title: "A卡信息",
        icon: "pin",
        show:
          aCardFiles.length > 0 &&
          !(
            /^XS_[234]_1/g.test(userOrderStatus) &&
            fawOrder.processStatus === "WAIT_XS_C_CARD"
          )
      },
      { title: "C卡信息", icon: "fair", show: cCardFiles.length > 0 },
      {
        title: "超时理由",
        icon: "clock",
        show:
          fawOrder.timeoutFlag === 1 &&
          /^(ESC|XS)_[1234]_1/g.test(userOrderStatus) &&
          /^WAIT_(ESC|XS_A_CARD)/g.test(fawOrder.processStatus)
      },
      {
        title: "成交信息",
        icon: "note",
        show: fawOrderItem.checkPhone !== undefined
      },
      {
        title: "预约试驾",
        icon: "steering",
        show:
          /^(FW|XS|ESC|DZ)_[234]_[123]/g.test(userOrderStatus) &&
          /(WAIT_XS_C_CARD|FINISH)/g.test(fawOrder.processStatus)
      },
      {
        title: "订单是否有效",
        icon: "note-error",
        show: !!(
          (/^(FW|XS|DZ)_[234]_3/g.test(userOrderStatus) ||
            (zhxcFawOrderDTO && /^ESC_2_3/g.test(userOrderStatus))) &&
          fawOrder.orderResult === 1
        )
      }
    ].map((item, index) => ({ ...item, index }));
  };

  getAdviserUserType = () => {
    const orderType = this.state.fawOrder.orderType;
    if (orderType === 1) {
      return "ESC";
    }
    if (/^(3|4)$/.test(orderType)) {
      return "XS";
    }
  };

  handleUserSelect = selectedUserId => {
    this.setState({
      selectedUserId
    });
  };

  render() {
    const {
      current,
      customer,
      fawDistributor,
      fawOrder,
      assessmentCar,
      orderResult,
      aCardFiles,
      cCardFiles,
      cars,
      fawOrderItem,
      intentionCar,
      userType,
      selectedUserId,
      escFiles,
      orderTimeDTO,
      escFawOrderDTO,
      zhxcFawOrderDTO,
      fawOrderForwards,
      downTime,
      hasReplacementOrder,
      isFetching,
      confirmLoading
    } = this.state;

    if (isFetching) {
      return (
        <View className="page bg-gray">
          <AtActivityIndicator size={64} mode="center" content="加载中..." />
        </View>
      );
    }

    const allTab = this.getTabList();
    const tabList = allTab.filter(item => item.show !== false);
    const defaultCurrent = 0;
    const userOrderStatus = `${userType}_${fawOrder.orderType}_${fawOrder.orderStatus}`;
    const saUser = fawOrderForwards.find(f => f.positionName === "FW") || {};
    const escUser = fawOrderForwards.find(f => f.positionName === "ESC") || {};
    const xsUser = fawOrderForwards.find(f => f.positionName === "XS") || {};
    const hasFooter =
      (fawOrder.processStatus === "WAIT_SA" &&
        /^FW_[134]_1/.test(userOrderStatus)) ||
      /^ESC_1_1/g.test(userOrderStatus) ||
      (/^XS_[234]_1/g.test(userOrderStatus) &&
        /WAIT_XS_[AC]_CARD/.test(fawOrder.processStatus));

    return (
      <View className="page order-details__root">
        <View className="order-details__header border-bottom">
          <View className="order-details__header-name">
            {fawOrder.orderTypeName}
          </View>
          <View className="order-details__header-desc">
            {fawOrder.processStatusName}
          </View>
          {fawOrder.orderStatus != 3 ? (
            <View
              className="order-details__header-desc"
              style={{ marginTop: "12rpx" }}
            >
              已等待时间： {downTime[0]}天{downTime[1]}小时{downTime[2]}
              分钟{downTime[3]}秒
            </View>
          ) : (
            <View style={{ marginTop: "8rpx", marginLeft: "-22rpx" }}>
              {fawOrder.evaluationStatus === 1 ? (
                <AtButton
                  type="secondary"
                  size="small"
                  className="btn"
                  onClick={e => {
                    if (
                      /^DZ/.test(userType) &&
                      fawOrder.evaluationStatus === 1
                    ) {
                      goTo("/admin/pages/evaluation-details", {
                        orderId: fawOrder.id
                      });
                    }
                  }}
                >
                  已评价
                </AtButton>
              ) : (
                <AtButton
                  type="secondary"
                  size="small"
                  className="btn"
                  disabled={fawOrder.evaluationStatus !== 1}
                >
                  未评价
                </AtButton>
              )}
            </View>
          )}

          <OrderArrow
            orderType={fawOrder.orderType}
            orderStatus={fawOrder.orderStatus}
            orderResult={fawOrder.orderResult}
            timeoutFlag={fawOrder.timeoutFlag}
            processStatus={fawOrder.processStatus}
          />
        </View>
        <View className="page-content">
          <AtTabs
            animated={false}
            current={current === -1 ? defaultCurrent : current}
            className="order-details__tabs"
            scroll
            height={(hasFooter ? height - 180 : height) + "rpx"}
            tabDirection="vertical"
            tabList={tabList}
            onClick={this.handleClick.bind(this)}
          >
            {allTab[0].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[0].icon}
                      size={20}
                    />
                    {fawOrder.orderType === 1 ? "二手车" : "销售"}顾问
                  </View>
                  <View className="order-details__panel-content">
                    <SelectAdviser
                      userType={this.getAdviserUserType()}
                      onChange={this.handleUserSelect}
                    />
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[1].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[1].icon}
                      size={20}
                    />
                    评估信息
                  </View>
                  <View className="order-details__panel-hr" />
                  <View className="order-details__panel-content">
                    <View className="block">
                      <View className="order-details__panel-h3">
                        请上传评估单照片
                        <Text className="text-error">
                          *(至少一张，用户不可见)
                        </Text>
                      </View>
                      <View className="order-details__panel-desc">
                        <AtImagePicker
                          sizeType={["compressed"]}
                          className="image-picker"
                          files={this.state.updateFiles}
                          onChange={this.handleFileChange}
                          multiple
                          showAddBtn={this.state.updateFiles.length < 2}
                          length={3}
                        />
                      </View>
                      <View className="order-details__panel-h3">
                        请选择本次工作完成情况
                      </View>
                      <View className="order-details__panel-h3">
                        <KCheckbox
                          onClick={this.selectReplaceMentOrder.bind(this, "0")}
                          checked={hasReplacementOrder === "0"}
                        >
                          车主没有置换需求
                        </KCheckbox>
                      </View>
                      <View className="order-details__panel-h3">
                        <KCheckbox
                          onClick={this.selectReplaceMentOrder.bind(this, "1")}
                          checked={hasReplacementOrder === "1"}
                        >
                          车主有置换需求
                        </KCheckbox>
                      </View>
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[2].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[2].icon}
                      size={20}
                    />
                    A卡信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    {/^XS_[234]_1/g.test(userOrderStatus) &&
                      fawOrder.processStatus === "WAIT_XS_A_CARD" && (
                        <View className="block">
                          <View className="order-details__panel-h3">
                            请上传A卡照片
                            <Text className="text-error">
                              *(至少一张，用户不可见)
                            </Text>
                          </View>
                          <View className="order-details__panel-desc">
                            <AtImagePicker
                              sizeType={["compressed"]}
                              className="image-picker"
                              files={this.state.updateFiles}
                              onChange={this.handleFileChange}
                              showAddBtn={this.state.updateFiles.length < 2}
                              length={3}
                            />
                          </View>
                        </View>
                      )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[3].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[14].icon}
                      size={20}
                    />
                    A卡信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">A卡照片</View>
                    <View className="order-details__panel-desc">
                      <View className="at-row image-list">
                        {aCardFiles.map(f => (
                          <View
                            key={f.id}
                            className="image-list-item"
                            onClick={this.onPreviewImage.bind(
                              this,
                              aCardFiles,
                              f
                            )}
                          >
                            <Image
                              className="img"
                              src={f.fileUrl}
                              mode="aspectFill"
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                    {fawOrder.timeoutFlag === 1 && xsUser.timeoutReason && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          A卡上传工作是否超时：
                          <Text className="text-error">*(用户不可见）</Text>
                        </View>
                        <View className="order-details__panel-desc">
                          <AtTextarea
                            disabled
                            className="textarea no-border"
                            value={xsUser.timeoutReason}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[4].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[4].icon}
                      size={20}
                    />
                    C卡信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">
                      请选择本次工作完成情况
                    </View>
                    <View
                      className="order-details__panel-h3"
                      style={{ margin: "24rpx 0" }}
                    >
                      <KCheckbox
                        onClick={this.handleOrderResultChange.bind(this, "1")}
                        checked={orderResult === "1"}
                      >
                        成交：请提交成交车主、车辆信息
                      </KCheckbox>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtButton type="secondary" onClick={this.updateVinCode}>
                        扫描行驶证信息
                      </AtButton>
                    </View>
                    <View className="order-details__panel-h3">
                      购车人姓名<Text className="text-error">* </Text>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtInput
                        placeholder="请填写购车人姓名或行驶证扫描"
                        className="input border-bottom"
                        value={this.state.vinData.buyName}
                        onChange={e =>
                          this.setState({
                            vinData: {
                              ...this.state.vinData,
                              buyName: e
                            }
                          })
                        }
                      />
                    </View>
                    <View className="order-details__panel-h3">
                      车辆VIN码<Text className="text-error">* </Text>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtInput
                        placeholder="请填写17位VIN码或行驶证扫描"
                        className="input border-bottom"
                        value={this.state.vinData.vinCode}
                        length={17}
                        onChange={e => {
                          const nextValue = e
                            .replace(/[\W\s]+/g, "")
                            .substr(0, 17)
                            .toUpperCase();
                          this.setState({
                            vinData: {
                              ...this.state.vinData,
                              vinCode: nextValue
                            }
                          });
                          return nextValue;
                        }}
                      />
                    </View>
                    <View className="order-details__panel-h3">
                      上牌时间<Text className="text-error">* </Text>
                    </View>
                    <View className="order-details__panel-desc">
                      <Picker
                        mode="date"
                        onChange={e => {
                          this.setState({
                            vinData: {
                              ...this.state.vinData,
                              releaseDate: e.target.value
                            }
                          });
                        }}
                      >
                        <View className="input--text border-bottom">
                          {this.state.vinData.releaseDate || (
                            <Text className="input--placeholder">
                              请填写上牌时间或行驶证扫描
                            </Text>
                          )}
                        </View>
                      </Picker>
                    </View>
                    <View
                      className="order-details__panel-desc"
                      style={{ marginTop: "16rpx" }}
                    >
                      <Text className="text-error">
                        注：以上获取信息有误，可手动录入或修改
                      </Text>
                    </View>
                    <View className="order-details__panel-h3">
                      请手动填写购车人手机号
                      <Text className="text-error">* </Text>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtInput
                        placeholder="请填写购车人11位手机号"
                        className="input border-bottom"
                        value={this.state.vinData.phone}
                        length={11}
                        type="number"
                        onChange={e =>
                          this.setState({
                            vinData: {
                              ...this.state.vinData,
                              phone: e
                            }
                          })
                        }
                      />
                    </View>
                    <View
                      className="order-details__panel-desc"
                      style={{ marginTop: "16rpx" }}
                    >
                      <Text className="text-error">
                        注：请核对订单发起人或被介绍人的手机号后填写
                      </Text>
                    </View>
                    <View className="order-details__panel-h3">
                      <KCheckbox
                        onClick={this.handleOrderResultChange.bind(this, "0")}
                        checked={orderResult === "0"}
                      >
                        未成交
                      </KCheckbox>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtTextarea
                        disabled={orderResult === "1"}
                        placeholder="请填写未成交原因，限200字"
                        className="textarea no-border"
                        maxLength={200}
                        value={this.state.orderResultSeason}
                        onChange={this.handleOrderResultSeasonChange}
                      />
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[5].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[5].icon}
                      size={20}
                    />
                    客户信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">姓名：</View>
                    <View className="order-details__panel-desc">
                      {customer.realName}
                    </View>
                    <View className="order-details__panel-h3">性别：</View>
                    <View className="order-details__panel-desc">
                      {customer.genderName}
                    </View>
                    <View className="order-details__panel-h3">手机号码：</View>
                    <View className="order-details__panel-desc">
                      {customer.phone}
                    </View>
                    <View className="order-details__panel-h3">所有车辆：</View>
                    <View className="order-details__panel-desc">
                      {cars.length > 0
                        ? cars.map(c => c.carName).join(",")
                        : "无"}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[6].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[6].icon}
                      size={20}
                    />
                    被介绍人信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">
                      被介绍人姓名：
                    </View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.realName}
                    </View>
                    <View className="order-details__panel-h3">
                      被介绍人手机号码：
                    </View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.phone}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[7].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[7].icon}
                      size={20}
                    />
                    评估车辆信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">车型：</View>
                    <View className="order-details__panel-desc">
                      {assessmentCar.carName}
                    </View>
                    <View className="order-details__panel-h3">购车时间：</View>
                    <View className="order-details__panel-desc">
                      {assessmentCar.buyTime} 年
                    </View>
                    <View className="order-details__panel-h3">
                      车架号VIN码：
                    </View>
                    <View className="order-details__panel-desc">
                      {assessmentCar.vinCode}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[8].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View
                    className="order-details__panel-heading"
                    onClick={e =>
                      goTo("/pages/order-details", {
                        id: escFawOrderDTO.fawOrder.id
                      })
                    }
                  >
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[8].icon}
                      size={20}
                    />
                    关联的二手车订单信息
                    <AtIcon
                      value="chevron-right"
                      className="order-details__panel-arrow"
                    />
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">订单类别：</View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.fawOrder.orderTypeName}
                    </View>
                    <View className="order-details__panel-h3">订单号：</View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.fawOrder.orderNo}
                    </View>
                    <View className="order-details__panel-h3">
                      服务申请提交时间：
                    </View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.fawOrder.createTime}
                    </View>
                    <View className="order-details__panel-h3">
                      服务顾问转发时间：
                    </View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.orderTimeDTO.saTransferTime ||
                        escFawOrderDTO.fawOrder.createTime}
                    </View>
                    <View className="order-details__panel-h3">服务顾问：</View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.fawOrderForwards[0].adviserRealName}
                    </View>
                    <View className="order-details__panel-h3">
                      服务顾问手机号：
                    </View>
                    <View className="order-details__panel-desc">
                      {escFawOrderDTO.fawOrderForwards[0].phone}
                    </View>

                    {escFawOrderDTO.fawOrderForwards[1] && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          评估服务完成时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {escFawOrderDTO.orderTimeDTO.escCompletionTime}
                        </View>
                        <View className="order-details__panel-h3">
                          二手车顾问：
                        </View>
                        <View className="order-details__panel-desc">
                          {escFawOrderDTO.fawOrderForwards[1].adviserRealName}
                        </View>
                        <View className="order-details__panel-h3">
                          二手车顾问手机号：
                        </View>
                        <View className="order-details__panel-desc">
                          {escFawOrderDTO.fawOrderForwards[1].phone}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[9].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View
                    className="order-details__panel-heading"
                    onClick={e =>
                      goTo("/pages/order-details", {
                        id: zhxcFawOrderDTO.fawOrder.id
                      })
                    }
                  >
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[9].icon}
                      size={20}
                    />
                    关联的置换订单
                    <AtIcon
                      value="chevron-right"
                      className="order-details__panel-arrow"
                    />
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">订单号：</View>
                    <View className="order-details__panel-desc">
                      {zhxcFawOrderDTO.fawOrder.orderNo}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[10].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[10].icon}
                      size={20}
                    />
                    意向车型
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">意向车型：</View>
                    <View className="order-details__panel-desc">
                      {intentionCar.carName}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[11].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[11].icon}
                      size={20}
                    />
                    {fawDistributor.name}
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">地址：</View>
                    <View className="order-details__panel-desc">
                      {fawDistributor.address}
                    </View>
                    <View className="order-details__panel-h3">服务热线：</View>
                    <View className="order-details__panel-desc">
                      {fawDistributor.serviceHotline}
                    </View>
                    {!escFawOrderDTO && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          服务顾问：
                        </View>
                        <View className="order-details__panel-desc">
                          {saUser.adviserRealName}
                        </View>
                        <View className="order-details__panel-h3">
                          服务顾问手机号：
                        </View>
                        <View className="order-details__panel-desc">
                          {saUser.phone}
                        </View>
                      </View>
                    )}
                    {escUser.phone && /^[12]/g.test(fawOrder.orderType) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          二手车顾问：
                        </View>
                        <View className="order-details__panel-desc">
                          {escUser.adviserRealName}
                        </View>
                        <View className="order-details__panel-h3">
                          二手车顾问手机号：
                        </View>
                        <View className="order-details__panel-desc">
                          {escUser.phone}
                        </View>
                      </View>
                    )}
                    {xsUser.phone && /^[234]/g.test(fawOrder.orderType) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          销售顾问：
                        </View>
                        <View className="order-details__panel-desc">
                          {xsUser.adviserRealName}
                        </View>
                        <View className="order-details__panel-h3">
                          销售顾问手机号：
                        </View>
                        <View className="order-details__panel-desc">
                          {xsUser.phone}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[12].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[12].icon}
                      size={20}
                    />
                    服务订单信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">订单类别：</View>
                    <View className="order-details__panel-desc">
                      {fawOrder.orderTypeName}
                    </View>
                    <View className="order-details__panel-h3">订单号：</View>
                    <View className="order-details__panel-desc">
                      {fawOrder.orderNo}
                    </View>
                    <View className="order-details__panel-h3">
                      服务申请提交时间：
                    </View>
                    <View className="order-details__panel-desc">
                      {orderTimeDTO.orderCreateTime}
                    </View>
                    {/^[134]/g.test(fawOrder.orderType) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          服务顾问转发时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {orderTimeDTO.saTransferTime || "---- -- -- --:--:--"}
                        </View>
                      </View>
                    )}
                    {/^[1]/g.test(fawOrder.orderType) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          二手车顾问完成时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {orderTimeDTO.escCompletionTime ||
                            "---- -- -- --:--:--"}
                        </View>
                      </View>
                    )}
                    {(/^[234]/g.test(fawOrder.orderType) || escFawOrderDTO) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          销售顾问受理时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {orderTimeDTO.xsAcceptTime || "---- -- -- --:--:--"}
                        </View>
                      </View>
                    )}

                    {(/^[234]/g.test(fawOrder.orderType) || escFawOrderDTO) && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          销售顾问完成时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {orderTimeDTO.xsAcceptTime || "---- -- -- --:--:--"}
                        </View>
                      </View>
                    )}

                    {orderTimeDTO.orderCompletionTime && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          订单完成时间：
                        </View>
                        <View className="order-details__panel-desc">
                          {orderTimeDTO.orderCompletionTime}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[13].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[13].icon}
                      size={20}
                    />
                    评估单照片
                    <Text className="text-error">*(用户不可见）</Text>
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">评估单照片</View>
                    <View className="order-details__panel-desc">
                      <View className="at-row image-list">
                        {escFiles.map(f => (
                          <View
                            key={f.id}
                            className="image-list-item"
                            onClick={this.onPreviewImage.bind(
                              this,
                              escFiles,
                              f
                            )}
                          >
                            <Image
                              className="img"
                              src={f.fileUrl}
                              mode="aspectFill"
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                    {fawOrder.timeoutFlag === 1 && escUser.timeoutReason && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          评估工作是否超时：
                          <Text className="text-error">*(用户不可见）</Text>
                        </View>
                        <View className="order-details__panel-desc">
                          <AtTextarea
                            disabled
                            className="textarea no-border"
                            value={escUser.timeoutReason}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[14].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[14].icon}
                      size={20}
                    />
                    A卡信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">A卡照片</View>
                    <View className="order-details__panel-desc">
                      <View className="at-row image-list">
                        {aCardFiles.map(f => (
                          <View
                            key={f.id}
                            className="image-list-item"
                            onClick={this.onPreviewImage.bind(
                              this,
                              aCardFiles,
                              f
                            )}
                          >
                            <Image
                              className="img"
                              src={f.fileUrl}
                              mode="aspectFill"
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                    {fawOrder.timeoutFlag === 1 && xsUser.timeoutReason && (
                      <View className="block">
                        <View className="order-details__panel-h3">
                          A卡上传工作是否超时：
                          <Text className="text-error">*(用户不可见）</Text>
                        </View>
                        <View className="order-details__panel-desc">
                          <AtTextarea
                            disabled
                            className="textarea no-border"
                            value={xsUser.timeoutReason}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[15].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[15].icon}
                      size={20}
                    />
                    C卡信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">C卡照片</View>
                    <View className="order-details__panel-desc">
                      <View className="at-row image-list">
                        {cCardFiles.map(f => (
                          <View
                            key={f.id}
                            className="image-list-item"
                            onClick={this.onPreviewImage.bind(
                              this,
                              cCardFiles,
                              f
                            )}
                          >
                            <Image
                              className="img"
                              src={f.fileUrl}
                              mode="aspectFill"
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[16].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[16].icon}
                      size={20}
                    />
                    超时理由
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">
                      请填写超时理由
                      <Text className="text-error">*(用户不可见）</Text>
                    </View>
                    <View className="order-details__panel-desc">
                      <AtTextarea
                        placeholder="请填写超时理由，限200字内"
                        className="textarea no-border"
                        maxLength={200}
                        value={this.state.timeoutReason}
                        onChange={this.handleTimeoutReasonChange}
                      />
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[17].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[17].icon}
                      size={20}
                    />
                    成交信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">
                      购车人姓名：
                    </View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.buyName}
                    </View>
                    <View className="order-details__panel-h3">
                      购车人手机号：
                    </View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.checkPhone}
                    </View>
                    <View className="order-details__panel-h3">车辆VIN码：</View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.vinCode}
                    </View>
                    <View className="order-details__panel-h3">上牌时间：</View>
                    <View className="order-details__panel-desc">
                      {fawOrderItem.releaseDate
                        ? fawOrderItem.releaseDate.substr(0, 10)
                        : "----:--:--"}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[18].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[18].icon}
                      size={20}
                    />
                    试驾信息
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">预约试驾：</View>
                    <View className="order-details__panel-desc">
                      {this.state.testDriveFlag === 1 ? "已试驾" : "未试驾"}
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
            {allTab[19].show !== false && (
              <AtTabsPane tabDirection="vertical" current={current}>
                <View className="order-details__panel">
                  <View className="order-details__panel-heading">
                    <AtIcon
                      prefixClass="iconfont"
                      value={allTab[19].icon}
                      size={20}
                    />
                    订单是否有效
                  </View>
                  <View className="order-details__panel-hr"></View>
                  <View className="order-details__panel-content">
                    <View className="order-details__panel-h3">
                      订单是否有效：
                    </View>
                    <View className="order-details__panel-desc">
                      {fawOrder.orderEffectiveness === 1 ? "有效" : "无效"}
                    </View>
                    <View className="order-details__panel-desc">
                      <View
                        className="rule-link"
                        onClick={e => goTo("/pages/rule-details", null)}
                      >
                        规则说明
                      </View>
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            )}
          </AtTabs>
        </View>
        {hasFooter && (
          <View className="page-footer order-details__footer border-top">
            {fawOrder.processStatus === "WAIT_SA" &&
              /^FW_[134]_1/.test(userOrderStatus) && (
                <AtButton
                  type="primary"
                  disabled={!selectedUserId}
                  className="btn-lg btn-primary"
                  loading={confirmLoading}
                  onClick={this.handleOrderTransfer}
                >
                  确认并转发
                </AtButton>
              )}
            {/^ESC_1_1/g.test(userOrderStatus) && (
              <AtButton
                type="primary"
                className="btn-lg btn-primary"
                loading={confirmLoading}
                onClick={this.handleEcOrderComplete}
              >
                确认完成
              </AtButton>
            )}
            {/^XS_[234]_1/g.test(userOrderStatus) &&
              fawOrder.processStatus === "WAIT_XS_C_CARD" && (
                <AtButton
                  type="primary"
                  className="btn-lg btn-primary"
                  loading={confirmLoading}
                  onClick={this.handleUploadAcCard.bind(this, "C")}
                >
                  确认完成
                </AtButton>
              )}
            {/^XS_[234]_1/g.test(userOrderStatus) &&
              fawOrder.processStatus === "WAIT_XS_A_CARD" && (
                <AtButton
                  type="primary"
                  className="btn-lg btn-primary"
                  loading={confirmLoading}
                  onClick={this.handleUploadAcCard.bind(this, "A")}
                >
                  确认并继续跟进
                </AtButton>
              )}
          </View>
        )}
      </View>
    );
  }
}
