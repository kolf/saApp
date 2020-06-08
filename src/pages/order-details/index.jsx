import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker } from "@tarojs/components";
import {
  AtButton,
  AtList,
  AtListItem,
  AtImagePicker,
  AtTextarea,
  AtActivityIndicator,
  AtIcon,
  AtInput
} from "taro-ui";

import "./index.scss";

import { goTo, getDownTime } from "../../utils";
import storage from "../../utils/storage";
import XRadio from "../../components/x-radio";
import ListItem from "../../components/list-item";

import {
  getOrder,
  setEcOrderComplete,
  uploadAcCard,
  setOrderTransfer,
  customerTestDrive,
  getCarTypeList,
  setTimeoutReason,
  getVinCodeByImg
} from "../../servers/apis";
import getBaseUrl from "../../servers/baseUrl";
// import defaultStatusUrl from "../../assets/images/result_102x.png";
// import timeoutUrl from "../../assets/images/result_92x.png";
const statusUrlMap = {
  7: require("../../assets/images/result_72x.png"), //未成交
  9: require("../../assets/images/result_92x.png"), //超时
  10: require("../../assets/images/result_102x.png"), //正常
  11: require("../../assets/images/result_112x.png"), //成交
  14: require("../../assets/images/result_142x.png") //已评估
};

const evaluationStatusMap = {
  1: "用户已评价",
  0: "用户未评价"
};

// user_type；DZ=店总、ESC=店总、XS=店总、FW=店总
// order_type	订单类型：1=评估、2=置换、3=新购、4=转介绍
// order_result	订单结果：1=成交成功，0=成交失败
// order_status	订单状态：申请=1，受理=2，完成=3
// order_effectiveness	订单有效性：1为有效，0为无效
// evaluation_status	评价状态：1=已评价，0=未评价
// timeout_flag	超时标记,1=超时，0=未超时

const hasReplacementOrderList = [
  {
    label: "车主没有置换需求",
    value: "0"
  },
  {
    label: "车主有置换需求",
    value: "1"
  }
];
class Index extends Component {
  config = {
    navigationBarTitleText: "订单详情"
  };

  state = {
    isFetching: false,
    confirmLoading: false,
    customer: {},
    fawDistributor: {},
    fawOrder: {},
    fawOrderForward: {},
    fawOrderForwards: [{}, {}],
    fawOrderItem: {},
    intentionCar: {},
    assessmentCar: {},
    orderTimeDTO: {},
    zhxcFawOrderDTO: {},
    escFiles: [],
    aCardFiles: [],
    cCardFiles: [],
    sa: {},
    cars: [],
    updateFiles: [],
    hasReplacementOrder: "0",
    carOptions: [],
    selectCarIndex: "",
    timeoutReason: "",
    orderResult: "1",
    orderResultSeason: "",
    downTime: [],
    vinData: {},
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

    const orderAdviserData = storage.get("orderAdviserData");
    if (orderAdviserData) {
      this.setState({
        orderAdviserData
      });
    }
  }

  handleWorkChange = value => {
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
          url: getBaseUrl("/api/v1/base/pubUpload") + "/api/v1/base/pubUpload",
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
              Taro.showToast({
                title: data.message,
                icon: "none"
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
      timeoutReason: e.target.value
    });
  };

  handleOrderResultSeasonChange = e => {
    this.setState({
      orderResultSeason: e.target.value
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
      Taro.showToast({
        title: "请填写购车人姓名或行驶证扫描",
        icon: "none"
      });
      return false;
    }
    if (!/^[A-Z0-9]{17}$/g.test(vinCode)) {
      Taro.showToast({
        title: "请填写17位VIN码或行驶证扫描",
        icon: "none"
      });
      return false;
    }

    if (!phone) {
      Taro.showToast({
        title: "请填写购车人11位手机号",
        icon: "none"
      });
      return false;
    }
    if (!/^1[03456789]\d{9}$/.test(phone)) {
      Taro.showToast({
        title: "请填写正确的手机号",
        icon: "none"
      });
      return false;
    }

    if (!releaseDate) {
      Taro.showToast({
        title: "请填写上牌时间或行驶证扫描",
        icon: "none"
      });
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
      Taro.showToast({
        title: "请填写正确的上牌时间",
        icon: "none"
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
        Taro.showToast({
          title: "请上传图片",
          icon: "none"
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
          Taro.showToast({
            title: "请填写未成交原因",
            icon: "none"
          });
          return;
        }
        newParams.orderResultSeason = orderResultSeason;
      }

      newParams.orderResult = orderResult;
    }

    if (cardType === "A" && fawOrder.timeoutFlag === 1 && !timeoutReason) {
      Taro.showToast({
        title: "请填写超时理由",
        icon: "none"
      });
      return;
    }

    if (cardType === "A") {
      const successFileIds = await this.uploadAllFile();

      if (successFileIds.length === 0) {
        Taro.showToast({
          title: "图片上传失败",
          icon: "none"
        });
        return;
      }

      newParams.fileAcCardIds = successFileIds.join(",");
    }

    const _this = this;
    if (cardType === "A") {
      Taro.showModal({
        title: "确认并继续跟进",
        content:
          "请继续跟进订单，同时请邀约用户进行试驾，并在试驾系统中及时完善预约试驾信息，以免在订单成交后影响您获取最终奖励。"
      }).then(res => {
        if (!res.confirm) {
          return false;
        }
        submit();
      });
    } else if (cardType === "C") {
      if (this.state.testDriveFlag === 1) {
        submit();
        return;
      }
      Taro.showModal({
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
          submit();
        }
      });
    }

    function submit() {
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
          Taro.showToast({
            title: res.message,
            icon: "none"
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
    const { orderAdviserData } = this.state;
    setOrderTransfer({
      orderId: this.orderId,
      userId: orderAdviserData.value
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
    //orderAdviserData.value
    const {
      hasReplacementOrder,
      updateFiles,
      selectCarIndex,
      carOptions,
      orderAdviserData,
      fawOrder,
      timeoutReason
    } = this.state;

    if (updateFiles.length === 0) {
      Taro.showToast({
        title: "请上传图片",
        icon: "none"
      });
      return;
    }

    if (hasReplacementOrder === "1") {
      if (!orderAdviserData) {
        Taro.showToast({
          title: "请选择服务顾问",
          icon: "none"
        });
        return;
      }
      if (!selectCarIndex) {
        Taro.showToast({
          title: "请选择意向车型",
          icon: "none"
        });
        return;
      }
    }

    const successFileIds = await this.uploadAllFile();

    if (successFileIds.length === 0) {
      Taro.showToast({
        title: "图片上传失败",
        icon: "none"
      });
      return;
    }

    if (fawOrder.timeoutFlag === 1 && !timeoutReason) {
      Taro.showToast({
        title: "请填写超时理由",
        icon: "none"
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
      xsId: hasReplacementOrder === "1" ? orderAdviserData.value : ""
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

  handleOrderClick = e => {
    const { escFawOrderDTO } = this.state;
    goTo("order-details", {
      id: escFawOrderDTO.fawOrder.id
    });
  };

  render() {
    const {
      customer,
      fawDistributor,
      fawOrder,
      assessmentCar,
      aCardFiles,
      cCardFiles,
      cars,
      fawOrderItem,
      intentionCar,
      orderAdviserData,
      userType,
      selectCarIndex,
      orderResult,
      escFiles,
      orderTimeDTO,
      escFawOrderDTO,
      zhxcFawOrderDTO,
      fawOrderForwards,
      downTime,
      isFetching,
      confirmLoading
    } = this.state;

    if (isFetching) {
      return (
        <View className="page order-details__root bg-gray">
          <AtActivityIndicator mode="center" content="加载中..." />
        </View>
      );
    }

    const userOrderStatus = `${userType}_${fawOrder.orderType}_${fawOrder.orderStatus}`;
    const saUser = fawOrderForwards.find(f => f.positionName === "FW") || {};
    const escUser = fawOrderForwards.find(f => f.positionName === "ESC") || {};
    const xsUser = fawOrderForwards.find(f => f.positionName === "XS") || {};

    return (
      <View className="page order-details__root bg-gray">
        <View className="order-details__panel">
          <View className="at-row">
            <View className="at-col at-col-8">
              <View className="order-details__panel-heading">
                <View className="order-details__panel-heading-title">
                  {fawOrder.orderTypeName}
                </View>
                <View>{fawOrder.processStatusName}</View>
              </View>
              <View className="order-details__panel-body">
                {fawOrder.orderStatus != 3 ? (
                  <View>
                    已等待时间： {downTime[0]}天{downTime[1]}小时{downTime[2]}
                    分钟{downTime[3]}秒
                  </View>
                ) : (
                  evaluationStatusMap[fawOrder.evaluationStatus]
                )}
              </View>
            </View>
            <View className="at-col at-col-4">
              <Image
                src={this.getStatusUrl(fawOrder)}
                mode="widthFix"
                style="width:100px;height:86px"
              />
            </View>
          </View>
        </View>
        <View className="order-details__panel gap-top">
          <View className="order-details__panel-heading">客户信息</View>
          <View className="order-details__panel-body">
            <View className="at-row">
              <View className="at-col at-col-4">姓名：</View>
              <View className="at-col at-col-8">{customer.realName}</View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">性别：</View>
              <View className="at-col at-col-8">{customer.genderName}</View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">手机号码：</View>
              <View className="at-col at-col-8">{customer.phone}</View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">所有车辆：</View>
              <View className="at-col at-col-8 at-col--wrap">
                {cars.length > 0 ? cars.map(c => c.carName).join(",") : "无"}
              </View>
            </View>
          </View>
        </View>
        {fawOrder.orderType === 4 && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">被介绍人信息 </View>
            <View className="order-details__panel-body">
              <View className="at-row">
                <View className="at-col at-col-4">被介绍人姓名:</View>
                <View className="at-col at-col-8">{fawOrderItem.realName}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">被介绍人手机号码:</View>
                <View className="at-col at-col-8">{fawOrderItem.phone}</View>
              </View>
            </View>
          </View>
        )}
        {/^[12]/g.test(fawOrder.orderType + "") && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">评估车辆信息</View>
            <View className="order-details__panel-body">
              <View className="at-row">
                <View className="at-col at-col-4">车型：</View>
                <View className="at-col at-col-8">{assessmentCar.carName}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">购车时间：</View>
                <View className="at-col at-col-8">
                  {assessmentCar.buyTime} 年
                </View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">车架号VIN码：</View>
                <View className="at-col at-col-8 at-col--wrap">
                  {assessmentCar.vinCode}
                </View>
              </View>
            </View>
          </View>
        )}
        {fawOrder.orderType === 2 && escFawOrderDTO && (
          <View className="order-details__panel border-top">
            <View
              className="order-details__panel-heading"
              onClick={this.handleOrderClick}
            >
              关联的二手车订单信息
              <AtIcon
                value="chevron-right"
                size="24"
                className="order-details__panel-heading-arrow"
                color="#666"
              />
            </View>
            <View className="order-details__panel-body">
              <View className="at-row">
                <View className="at-col at-col-5">订单类别：</View>
                <View className="at-col at-col-7">
                  {escFawOrderDTO.fawOrder.orderTypeName}
                </View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-5">订单号：</View>
                <View className="at-col at-col-7">
                  {escFawOrderDTO.fawOrder.orderNo}
                </View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-5">服务申请提交时间：</View>
                <View className="at-col at-col-7">
                  {escFawOrderDTO.fawOrder.createTime}
                </View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-5">服务顾问转发时间：</View>
                <View className="at-col at-col-7">
                  {escFawOrderDTO.orderTimeDTO.saTransferTime ||
                    escFawOrderDTO.fawOrder.createTime}
                </View>
              </View>

              <View>
                <View className="at-row">
                  <View className="at-col at-col-5">服务顾问：</View>
                  <View className="at-col at-col-7">
                    {escFawOrderDTO.fawOrderForwards[0].adviserRealName}
                  </View>
                </View>
                <View className="at-row">
                  <View className="at-col at-col-5">服务顾问手机号：</View>
                  <View className="at-col at-col-7">
                    {escFawOrderDTO.fawOrderForwards[0].phone}
                  </View>
                </View>
              </View>

              {escFawOrderDTO.fawOrderForwards[1] && (
                <View>
                  <View className="at-row">
                    <View className="at-col at-col-5">评估服务完成时间：</View>
                    <View className="at-col at-col-7">
                      {escFawOrderDTO.orderTimeDTO.escCompletionTime}
                    </View>
                  </View>
                  <View className="at-row">
                    <View className="at-col at-col-5">二手车顾问：</View>
                    <View className="at-col at-col-7">
                      {escFawOrderDTO.fawOrderForwards[1].adviserRealName}
                    </View>
                  </View>
                  <View className="at-row">
                    <View className="at-col at-col-5">二手车顾问手机号：</View>
                    <View className="at-col at-col-7">
                      {escFawOrderDTO.fawOrderForwards[1].phone}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
        {/^[234]/g.test(fawOrder.orderType + "") && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">意向车型</View>
            <View className="order-details__panel-body">
              <View className="at-row">
                <View className="at-col at-col-4">意向车型：</View>
                <View className="at-col at-col-8">{intentionCar.carName}</View>
              </View>
            </View>
          </View>
        )}
        <View className="order-details__panel border-top">
          <View className="order-details__panel-heading">
            {fawDistributor.name}
          </View>
          <View className="order-details__panel-body">
            <View className="at-row">
              <View className="at-col at-col-4">地址：</View>
              <View className="at-col at-col-8 at-col--wrap">
                {fawDistributor.address}
              </View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-4">服务热线：</View>
              <View className="at-col at-col-8">
                {fawDistributor.serviceHotline}
              </View>
            </View>
            {!escFawOrderDTO && (
              <View>
                <View className="at-row">
                  <View className="at-col at-col-4">服务顾问：</View>
                  <View className="at-col at-col-8">
                    {saUser.adviserRealName}
                  </View>
                </View>
                <View className="at-row">
                  <View className="at-col at-col-4">服务顾问手机号：</View>
                  <View className="at-col at-col-8">{saUser.phone}</View>
                </View>
              </View>
            )}

            {escUser.phone && /^[12]/g.test(fawOrder.orderType + "") && (
              <View>
                <View className="at-row">
                  <View className="at-col at-col-4">二手车顾问：</View>
                  <View className="at-col at-col-8">
                    {escUser.adviserRealName}
                  </View>
                </View>
                <View className="at-row">
                  <View className="at-col at-col-4">二手车顾问手机号：</View>
                  <View className="at-col at-col-8">{escUser.phone}</View>
                </View>
              </View>
            )}

            {xsUser.phone && /^[234]/g.test(fawOrder.orderType + "") && (
              <View>
                <View className="at-row">
                  <View className="at-col at-col-4">销售顾问：</View>
                  <View className="at-col at-col-8">
                    {xsUser.adviserRealName}
                  </View>
                </View>
                <View className="at-row">
                  <View className="at-col at-col-4">销售顾问手机号：</View>
                  <View className="at-col at-col-8">{xsUser.phone}</View>
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="order-details__panel border-top">
          <View className="order-details__panel-heading">服务订单信息</View>
          <View className="order-details__panel-body">
            <View className="at-row">
              <View className="at-col at-col-5">订单类别：</View>
              <View className="at-col at-col-7">{fawOrder.orderTypeName}</View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-5">订单号：</View>
              <View className="at-col at-col-7">{fawOrder.orderNo}</View>
            </View>
            <View className="at-row">
              <View className="at-col at-col-5">服务申请提交时间：</View>
              <View className="at-col at-col-7">
                {orderTimeDTO.orderCreateTime}
              </View>
            </View>

            {/^[134]/g.test(fawOrder.orderType) && (
              <View className="at-row">
                <View className="at-col at-col-5">服务顾问转发时间：</View>
                <View className="at-col at-col-7">
                  {orderTimeDTO.saTransferTime || "---- -- -- --:--:--"}
                </View>
              </View>
            )}

            {/^[1]/g.test(fawOrder.orderType) && (
              <View className="at-row">
                <View className="at-col at-col-5">二手车顾问完成时间：</View>
                <View className="at-col at-col-7">
                  {orderTimeDTO.escCompletionTime || "---- -- -- --:--:--"}
                </View>
              </View>
            )}

            {(/^[234]/g.test(fawOrder.orderType) || escFawOrderDTO) && (
              <View className="at-row">
                <View className="at-col at-col-5">销售顾问受理时间：</View>
                <View className="at-col at-col-7">
                  {orderTimeDTO.xsAcceptTime || "---- -- -- --:--:--"}
                </View>
              </View>
            )}

            {(/^[234]/g.test(fawOrder.orderType) || escFawOrderDTO) && (
              <View className="at-row">
                <View className="at-col at-col-5">销售顾问完成时间：</View>
                <View className="at-col at-col-7">
                  {orderTimeDTO.xsCompletionTime || "---- -- -- --:--:--"}
                </View>
              </View>
            )}
            {orderTimeDTO.orderCompletionTime && (
              <View className="at-row">
                <View className="at-col at-col-5">订单完成时间：</View>
                <View className="at-col at-col-7">
                  {orderTimeDTO.orderCompletionTime}
                </View>
              </View>
            )}
          </View>
        </View>
        {escFiles.length > 0 && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">
              评估单照片
              <Text className="text-error">*(用户不可见）</Text>
            </View>
            <View className="order-details__panel-body">
              <View className="at-row image-list">
                {escFiles.map(f => (
                  <View
                    key={f.id}
                    className="image-list-item"
                    onClick={this.onPreviewImage.bind(this, escFiles, f)}
                  >
                    <Image className="img" src={f.fileUrl} mode="aspectFill" />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        {aCardFiles.length > 0 && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">A卡照片</View>
            <View className="order-details__panel-body">
              <View className="at-row image-list">
                {aCardFiles.map(f => (
                  <View
                    key={f.id}
                    className="image-list-item"
                    onClick={this.onPreviewImage.bind(this, aCardFiles, f)}
                  >
                    <Image className="img" src={f.fileUrl} mode="aspectFill" />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {cCardFiles.length > 0 && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">C卡照片</View>
            <View className="order-details__panel-body">
              <View className="at-row image-list">
                {cCardFiles.map(f => (
                  <View
                    key={f.id}
                    className="image-list-item"
                    onClick={this.onPreviewImage.bind(this, cCardFiles, f)}
                  >
                    <Image className="img" src={f.fileUrl} mode="aspectFill" />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {fawOrderItem.checkPhone && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">成交信息</View>
            <View className="order-details__panel-body">
              <View className="at-row">
                <View className="at-col at-col-4">购车人姓名：</View>
                <View className="at-col at-col-8">{fawOrderItem.buyName}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">购车人手机号：</View>
                <View className="at-col at-col-8">
                  {fawOrderItem.checkPhone}
                </View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">车辆VIN码：</View>
                <View className="at-col at-col-8">{fawOrderItem.vinCode}</View>
              </View>
              <View className="at-row">
                <View className="at-col at-col-4">上牌时间：</View>
                <View className="at-col at-col-8">
                  {fawOrderItem.releaseDate.substr(0, 10)}
                </View>
              </View>
            </View>
          </View>
        )}

        {/^ESC_1_1/g.test(userOrderStatus) && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">
              请上传评估单照片
              <Text className="text-error">*(至少一张，用户不可见)</Text>
            </View>
            <View className="order-details__panel-body">
              <AtImagePicker
                sizeType={["compressed"]}
                className="image-picker"
                files={this.state.updateFiles}
                onChange={this.handleFileChange}
                multiple
                showAddBtn={this.state.updateFiles.length < 2}
                length={4}
              />
            </View>
          </View>
        )}
        {/^ESC_1_1/g.test(userOrderStatus) && (
          <View className="order-details__panel border-top">
            <View className="order-details__panel-heading">
              请选择本次工作完成情况
            </View>
            <View className="order-details__panel-body">
              <XRadio
                className="panel-body-options no-border"
                options={hasReplacementOrderList}
                onChange={this.handleWorkChange}
              />
            </View>
          </View>
        )}
        {/^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_A_CARD" && (
            <View className="order-details__panel border-top">
              <View className="order-details__panel-heading">
                请上传A卡照片
                <Text className="text-error">*(至少一张，用户不可见)</Text>
              </View>
              <View className="order-details__panel-body">
                <AtImagePicker
                  sizeType={["compressed"]}
                  className="image-picker"
                  files={this.state.updateFiles}
                  onChange={this.handleFileChange}
                  showAddBtn={this.state.updateFiles.length < 2}
                  length={4}
                />
              </View>
            </View>
          )}
        {fawOrder.timeoutFlag === 1 &&
          /^(ESC|XS)_[1234]_1/g.test(userOrderStatus) &&
          /^WAIT_(ESC|XS_A_CARD)/g.test(fawOrder.processStatus) && (
            <View className="order-details__panel border-top">
              <View className="order-details__panel-heading">
                请填写超时理由<Text className="text-error">*(用户不可见）</Text>
              </View>
              <View className="order-details__panel-body">
                <AtTextarea
                  placeholder="超时理由..，限200字内"
                  className="textarea no-border"
                  maxLength={200}
                  value={this.state.timeoutReason}
                  onChange={this.handleTimeoutReasonChange}
                />
              </View>
            </View>
          )}
        {/^(ESC|XS|DZ)_[1234]_[123]/g.test(userOrderStatus) &&
          fawOrder.timeoutFlag === 1 &&
          (escUser.timeoutReason || xsUser.timeoutReason) && (
            <View className="order-details__panel border-top">
              <View className="order-details__panel-heading">
                {escUser.timeoutReason
                  ? "评估工作是否超时："
                  : "A卡上传工作是否超时："}
                <Text className="text-error">*(用户不可见）</Text>
              </View>
              <View className="order-details__panel-body">
                <AtTextarea
                  disabled
                  className="textarea no-border"
                  value={escUser.timeoutReason || xsUser.timeoutReason}
                />
              </View>
            </View>
          )}

        {/^(XS|DZ)_[234]_3/g.test(userOrderStatus) &&
          fawOrder.orderResultReason && (
            <View className="order-details__panel border-top">
              <View className="order-details__panel-heading">未成交原因</View>
              <View className="order-details__panel-body">
                <AtTextarea
                  disabled
                  className="textarea no-border"
                  value={fawOrder.orderResultReason}
                />
              </View>
            </View>
          )}
        {/^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_C_CARD" && (
            <View className="order-details__panel border-top">
              <View className="order-details__panel-heading">
                请选择本次工作完成情况
              </View>
              <View className="order-details__panel-body">
                <View className="checkbox-container">
                  <View className="at-checkbox">
                    <View
                      className={
                        orderResult === "1"
                          ? "at-checkbox__option no-border at-checkbox__option--selected"
                          : "at-checkbox__option no-border"
                      }
                    >
                      <View className="at-checkbox__option-wrap">
                        <View
                          className="at-checkbox__option-cnt"
                          onClick={this.handleOrderResultChange.bind(this, "1")}
                        >
                          <View className="at-checkbox__icon-cnt">
                            <Text className="taro-text at-icon at-icon-check"></Text>
                          </View>
                          <View className="at-checkbox__title">
                            成交：请提交成交车主、车辆信息
                          </View>
                        </View>

                        <View className="at-checkbox__input-panel">
                          <AtButton type="primary" onClick={this.updateVinCode}>
                            行驶证扫描
                          </AtButton>
                          <View
                            className="order-details__panel-heading"
                            style={{ paddingTop: "12px" }}
                          >
                            <Text className="text-error">* </Text>
                            购车人姓名
                          </View>
                          <View className="order-details__panel-body">
                            <AtInput
                              placeholder="请填写购车人姓名或行驶证扫描"
                              className="textarea no-border"
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
                          <View
                            className="order-details__panel-heading"
                            style={{ paddingTop: "12px" }}
                          >
                            <Text className="text-error">* </Text>
                            车辆VIN码
                          </View>
                          <View className="order-details__panel-body">
                            <AtInput
                              placeholder="请填写17位VIN码或行驶证扫描"
                              className="textarea no-border"
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
                          <View
                            className="order-details__panel-heading"
                            style={{ paddingTop: "12px" }}
                          >
                            <Text className="text-error">* </Text>
                            上牌时间
                          </View>
                          <View className="order-details__panel-body">
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
                              <View className="input__text">
                                {this.state.vinData.releaseDate || (
                                  <Text className="input__placeholder">
                                    请填写上牌时间或行驶证扫描
                                  </Text>
                                )}
                              </View>
                            </Picker>
                            <Text
                              className="text-error"
                              style={{ fontSize: "13px" }}
                            >
                              注：以上获取信息有误，可手动录入或修改
                            </Text>
                          </View>
                          <View
                            className="order-details__panel-heading"
                            style={{ paddingTop: "12px" }}
                          >
                            <Text className="text-error">* </Text>
                            请手动填写购车人手机号
                          </View>
                          <View className="order-details__panel-body">
                            <AtInput
                              placeholder="请填写购车人11位手机号"
                              className="textarea no-border"
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
                            <Text
                              className="text-error"
                              style={{ fontSize: "13px" }}
                            >
                              注：请核对订单发起人或被介绍人的手机号后填写
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      className={
                        orderResult === "0"
                          ? "at-checkbox__option at-checkbox__option--selected"
                          : "at-checkbox__option"
                      }
                    >
                      <View className="at-checkbox__option-wrap">
                        <View
                          className="at-checkbox__option-cnt"
                          onClick={this.handleOrderResultChange.bind(this, "0")}
                        >
                          <View className="at-checkbox__icon-cnt">
                            <Text className="taro-text at-icon at-icon-check"></Text>
                          </View>
                          <View className="at-checkbox__title">未成交</View>
                        </View>
                        <View className="at-checkbox__desc">
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
                  </View>
                </View>
              </View>
            </View>
          )}

        {/^(FW|XS|ESC|DZ)_[234]_[123]/g.test(userOrderStatus) &&
          /(WAIT_XS_C_CARD|FINISH)/g.test(fawOrder.processStatus) && (
            <AtList className="gap-top">
              <AtListItem
                className="no-border"
                title="预约试驾"
                extraText={this.state.testDriveFlag === 1 ? "已试驾" : "未试驾"}
              />
            </AtList>
          )}

        {(/^(FW|XS|DZ)_[234]_3/g.test(userOrderStatus) ||
          (/^ESC_2_3/g.test(userOrderStatus) && zhxcFawOrderDTO)) &&
          fawOrder.orderResult === 1 && (
            <AtList className="gap-top">
              <AtListItem
                className="no-border"
                title="订单是否有效"
                className="no-border"
                extraText={fawOrder.orderEffectiveness === 1 ? "有效" : "无效"}
              />
              <View className="rule-link" onClick={e => goTo("rule-details")}>
                规则说明
              </View>
            </AtList>
          )}

        {fawOrder.orderType === 1 && zhxcFawOrderDTO.fawOrder && (
          <AtList className="gap-top">
            <AtListItem
              className="no-border"
              title="关联的置换订单"
              arrow="right"
              extraText={zhxcFawOrderDTO.fawOrder.orderNo}
              onClick={goTo.bind(this, "order-details", {
                id: zhxcFawOrderDTO.fawOrder.id
              })}
            />
          </AtList>
        )}

        {/^DZ/.test(userType) && fawOrder.evaluationStatus === 1 && (
          <AtList className="gap-top">
            <AtListItem
              title="订单已评价"
              arrow="right"
              onClick={goTo.bind(this, "evaluation-details", {
                orderId: fawOrder.id
              })}
            />
          </AtList>
        )}

        {((/^FW_[34]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_SA") ||
          (/ESC_1_1/g.test(userOrderStatus) &&
            this.state.hasReplacementOrder === "1")) && (
          <AtList className="gap-top">
            <AtListItem
              className="no-border"
              isRequire
              title="销售顾问"
              arrow="right"
              extraText={orderAdviserData ? orderAdviserData.label : "请选择"}
              onClick={goTo.bind(this, "select-adviser", {
                userType: "XS"
              })}
            />
          </AtList>
        )}
        {this.state.hasReplacementOrder === "1" && (
          <AtList className="gap-top">
            <ListItem
              className="no-border"
              isRequire
              title="意向车型"
              arrow="right"
              renderExtra={
                <Picker
                  mode="selector"
                  range={this.state.carOptions.map(c => c.label)}
                  onChange={this.handleCarSelect}
                >
                  <View className="picker">
                    {selectCarIndex
                      ? this.state.carOptions[selectCarIndex].label
                      : "请选择"}
                  </View>
                </Picker>
              }
            />
          </AtList>
        )}
        {fawOrder.processStatus === "WAIT_SA" &&
          /^FW_[1]_1/g.test(userOrderStatus) && (
            <AtList className="gap-top">
              <AtListItem
                className="no-border"
                isRequire
                title="二手车顾问"
                arrow="right"
                extraText={orderAdviserData ? orderAdviserData.label : "请选择"}
                onClick={goTo.bind(this, "select-adviser", {
                  userType: "ESC"
                })}
              />
            </AtList>
          )}

        {fawOrder.processStatus === "WAIT_SA" &&
          /^FW_[134]_1/.test(userOrderStatus) && (
            <View className="submit-button-wrap">
              <AtButton
                type="primary"
                disabled={!orderAdviserData || confirmLoading}
                loading={confirmLoading}
                onClick={this.handleOrderTransfer}
              >
                确认并转发
              </AtButton>
            </View>
          )}
        {/^ESC_1_1/g.test(userOrderStatus) && (
          <View className="submit-button-wrap">
            <AtButton
              type="primary"
              loading={confirmLoading}
              onClick={this.handleEcOrderComplete}
            >
              确认完成
            </AtButton>
          </View>
        )}
        {/^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_C_CARD" && (
            <View className="submit-button-wrap">
              <AtButton
                type="primary"
                loading={confirmLoading}
                onClick={this.handleUploadAcCard.bind(this, "C")}
              >
                确认完成
              </AtButton>
            </View>
          )}
        {/^XS_[234]_1/g.test(userOrderStatus) &&
          fawOrder.processStatus === "WAIT_XS_A_CARD" && (
            <View className="submit-button-wrap">
              <AtButton
                type="primary"
                loading={confirmLoading}
                onClick={this.handleUploadAcCard.bind(this, "A")}
              >
                确认并继续跟进
              </AtButton>
            </View>
          )}
      </View>
    );
  }
}

//userOrderStatus

export default Index;
