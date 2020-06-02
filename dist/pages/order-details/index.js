(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/order-details/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE&":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

__webpack_require__(/*! ./index.scss */ "./src/pages/order-details/index.scss");

var _index = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.js");

var _storage = __webpack_require__(/*! ../../utils/storage */ "./src/utils/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _apis = __webpack_require__(/*! ../../servers/apis */ "./src/servers/apis.js");

var _baseUrl = __webpack_require__(/*! ../../servers/baseUrl */ "./src/servers/baseUrl.js");

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import defaultStatusUrl from "../../assets/images/result_102x.png";
// import timeoutUrl from "../../assets/images/result_92x.png";
var statusUrlMap = {
  7: __webpack_require__(/*! ../../assets/images/result_72x.png */ "./src/assets/images/result_72x.png"), //未成交
  9: __webpack_require__(/*! ../../assets/images/result_92x.png */ "./src/assets/images/result_92x.png"), //超时
  10: __webpack_require__(/*! ../../assets/images/result_102x.png */ "./src/assets/images/result_102x.png"), //正常
  11: __webpack_require__(/*! ../../assets/images/result_112x.png */ "./src/assets/images/result_112x.png"), //成交
  14: __webpack_require__(/*! ../../assets/images/result_142x.png */ "./src/assets/images/result_142x.png") //已评估
};

var evaluationStatusMap = {
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

var hasReplacementOrderList = [{
  label: "车主没有置换需求",
  value: "0"
}, {
  label: "车主有置换需求",
  value: "1"
}];
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref,
        _this4 = this;

    var _temp, _this2, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "anonymousState__temp9", "anonymousState__temp10", "anonymousState__temp11", "anonymousState__temp12", "anonymousState__temp13", "anonymousState__temp14", "anonymousState__temp15", "anonymousState__temp16", "anonymousState__temp17", "anonymousState__temp18", "anonymousState__temp19", "anonymousState__temp20", "anonymousState__temp21", "anonymousState__temp22", "anonymousState__temp23", "anonymousState__temp24", "anonymousState__temp25", "anonymousState__temp26", "anonymousState__temp27", "anonymousState__temp28", "anonymousState__temp29", "anonymousState__temp30", "anonymousState__temp31", "anonymousState__temp32", "anonymousState__temp33", "anonymousState__temp34", "anonymousState__temp35", "anonymousState__temp36", "anonymousState__temp37", "anonymousState__temp38", "anonymousState__temp39", "anonymousState__temp40", "$compid__324", "$compid__325", "$compid__326", "$compid__327", "$compid__328", "$compid__329", "$compid__330", "$compid__331", "$compid__332", "$compid__333", "$compid__334", "$compid__335", "$compid__336", "$compid__337", "$compid__338", "$compid__339", "$compid__340", "$compid__341", "$compid__342", "$compid__343", "$compid__344", "$compid__345", "$compid__346", "$compid__347", "$compid__348", "$compid__349", "$compid__350", "$compid__351", "$compid__352", "$compid__353", "$compid__354", "isFetching", "fawOrder", "escFawOrderDTO", "orderTimeDTO", "escFiles", "aCardFiles", "cCardFiles", "fawOrderItem", "orderResult", "zhxcFawOrderDTO", "downTime", "evaluationStatusMap", "customer", "assessmentCar", "intentionCar", "fawDistributor", "saUser", "escUser", "xsUser", "confirmLoading", "fawOrderForward", "fawOrderForwards", "sa", "cars", "updateFiles", "hasReplacementOrder", "carOptions", "selectCarIndex", "timeoutReason", "orderResultSeason", "vinData", "testDriveFlag"], _this2.config = {
      navigationBarTitleText: "订单详情"
    }, _this2.state = {
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
    }, _this2.timer = null, _this2.handleWorkChange = function (value) {
      _this2.setState({
        hasReplacementOrder: value
      });
    }, _this2.handleOrderResultChange = function (value) {
      if (value === "0") {
        _this2.setState({
          updateFiles: []
        });
      } else if (value === "1") {
        _this2.setState({
          orderResultSeason: ""
        });
      }
      _this2.setState({
        orderResult: value
      });
    }, _this2.handleFileChange = function (files) {
      _this2.setState({
        updateFiles: files.filter(function (f, index) {
          return index < 2;
        })
      });
    }, _this2.uploadAllFile = function () {
      return new Promise(function (resolve, reject) {
        _taroWeapp2.default.showLoading({
          title: "上传图片中..."
        });
        var JSESSIONID = _storage2.default.get("JSESSIONID");
        var updateFiles = _this2.state.updateFiles;

        var successFileIds = [];
        var error = null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = updateFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var file = _step.value;

            _taroWeapp2.default.uploadFile({
              url: (0, _baseUrl2.default)("/api/v1/base/pubUpload") + "/api/v1/base/pubUpload",
              filePath: file.url,
              name: "file",
              header: {
                Cookie: JSESSIONID ? "SESSION=" + JSESSIONID : null
              },
              complete: function complete(res) {
                var data = JSON.parse(res.data);
                if (data.code === 200) {
                  var fileObj = data.data;
                  if (fileObj) {
                    successFileIds.push(fileObj.id);
                  }
                } else {
                  error = res;
                  _taroWeapp2.default.hideLoading();
                  _taroWeapp2.default.showToast({
                    title: data.message,
                    icon: "none"
                  });

                  reject(error);
                }
                if (successFileIds.length === updateFiles.length) {
                  _taroWeapp2.default.hideLoading();
                  resolve(successFileIds);
                }
              }
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }, _this2.handleTimeoutReasonChange = function (e) {
      _this2.setState({
        timeoutReason: e.target.value
      });
    }, _this2.handleOrderResultSeasonChange = function (e) {
      _this2.setState({
        orderResultSeason: e.target.value
      });
    }, _this2.handleCarSelect = function (e) {
      _this2.setState({
        selectCarIndex: e.target.value
      });
    }, _this2.loadData = function () {
      _this2.setState({
        isFetching: true
      });

      (0, _apis.getOrder)({ orderId: _this2.orderId }).then(function (res) {
        // console.log(res, "res");
        _this2.setState(_extends({
          isFetching: false
        }, res.data), function () {
          _this2.startDownTime();
        });
      });
    }, _this2.onPreviewImage = function (iamges, image) {
      _taroWeapp2.default.previewImage({
        urls: iamges.map(function (f) {
          return f.fileUrl;
        }),
        current: image.fileUrl
      });
    }, _this2.getStartTime = function () {
      var _this2$state = _this2.state,
          processStatus = _this2$state.fawOrder.processStatus,
          orderTimeDTO = _this2$state.orderTimeDTO;

      var startTime = "";
      if (processStatus === "WAIT_SA") {
        startTime = orderTimeDTO.orderCreateTime;
      } else if (processStatus === "WAIT_ESC") {
        startTime = orderTimeDTO.saTransferTime;
      } else if (processStatus === "WAIT_XS_A_CARD") {
        startTime = orderTimeDTO.escCompletionTime || orderTimeDTO.saTransferTime || orderTimeDTO.orderCreateTime;
      } else if (processStatus === "WAIT_XS_C_CARD") {
        startTime = orderTimeDTO.xsAcceptTime;
      }
      return startTime;
    }, _this2.startDownTime = function () {
      var startTime = _this2.getStartTime();
      _this2.setState({
        downTime: (0, _index.getDownTime)(startTime)
      });
      _this2.timer = setInterval(function () {
        _this2.setState({
          downTime: (0, _index.getDownTime)(startTime)
        });
      }, 1000);
    }, _this2.loadCarData = function () {
      (0, _apis.getCarTypeList)().then(function (res) {
        _this2.setState({
          carOptions: res.data.map(function (item) {
            return {
              label: item.carName,
              value: item.id
            };
          })
        });
      });
      (0, _apis.customerTestDrive)({ orderId: _this2.orderId }).then(function (res) {
        _this2.setState({
          testDriveFlag: res.data
        });
      });
    }, _this2.checkVinData = function () {
      var _this2$state$vinData = _this2.state.vinData,
          phone = _this2$state$vinData.phone,
          vinCode = _this2$state$vinData.vinCode,
          releaseDate = _this2$state$vinData.releaseDate,
          buyName = _this2$state$vinData.buyName;


      if (!buyName) {
        _taroWeapp2.default.showToast({
          title: "请填写购车人姓名或行驶证扫描",
          icon: "none"
        });
        return false;
      }
      if (!/^[A-Z0-9]{17}$/g.test(vinCode)) {
        _taroWeapp2.default.showToast({
          title: "请填写17位VIN码或行驶证扫描",
          icon: "none"
        });
        return false;
      }

      if (!phone) {
        _taroWeapp2.default.showToast({
          title: "请填写购车人11位手机号",
          icon: "none"
        });
        return false;
      }
      if (!/^1[03456789]\d{9}$/.test(phone)) {
        _taroWeapp2.default.showToast({
          title: "请填写正确的手机号",
          icon: "none"
        });
        return false;
      }

      if (!releaseDate) {
        _taroWeapp2.default.showToast({
          title: "请填写上牌时间或行驶证扫描",
          icon: "none"
        });
        return false;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
        _taroWeapp2.default.showToast({
          title: "请填写正确的上牌时间",
          icon: "none"
        });
        return false;
      }
      return true;
    }, _this2.handleUploadAcCard = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(cardType) {
        var _this2$state2, updateFiles, orderResult, orderResultSeason, timeoutReason, fawOrder, vinData, newParams, successFileIds, _this, submit;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                submit = function submit() {
                  var _this3 = this;

                  _this.setState({
                    confirmLoading: true
                  });

                  (0, _apis.uploadAcCard)(_extends({
                    orderId: _this.orderId,
                    cardType: cardType
                  }, newParams)).then(function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(res) {
                      var res1;
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!(res.code !== 200)) {
                                _context.next = 4;
                                break;
                              }

                              _this.setState({
                                confirmLoading: false
                              });
                              _taroWeapp2.default.showToast({
                                title: res.message,
                                icon: "none"
                              });
                              return _context.abrupt("return");

                            case 4:
                              _context.next = 6;
                              return (0, _apis.setTimeoutReason)({
                                orderId: _this.orderId,
                                timeoutReason: timeoutReason
                              });

                            case 6:
                              res1 = _context.sent;

                              _taroWeapp2.default.navigateBack({
                                delta: 1
                              });

                            case 8:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, _this3);
                    }));

                    return function (_x2) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                };

                _this2$state2 = _this2.state, updateFiles = _this2$state2.updateFiles, orderResult = _this2$state2.orderResult, orderResultSeason = _this2$state2.orderResultSeason, timeoutReason = _this2$state2.timeoutReason, fawOrder = _this2$state2.fawOrder, vinData = _this2$state2.vinData;
                newParams = {};

                if (!(cardType === "A")) {
                  _context2.next = 9;
                  break;
                }

                if (!(updateFiles.length === 0)) {
                  _context2.next = 7;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: "请上传图片",
                  icon: "none"
                });
                return _context2.abrupt("return");

              case 7:
                _context2.next = 22;
                break;

              case 9:
                if (!(cardType === "C")) {
                  _context2.next = 22;
                  break;
                }

                if (!(orderResult === "1")) {
                  _context2.next = 16;
                  break;
                }

                if (_this2.checkVinData()) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return");

              case 13:

                newParams = _extends({}, vinData);
                _context2.next = 21;
                break;

              case 16:
                if (!(orderResult === "0")) {
                  _context2.next = 21;
                  break;
                }

                if (orderResultSeason) {
                  _context2.next = 20;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: "请填写未成交原因",
                  icon: "none"
                });
                return _context2.abrupt("return");

              case 20:
                newParams.orderResultSeason = orderResultSeason;

              case 21:

                newParams.orderResult = orderResult;

              case 22:
                if (!(cardType === "A" && fawOrder.timeoutFlag === 1 && !timeoutReason)) {
                  _context2.next = 25;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: "请填写超时理由",
                  icon: "none"
                });
                return _context2.abrupt("return");

              case 25:
                if (!(cardType === "A")) {
                  _context2.next = 33;
                  break;
                }

                _context2.next = 28;
                return _this2.uploadAllFile();

              case 28:
                successFileIds = _context2.sent;

                if (!(successFileIds.length === 0)) {
                  _context2.next = 32;
                  break;
                }

                _taroWeapp2.default.showToast({
                  title: "图片上传失败",
                  icon: "none"
                });
                return _context2.abrupt("return");

              case 32:

                newParams.fileAcCardIds = successFileIds.join(",");

              case 33:
                _this = _this2;

                if (!(cardType === "A")) {
                  _context2.next = 38;
                  break;
                }

                _taroWeapp2.default.showModal({
                  title: "确认并继续跟进",
                  content: "请继续跟进订单，同时请邀约用户进行试驾，并在试驾系统中及时完善预约试驾信息，以免在订单成交后影响您获取最终奖励。"
                }).then(function (res) {
                  if (!res.confirm) {
                    return false;
                  }
                  submit();
                });
                _context2.next = 43;
                break;

              case 38:
                if (!(cardType === "C")) {
                  _context2.next = 43;
                  break;
                }

                if (!(_this2.state.testDriveFlag === 1)) {
                  _context2.next = 42;
                  break;
                }

                submit();
                return _context2.abrupt("return");

              case 42:
                _taroWeapp2.default.showModal({
                  title: "用户未试驾",
                  content: "未查询到该用户的试驾信息，是否继续提交订单"
                }).then(function (res) {
                  if (!res.confirm) {
                    (0, _apis.customerTestDrive)({ orderId: _this2.orderId }).then(function (res) {
                      _this2.setState({
                        testDriveFlag: res.data
                      });
                    });
                  } else {
                    newParams.testDriveFlag = _this2.state.testDriveFlag;
                    submit();
                  }
                });

              case 43:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this4);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this2.updateVinCode = function (e) {
      var JSESSIONID = _storage2.default.get("JSESSIONID");
      _taroWeapp2.default.chooseImage({
        number: 1,
        success: function success(res) {
          _taroWeapp2.default.showLoading({
            title: "VIN码识别中..."
          });
          var tempFilePaths = res.tempFilePaths;
          _taroWeapp2.default.uploadFile({
            url: (0, _baseUrl2.default)("/api/") + "/api/v1/base/pubUpload",
            filePath: tempFilePaths[0],
            name: "file",
            header: {
              Cookie: JSESSIONID ? "SESSION=" + JSESSIONID : null
            },
            success: function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(res) {
                var fileId, res1, _res1$data, releaseDate, vinCode, carOwner;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        fileId = JSON.parse(res.data).data.id;
                        _context3.next = 4;
                        return (0, _apis.getVinCodeByImg)({ fileId: fileId });

                      case 4:
                        res1 = _context3.sent;
                        _res1$data = res1.data, releaseDate = _res1$data.releaseDate, vinCode = _res1$data.vinCode, carOwner = _res1$data.carOwner;

                        _this2.setState({
                          vinData: _extends({}, _this2.state.vinData, {
                            releaseDate: releaseDate,
                            vinCode: vinCode,
                            buyName: carOwner
                          })
                        });
                        _taroWeapp2.default.hideLoading();
                        _context3.next = 13;
                        break;

                      case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](0);

                        _taroWeapp2.default.hideLoading();

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this4, [[0, 10]]);
              }));

              function success(_x3) {
                return _ref4.apply(this, arguments);
              }

              return success;
            }(),
            error: function error() {
              _taroWeapp2.default.hideLoading();
            }
          });
        }
      });
    }, _this2.handleOrderTransfer = function () {
      _this2.setState({
        confirmLoading: true
      });
      var orderAdviserData = _this2.state.orderAdviserData;

      (0, _apis.setOrderTransfer)({
        orderId: _this2.orderId,
        userId: orderAdviserData.value
      }).then(function (res) {
        _this2.setState({
          confirmLoading: false
        });

        _taroWeapp2.default.navigateBack({
          delta: 1
        });
      });
    }, _this2.handleEcOrderComplete = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var _this2$state3, hasReplacementOrder, updateFiles, selectCarIndex, carOptions, orderAdviserData, fawOrder, timeoutReason, successFileIds;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              //orderAdviserData.value
              _this2$state3 = _this2.state, hasReplacementOrder = _this2$state3.hasReplacementOrder, updateFiles = _this2$state3.updateFiles, selectCarIndex = _this2$state3.selectCarIndex, carOptions = _this2$state3.carOptions, orderAdviserData = _this2$state3.orderAdviserData, fawOrder = _this2$state3.fawOrder, timeoutReason = _this2$state3.timeoutReason;

              if (!(updateFiles.length === 0)) {
                _context5.next = 4;
                break;
              }

              _taroWeapp2.default.showToast({
                title: "请上传图片",
                icon: "none"
              });
              return _context5.abrupt("return");

            case 4:
              if (!(hasReplacementOrder === "1")) {
                _context5.next = 11;
                break;
              }

              if (orderAdviserData) {
                _context5.next = 8;
                break;
              }

              _taroWeapp2.default.showToast({
                title: "请选择服务顾问",
                icon: "none"
              });
              return _context5.abrupt("return");

            case 8:
              if (selectCarIndex) {
                _context5.next = 11;
                break;
              }

              _taroWeapp2.default.showToast({
                title: "请选择意向车型",
                icon: "none"
              });
              return _context5.abrupt("return");

            case 11:
              _context5.next = 13;
              return _this2.uploadAllFile();

            case 13:
              successFileIds = _context5.sent;

              if (!(successFileIds.length === 0)) {
                _context5.next = 17;
                break;
              }

              _taroWeapp2.default.showToast({
                title: "图片上传失败",
                icon: "none"
              });
              return _context5.abrupt("return");

            case 17:
              if (!(fawOrder.timeoutFlag === 1 && !timeoutReason)) {
                _context5.next = 20;
                break;
              }

              _taroWeapp2.default.showToast({
                title: "请填写超时理由",
                icon: "none"
              });
              return _context5.abrupt("return");

            case 20:

              _this2.setState({
                confirmLoading: true
              });
              (0, _apis.setEcOrderComplete)({
                orderId: _this2.orderId,
                fileIds: successFileIds.join(","),
                hasReplacementOrder: hasReplacementOrder,
                intentionCarId: hasReplacementOrder === "1" ? carOptions[selectCarIndex].value : "",
                xsId: hasReplacementOrder === "1" ? orderAdviserData.value : ""
              }).then(function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(res) {
                  var res1;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return (0, _apis.setTimeoutReason)({
                            orderId: _this2.orderId,
                            timeoutReason: timeoutReason
                          });

                        case 2:
                          res1 = _context4.sent;


                          _this2.setState({
                            confirmLoading: false
                          });

                          _taroWeapp2.default.navigateBack({
                            delta: 1
                          });

                        case 5:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this4);
                }));

                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }());

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this4);
    })), _this2.getStatusUrl = function (order) {
      if (!order) {
        return null;
      }
      if (order.orderType === 1 && order.orderStatus >= 2) {
        return statusUrlMap[14];
      } else if (order.orderResult === 1) {
        return statusUrlMap[11];
      } else if (order.orderResult === 0) {
        return statusUrlMap[7];
      } else if (order.timeoutFlag === 1 && order.processStatus !== "WAIT_XS_C_CARD") {
        return statusUrlMap[9];
      } else {
        return statusUrlMap[10];
      }
    }, _this2.handleOrderClick = function (e) {
      var escFawOrderDTO = _this2.state.escFawOrderDTO;

      (0, _index.goTo)("order-details", {
        id: escFawOrderDTO.fawOrder.id
      });
    }, _this2.customComponents = ["AtActivityIndicator", "AtIcon", "AtImagePicker", "XRadio", "AtTextarea", "AtButton", "AtInput", "AtList", "AtListItem", "ListItem"], _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.orderId = this.$router.params.id;
      this.loadData();
      this.loadCarData();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.setState({
        userType: _storage2.default.get("userInfo").type
      });

      var orderAdviserData = _storage2.default.get("orderAdviserData");
      if (orderAdviserData) {
        this.setState({
          orderAdviserData: orderAdviserData
        });
      }
    }

    // renderStatusImage = ()

  }, {
    key: "_createData",
    value: function _createData() {
      var _this5 = this,
          _propsManager$set;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__324"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__324 = _genCompid2[0],
          $compid__324 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__325"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__325 = _genCompid4[0],
          $compid__325 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__326"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__326 = _genCompid6[0],
          $compid__326 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__327"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__327 = _genCompid8[0],
          $compid__327 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__328"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__328 = _genCompid10[0],
          $compid__328 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__329"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__329 = _genCompid12[0],
          $compid__329 = _genCompid12[1];

      var _genCompid13 = (0, _taroWeapp.genCompid)(__prefix + "$compid__330"),
          _genCompid14 = _slicedToArray(_genCompid13, 2),
          $prevCompid__330 = _genCompid14[0],
          $compid__330 = _genCompid14[1];

      var _genCompid15 = (0, _taroWeapp.genCompid)(__prefix + "$compid__331"),
          _genCompid16 = _slicedToArray(_genCompid15, 2),
          $prevCompid__331 = _genCompid16[0],
          $compid__331 = _genCompid16[1];

      var _genCompid17 = (0, _taroWeapp.genCompid)(__prefix + "$compid__332"),
          _genCompid18 = _slicedToArray(_genCompid17, 2),
          $prevCompid__332 = _genCompid18[0],
          $compid__332 = _genCompid18[1];

      var _genCompid19 = (0, _taroWeapp.genCompid)(__prefix + "$compid__333"),
          _genCompid20 = _slicedToArray(_genCompid19, 2),
          $prevCompid__333 = _genCompid20[0],
          $compid__333 = _genCompid20[1];

      var _genCompid21 = (0, _taroWeapp.genCompid)(__prefix + "$compid__334"),
          _genCompid22 = _slicedToArray(_genCompid21, 2),
          $prevCompid__334 = _genCompid22[0],
          $compid__334 = _genCompid22[1];

      var _genCompid23 = (0, _taroWeapp.genCompid)(__prefix + "$compid__335"),
          _genCompid24 = _slicedToArray(_genCompid23, 2),
          $prevCompid__335 = _genCompid24[0],
          $compid__335 = _genCompid24[1];

      var _genCompid25 = (0, _taroWeapp.genCompid)(__prefix + "$compid__336"),
          _genCompid26 = _slicedToArray(_genCompid25, 2),
          $prevCompid__336 = _genCompid26[0],
          $compid__336 = _genCompid26[1];

      var _genCompid27 = (0, _taroWeapp.genCompid)(__prefix + "$compid__337"),
          _genCompid28 = _slicedToArray(_genCompid27, 2),
          $prevCompid__337 = _genCompid28[0],
          $compid__337 = _genCompid28[1];

      var _genCompid29 = (0, _taroWeapp.genCompid)(__prefix + "$compid__338"),
          _genCompid30 = _slicedToArray(_genCompid29, 2),
          $prevCompid__338 = _genCompid30[0],
          $compid__338 = _genCompid30[1];

      var _genCompid31 = (0, _taroWeapp.genCompid)(__prefix + "$compid__339"),
          _genCompid32 = _slicedToArray(_genCompid31, 2),
          $prevCompid__339 = _genCompid32[0],
          $compid__339 = _genCompid32[1];

      var _genCompid33 = (0, _taroWeapp.genCompid)(__prefix + "$compid__340"),
          _genCompid34 = _slicedToArray(_genCompid33, 2),
          $prevCompid__340 = _genCompid34[0],
          $compid__340 = _genCompid34[1];

      var _genCompid35 = (0, _taroWeapp.genCompid)(__prefix + "$compid__341"),
          _genCompid36 = _slicedToArray(_genCompid35, 2),
          $prevCompid__341 = _genCompid36[0],
          $compid__341 = _genCompid36[1];

      var _genCompid37 = (0, _taroWeapp.genCompid)(__prefix + "$compid__342"),
          _genCompid38 = _slicedToArray(_genCompid37, 2),
          $prevCompid__342 = _genCompid38[0],
          $compid__342 = _genCompid38[1];

      var _genCompid39 = (0, _taroWeapp.genCompid)(__prefix + "$compid__343"),
          _genCompid40 = _slicedToArray(_genCompid39, 2),
          $prevCompid__343 = _genCompid40[0],
          $compid__343 = _genCompid40[1];

      var _genCompid41 = (0, _taroWeapp.genCompid)(__prefix + "$compid__344"),
          _genCompid42 = _slicedToArray(_genCompid41, 2),
          $prevCompid__344 = _genCompid42[0],
          $compid__344 = _genCompid42[1];

      var _genCompid43 = (0, _taroWeapp.genCompid)(__prefix + "$compid__345"),
          _genCompid44 = _slicedToArray(_genCompid43, 2),
          $prevCompid__345 = _genCompid44[0],
          $compid__345 = _genCompid44[1];

      var _genCompid45 = (0, _taroWeapp.genCompid)(__prefix + "$compid__346"),
          _genCompid46 = _slicedToArray(_genCompid45, 2),
          $prevCompid__346 = _genCompid46[0],
          $compid__346 = _genCompid46[1];

      var _genCompid47 = (0, _taroWeapp.genCompid)(__prefix + "$compid__347"),
          _genCompid48 = _slicedToArray(_genCompid47, 2),
          $prevCompid__347 = _genCompid48[0],
          $compid__347 = _genCompid48[1];

      var _genCompid49 = (0, _taroWeapp.genCompid)(__prefix + "$compid__348"),
          _genCompid50 = _slicedToArray(_genCompid49, 2),
          $prevCompid__348 = _genCompid50[0],
          $compid__348 = _genCompid50[1];

      var _genCompid51 = (0, _taroWeapp.genCompid)(__prefix + "$compid__349"),
          _genCompid52 = _slicedToArray(_genCompid51, 2),
          $prevCompid__349 = _genCompid52[0],
          $compid__349 = _genCompid52[1];

      var _genCompid53 = (0, _taroWeapp.genCompid)(__prefix + "$compid__350"),
          _genCompid54 = _slicedToArray(_genCompid53, 2),
          $prevCompid__350 = _genCompid54[0],
          $compid__350 = _genCompid54[1];

      var _genCompid55 = (0, _taroWeapp.genCompid)(__prefix + "$compid__351"),
          _genCompid56 = _slicedToArray(_genCompid55, 2),
          $prevCompid__351 = _genCompid56[0],
          $compid__351 = _genCompid56[1];

      var _genCompid57 = (0, _taroWeapp.genCompid)(__prefix + "$compid__352"),
          _genCompid58 = _slicedToArray(_genCompid57, 2),
          $prevCompid__352 = _genCompid58[0],
          $compid__352 = _genCompid58[1];

      var _genCompid59 = (0, _taroWeapp.genCompid)(__prefix + "$compid__353"),
          _genCompid60 = _slicedToArray(_genCompid59, 2),
          $prevCompid__353 = _genCompid60[0],
          $compid__353 = _genCompid60[1];

      var _genCompid61 = (0, _taroWeapp.genCompid)(__prefix + "$compid__354"),
          _genCompid62 = _slicedToArray(_genCompid61, 2),
          $prevCompid__354 = _genCompid62[0],
          $compid__354 = _genCompid62[1];

      var _state = this.__state,
          customer = _state.customer,
          fawDistributor = _state.fawDistributor,
          fawOrder = _state.fawOrder,
          assessmentCar = _state.assessmentCar,
          aCardFiles = _state.aCardFiles,
          cCardFiles = _state.cCardFiles,
          cars = _state.cars,
          fawOrderItem = _state.fawOrderItem,
          intentionCar = _state.intentionCar,
          orderAdviserData = _state.orderAdviserData,
          userType = _state.userType,
          selectCarIndex = _state.selectCarIndex,
          orderResult = _state.orderResult,
          escFiles = _state.escFiles,
          orderTimeDTO = _state.orderTimeDTO,
          escFawOrderDTO = _state.escFawOrderDTO,
          zhxcFawOrderDTO = _state.zhxcFawOrderDTO,
          fawOrderForwards = _state.fawOrderForwards,
          downTime = _state.downTime,
          isFetching = _state.isFetching,
          confirmLoading = _state.confirmLoading;


      if (isFetching) {
        _taroWeapp.propsManager.set({
          "mode": "center",
          "content": "\u52A0\u8F7D\u4E2D..."
        }, $compid__324, $prevCompid__324);
      }

      var userOrderStatus = userType + "_" + fawOrder.orderType + "_" + fawOrder.orderStatus;
      var saUser = fawOrderForwards.find(function (f) {
        return f.positionName === "FW";
      }) || {};
      var escUser = fawOrderForwards.find(function (f) {
        return f.positionName === "ESC";
      }) || {};
      var xsUser = fawOrderForwards.find(function (f) {
        return f.positionName === "XS";
      }) || {};

      var anonymousState__temp = this.getStatusUrl(fawOrder);
      var anonymousState__temp2 = cars.length > 0 ? cars.map(function (c) {
        return c.carName;
      }).join(",") : "无";
      var anonymousState__temp3 = fawOrderItem.checkPhone ? fawOrderItem.releaseDate.substr(0, 10) : null;
      var anonymousState__temp4 = /^ESC_1_1/g.test(userOrderStatus) ? ["compressed"] : null;
      var anonymousState__temp5 = /^ESC_1_1/g.test(userOrderStatus) ? this.__state.updateFiles.length < 2 : null;
      var anonymousState__temp6 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_A_CARD" ? ["compressed"] : null;
      var anonymousState__temp7 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_A_CARD" ? this.__state.updateFiles.length < 2 : null;
      var anonymousState__temp8 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ paddingTop: "12px" }) : null;

      this.anonymousFunc0 = function (e) {
        return _this5.setState({
          vinData: _extends({}, _this5.__state.vinData, {
            buyName: e
          })
        });
      };

      var anonymousState__temp9 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ paddingTop: "12px" }) : null;

      this.anonymousFunc1 = function (e) {
        var nextValue = e.replace(/[\W\s]+/g, "").substr(0, 17).toUpperCase();
        _this5.setState({
          vinData: _extends({}, _this5.__state.vinData, {
            vinCode: nextValue
          })
        });
        return nextValue;
      };

      var anonymousState__temp10 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ paddingTop: "12px" }) : null;

      this.anonymousFunc2 = function (e) {
        _this5.setState({
          vinData: _extends({}, _this5.__state.vinData, {
            releaseDate: e.target.value
          })
        });
      };

      var anonymousState__temp11 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ fontSize: "13px" }) : null;
      var anonymousState__temp12 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ paddingTop: "12px" }) : null;

      this.anonymousFunc3 = function (e) {
        return _this5.setState({
          vinData: _extends({}, _this5.__state.vinData, {
            phone: e
          })
        });
      };

      var anonymousState__temp13 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? (0, _taroWeapp.internal_inline_style)({ fontSize: "13px" }) : null;
      var anonymousState__temp14 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD" ? orderResult === "1" : null;

      this.anonymousFunc4 = function (e) {
        return (0, _index.goTo)("rule-details");
      };

      var anonymousState__temp15 = this.__state.hasReplacementOrder === "1" ? this.__state.carOptions.map(function (c) {
        return c.label;
      }) : null;
      var anonymousState__temp16 = this.__state.hasReplacementOrder === "1" ? selectCarIndex ? this.__state.carOptions[selectCarIndex].label : "请选择" : null;
      var anonymousState__temp17 = /^[12]/g.test(fawOrder.orderType + "");
      var anonymousState__temp18 = /^[234]/g.test(fawOrder.orderType + "");
      var anonymousState__temp19 = escUser.phone && /^[12]/g.test(fawOrder.orderType + "");
      var anonymousState__temp20 = xsUser.phone && /^[234]/g.test(fawOrder.orderType + "");
      var anonymousState__temp21 = /^[134]/g.test(fawOrder.orderType);
      var anonymousState__temp22 = /^[1]/g.test(fawOrder.orderType);
      var anonymousState__temp23 = /^[234]/g.test(fawOrder.orderType) || escFawOrderDTO;
      var anonymousState__temp24 = /^[234]/g.test(fawOrder.orderType) || escFawOrderDTO;
      var anonymousState__temp25 = /^ESC_1_1/g.test(userOrderStatus);
      var anonymousState__temp26 = /^ESC_1_1/g.test(userOrderStatus);
      var anonymousState__temp27 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_A_CARD";
      var anonymousState__temp28 = fawOrder.timeoutFlag === 1 && /^(ESC|XS)_[1234]_1/g.test(userOrderStatus) && /^WAIT_(ESC|XS_A_CARD)/g.test(fawOrder.processStatus);
      var anonymousState__temp29 = /^(ESC|XS|DZ)_[1234]_[123]/g.test(userOrderStatus) && fawOrder.timeoutFlag === 1 && (escUser.timeoutReason || xsUser.timeoutReason);
      var anonymousState__temp30 = /^(XS|DZ)_[234]_3/g.test(userOrderStatus) && fawOrder.orderResultReason;
      var anonymousState__temp31 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD";
      var anonymousState__temp32 = /^(FW|XS|ESC|DZ)_[234]_[123]/g.test(userOrderStatus) && /(WAIT_XS_C_CARD|FINISH)/g.test(fawOrder.processStatus);
      var anonymousState__temp33 = (/^(FW|XS|DZ)_[234]_3/g.test(userOrderStatus) || /^ESC_2_3/g.test(userOrderStatus) && zhxcFawOrderDTO) && fawOrder.orderResult === 1;
      var anonymousState__temp34 = /^DZ/.test(userType) && fawOrder.evaluationStatus === 1;
      var anonymousState__temp35 = /^FW_[34]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_SA" || /ESC_1_1/g.test(userOrderStatus) && this.__state.hasReplacementOrder === "1";
      var anonymousState__temp36 = fawOrder.processStatus === "WAIT_SA" && /^FW_[1]_1/g.test(userOrderStatus);
      var anonymousState__temp37 = fawOrder.processStatus === "WAIT_SA" && /^FW_[134]_1/.test(userOrderStatus);
      var anonymousState__temp38 = /^ESC_1_1/g.test(userOrderStatus);
      var anonymousState__temp39 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_C_CARD";
      var anonymousState__temp40 = /^XS_[234]_1/g.test(userOrderStatus) && fawOrder.processStatus === "WAIT_XS_A_CARD";
      fawOrder.orderType === 2 && escFawOrderDTO && _taroWeapp.propsManager.set({
        "value": "chevron-right",
        "size": "24",
        "className": "order-details__panel-heading-arrow",
        "color": "#666"
      }, $compid__325, $prevCompid__325);
      anonymousState__temp25 && _taroWeapp.propsManager.set({
        "sizeType": anonymousState__temp4,
        "className": "image-picker",
        "files": this.__state.updateFiles,
        "onChange": this.handleFileChange,
        "multiple": true,
        "showAddBtn": anonymousState__temp5,
        "length": 4
      }, $compid__326, $prevCompid__326);
      anonymousState__temp26 && _taroWeapp.propsManager.set({
        "className": "panel-body-options no-border",
        "options": hasReplacementOrderList,
        "onChange": this.handleWorkChange
      }, $compid__327, $prevCompid__327);
      anonymousState__temp27 && _taroWeapp.propsManager.set({
        "sizeType": anonymousState__temp6,
        "className": "image-picker",
        "files": this.__state.updateFiles,
        "onChange": this.handleFileChange,
        "showAddBtn": anonymousState__temp7,
        "length": 4
      }, $compid__328, $prevCompid__328);
      anonymousState__temp28 && _taroWeapp.propsManager.set({
        "placeholder": "\u8D85\u65F6\u7406\u7531..\uFF0C\u9650200\u5B57\u5185",
        "className": "textarea no-border",
        "maxLength": 200,
        "value": this.__state.timeoutReason,
        "onChange": this.handleTimeoutReasonChange
      }, $compid__329, $prevCompid__329);
      anonymousState__temp29 && _taroWeapp.propsManager.set({
        "disabled": true,
        "className": "textarea no-border",
        "value": escUser.timeoutReason || xsUser.timeoutReason
      }, $compid__330, $prevCompid__330);
      anonymousState__temp30 && _taroWeapp.propsManager.set({
        "disabled": true,
        "className": "textarea no-border",
        "value": fawOrder.orderResultReason
      }, $compid__331, $prevCompid__331);
      anonymousState__temp31 && _taroWeapp.propsManager.set({
        "type": "primary",
        "onClick": this.updateVinCode
      }, $compid__332, $prevCompid__332);
      anonymousState__temp31 && _taroWeapp.propsManager.set({
        "placeholder": "\u8BF7\u586B\u5199\u8D2D\u8F66\u4EBA\u59D3\u540D\u6216\u884C\u9A76\u8BC1\u626B\u63CF",
        "className": "textarea no-border",
        "value": this.__state.vinData.buyName,
        "onChange": this.anonymousFunc0
      }, $compid__333, $prevCompid__333);
      anonymousState__temp31 && _taroWeapp.propsManager.set({
        "placeholder": "\u8BF7\u586B\u519917\u4F4DVIN\u7801\u6216\u884C\u9A76\u8BC1\u626B\u63CF",
        "className": "textarea no-border",
        "value": this.__state.vinData.vinCode,
        "length": 17,
        "onChange": this.anonymousFunc1
      }, $compid__334, $prevCompid__334);
      anonymousState__temp31 && _taroWeapp.propsManager.set({
        "placeholder": "\u8BF7\u586B\u5199\u8D2D\u8F66\u4EBA11\u4F4D\u624B\u673A\u53F7",
        "className": "textarea no-border",
        "value": this.__state.vinData.phone,
        "length": 11,
        "type": "number",
        "onChange": this.anonymousFunc3
      }, $compid__335, $prevCompid__335);
      anonymousState__temp31 && _taroWeapp.propsManager.set({
        "disabled": anonymousState__temp14,
        "placeholder": "\u8BF7\u586B\u5199\u672A\u6210\u4EA4\u539F\u56E0\uFF0C\u9650200\u5B57",
        "className": "textarea no-border",
        "maxLength": 200,
        "value": this.__state.orderResultSeason,
        "onChange": this.handleOrderResultSeasonChange
      }, $compid__336, $prevCompid__336);
      anonymousState__temp32 && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__337, $prevCompid__337);
      anonymousState__temp32 && _taroWeapp.propsManager.set({
        "className": "no-border",
        "title": "\u9884\u7EA6\u8BD5\u9A7E",
        "extraText": this.__state.testDriveFlag === 1 ? "已试驾" : "未试驾"
      }, $compid__338, $prevCompid__338);
      anonymousState__temp33 && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__339, $prevCompid__339);
      anonymousState__temp33 && _taroWeapp.propsManager.set((_propsManager$set = {
        "className": "no-border",
        "title": "\u8BA2\u5355\u662F\u5426\u6709\u6548"
      }, _defineProperty(_propsManager$set, "className", "no-border"), _defineProperty(_propsManager$set, "extraText", fawOrder.orderEffectiveness === 1 ? "有效" : "无效"), _propsManager$set), $compid__340, $prevCompid__340);
      fawOrder.orderType === 1 && zhxcFawOrderDTO.fawOrder && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__341, $prevCompid__341);
      fawOrder.orderType === 1 && zhxcFawOrderDTO.fawOrder && _taroWeapp.propsManager.set({
        "className": "no-border",
        "title": "\u5173\u8054\u7684\u7F6E\u6362\u8BA2\u5355",
        "arrow": "right",
        "extraText": zhxcFawOrderDTO.fawOrder.orderNo,
        "onClick": _index.goTo.bind(this, "order-details", {
          id: zhxcFawOrderDTO.fawOrder.id
        })
      }, $compid__342, $prevCompid__342);
      anonymousState__temp34 && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__343, $prevCompid__343);
      anonymousState__temp34 && _taroWeapp.propsManager.set({
        "title": "\u8BA2\u5355\u5DF2\u8BC4\u4EF7",
        "arrow": "right",
        "onClick": _index.goTo.bind(this, "evaluation-details", {
          orderId: fawOrder.id
        })
      }, $compid__344, $prevCompid__344);
      anonymousState__temp35 && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__345, $prevCompid__345);
      anonymousState__temp35 && _taroWeapp.propsManager.set({
        "className": "no-border",
        "isRequire": true,
        "title": "\u9500\u552E\u987E\u95EE",
        "arrow": "right",
        "extraText": orderAdviserData ? orderAdviserData.label : "请选择",
        "onClick": _index.goTo.bind(this, "select-adviser", {
          userType: "XS"
        })
      }, $compid__346, $prevCompid__346);
      this.__state.hasReplacementOrder === "1" && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__347, $prevCompid__347);
      this.__state.hasReplacementOrder === "1" && _taroWeapp.propsManager.set({
        "className": "no-border",
        "isRequire": true,
        "title": "\u610F\u5411\u8F66\u578B",
        "arrow": "right"
      }, $compid__348, $prevCompid__348);
      anonymousState__temp36 && _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__349, $prevCompid__349);
      anonymousState__temp36 && _taroWeapp.propsManager.set({
        "className": "no-border",
        "isRequire": true,
        "title": "\u4E8C\u624B\u8F66\u987E\u95EE",
        "arrow": "right",
        "extraText": orderAdviserData ? orderAdviserData.label : "请选择",
        "onClick": _index.goTo.bind(this, "select-adviser", {
          userType: "ESC"
        })
      }, $compid__350, $prevCompid__350);
      anonymousState__temp37 && _taroWeapp.propsManager.set({
        "type": "primary",
        "disabled": !orderAdviserData || confirmLoading,
        "loading": confirmLoading,
        "onClick": this.handleOrderTransfer
      }, $compid__351, $prevCompid__351);
      anonymousState__temp38 && _taroWeapp.propsManager.set({
        "type": "primary",
        "loading": confirmLoading,
        "onClick": this.handleEcOrderComplete
      }, $compid__352, $prevCompid__352);
      anonymousState__temp39 && _taroWeapp.propsManager.set({
        "type": "primary",
        "loading": confirmLoading,
        "onClick": this.handleUploadAcCard.bind(this, "C")
      }, $compid__353, $prevCompid__353);
      anonymousState__temp40 && _taroWeapp.propsManager.set({
        "type": "primary",
        "loading": confirmLoading,
        "onClick": this.handleUploadAcCard.bind(this, "A")
      }, $compid__354, $prevCompid__354);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        anonymousState__temp9: anonymousState__temp9,
        anonymousState__temp10: anonymousState__temp10,
        anonymousState__temp11: anonymousState__temp11,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        anonymousState__temp14: anonymousState__temp14,
        anonymousState__temp15: anonymousState__temp15,
        anonymousState__temp16: anonymousState__temp16,
        anonymousState__temp17: anonymousState__temp17,
        anonymousState__temp18: anonymousState__temp18,
        anonymousState__temp19: anonymousState__temp19,
        anonymousState__temp20: anonymousState__temp20,
        anonymousState__temp21: anonymousState__temp21,
        anonymousState__temp22: anonymousState__temp22,
        anonymousState__temp23: anonymousState__temp23,
        anonymousState__temp24: anonymousState__temp24,
        anonymousState__temp25: anonymousState__temp25,
        anonymousState__temp26: anonymousState__temp26,
        anonymousState__temp27: anonymousState__temp27,
        anonymousState__temp28: anonymousState__temp28,
        anonymousState__temp29: anonymousState__temp29,
        anonymousState__temp30: anonymousState__temp30,
        anonymousState__temp31: anonymousState__temp31,
        anonymousState__temp32: anonymousState__temp32,
        anonymousState__temp33: anonymousState__temp33,
        anonymousState__temp34: anonymousState__temp34,
        anonymousState__temp35: anonymousState__temp35,
        anonymousState__temp36: anonymousState__temp36,
        anonymousState__temp37: anonymousState__temp37,
        anonymousState__temp38: anonymousState__temp38,
        anonymousState__temp39: anonymousState__temp39,
        anonymousState__temp40: anonymousState__temp40,
        $compid__324: $compid__324,
        $compid__325: $compid__325,
        $compid__326: $compid__326,
        $compid__327: $compid__327,
        $compid__328: $compid__328,
        $compid__329: $compid__329,
        $compid__330: $compid__330,
        $compid__331: $compid__331,
        $compid__332: $compid__332,
        $compid__333: $compid__333,
        $compid__334: $compid__334,
        $compid__335: $compid__335,
        $compid__336: $compid__336,
        $compid__337: $compid__337,
        $compid__338: $compid__338,
        $compid__339: $compid__339,
        $compid__340: $compid__340,
        $compid__341: $compid__341,
        $compid__342: $compid__342,
        $compid__343: $compid__343,
        $compid__344: $compid__344,
        $compid__345: $compid__345,
        $compid__346: $compid__346,
        $compid__347: $compid__347,
        $compid__348: $compid__348,
        $compid__349: $compid__349,
        $compid__350: $compid__350,
        $compid__351: $compid__351,
        $compid__352: $compid__352,
        $compid__353: $compid__353,
        $compid__354: $compid__354,
        escFawOrderDTO: escFawOrderDTO,
        evaluationStatusMap: evaluationStatusMap,
        saUser: saUser,
        escUser: escUser,
        xsUser: xsUser
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: "anonymousFunc1",
    value: function anonymousFunc1(e) {
      ;
    }
  }, {
    key: "anonymousFunc2",
    value: function anonymousFunc2(e) {
      ;
    }
  }, {
    key: "anonymousFunc3",
    value: function anonymousFunc3(e) {
      ;
    }
  }, {
    key: "anonymousFunc4",
    value: function anonymousFunc4(e) {
      ;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = ["handleOrderClick", "onPreviewImage", "handleOrderResultChange", "anonymousFunc2", "anonymousFunc4", "handleCarSelect"], _class.$$componentPath = "pages/order-details/index", _temp2);

//userOrderStatus

exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/order-details/index.wxml";

/***/ }),

/***/ "./src/assets/images/result_102x.png":
/*!*******************************************!*\
  !*** ./src/assets/images/result_102x.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/result_102x.png";

/***/ }),

/***/ "./src/assets/images/result_112x.png":
/*!*******************************************!*\
  !*** ./src/assets/images/result_112x.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/result_112x.png";

/***/ }),

/***/ "./src/assets/images/result_142x.png":
/*!*******************************************!*\
  !*** ./src/assets/images/result_142x.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/result_142x.png";

/***/ }),

/***/ "./src/assets/images/result_72x.png":
/*!******************************************!*\
  !*** ./src/assets/images/result_72x.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/result_72x.png";

/***/ }),

/***/ "./src/assets/images/result_92x.png":
/*!******************************************!*\
  !*** ./src/assets/images/result_92x.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/result_92x.png";

/***/ }),

/***/ "./src/pages/order-details/index.jsx":
/*!*******************************************!*\
  !*** ./src/pages/order-details/index.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE&":
/*!************************************************************************!*\
  !*** ./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE& ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/order-details/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE&":
/*!**************************************************************************!*\
  !*** ./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/order-details/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/order-details/index.scss":
/*!********************************************!*\
  !*** ./src/pages/order-details/index.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/order-details/index.jsx","runtime","vendors","common"]]]);