import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker } from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtButton,
  AtList,
  AtListItem,
  AtImagePicker,
  AtTextarea,
  AtActivityIndicator,
  AtIcon,
  AtInput
} from "../../npm/taro-ui/dist";
import XRadio from "../../components/x-radio";
import ListItem from "../../components/list-item";
import OrderStatus from "./OrderStatus";
import { goTo, getDownTime } from "../../utils";
import storage from "../../utils/storage";
import modal from "../../utils/modal";
import { isPhone } from "../../utils/validator";
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

import "./index.scss";

let height = 960;
try {
  const res = Taro.getSystemInfoSync();
  height = res.windowHeight * (750 / res.windowWidth) - 360;
} catch (e) {
  // Do something when catch error
}
export default class Index extends Component {
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
      modal({
        content: "请上传图片"
      });
      return;
    }

    if (hasReplacementOrder === "1") {
      if (!orderAdviserData) {
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

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  getTabList = () => {
    return [
      { title: "客户信息", icon: "user" },
      { title: "意向车型", icon: "faver" },
      { title: "经销店信息", icon: "shops" },
      { title: "服务订单信息", icon: "user-love" },
      { title: "A卡信息", icon: "pin" },
      { title: "成交信息", icon: "note" },
      { title: "预约试驾", icon: "steering" },
      { title: "订单是否有效", icon: "note-error" }
    ];
  };

  render() {
    console.log(height, this.getTabList(), "re");
    return (
      <View className="page order-details__root">
        <View className="order-details__header border-bottom">
          <View className="order-details__header-name">二手车评估</View>
          <View className="order-details__header-desc">待SA受理</View>
          <View
            className="order-details__header-desc"
            style={{ marginTop: "12rpx" }}
          >
            已等待 10 天
          </View>
          <OrderStatus />
        </View>
        <View className="page-content" id="PAGE_CONTENT">
          <AtTabs
            current={this.state.current}
            className="order-details__tabs"
            scroll
            height={height + "rpx"}
            tabDirection="vertical"
            tabList={this.getTabList()}
            onClick={this.handleClick.bind(this)}
          />
        </View>
        <View className="page-footer order-details__footer border-top">
          <AtButton className="btn-lg btn-primary">确定</AtButton>
        </View>
      </View>
    );
  }
}
