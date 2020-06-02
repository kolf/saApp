(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/report-top10-er/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _apis = __webpack_require__(/*! ../../servers/apis */ "./src/servers/apis.js");

var _f = __webpack_require__(/*! @antv/f2 */ "./node_modules/@antv/f2/build/f2.js");

var _f2 = _interopRequireDefault(_f);

__webpack_require__(/*! ./index.scss */ "./src/pages/report-top10-er/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formatStr = "YYYY-MM-DD";

var tabList = [{ title: "\u65E5", value: "days" }, { title: "\u5468", value: "weeks" }, { title: "\u6708", value: "months" }];

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp2", "anonymousState__temp3", "$compid__435", "$compid__436", "$compid__437", "anonymousState__temp", "activeKey", "showType", "data", "zheData", "zhuData", "isFetching", "endDate"], _this.config = {
      navigationBarTitleText: "二手车部排行榜"
    }, _this.state = {
      activeKey: 0,
      showType: 0,
      data: {},
      zheData: [],
      zhuData: [],
      isFetching: false,
      endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr) //默认前一天
    }, _this.loadData = function () {
      _this.setState({
        isFetching: true
      });
      var _this$state = _this.state,
          showType = _this$state.showType,
          activeKey = _this$state.activeKey;

      if (showType == 0) {
        _this.fetchAction().then(function (res) {
          _this.setState({
            isFetching: false,
            data: res.data
          });
        });
      } else {
        _this.fetchAction().then(function (res) {
          _this.setState({
            isFetching: false,
            data: res.data
          });
        });
      }
    }, _this.fetchAction = function () {
      var showType = _this.state.showType;

      if (showType === 0) {
        return (0, _apis.getesTopTotal)(_this.makeParams());
      } else if (showType === 1) {
        return (0, _apis.getescstatistics)(_this.makeParams());
      }
    }, _this.makeParams = function () {
      var newParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state2 = _this.state,
          endDate = _this$state2.endDate,
          activeKey = _this$state2.activeKey,
          showType = _this$state2.showType;

      var startDate = endDate;
      var dateType = null;
      var selectDate = null;
      var parms = {};
      if (activeKey === 1) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "weeks").format(formatStr);
        dateType = "WEEK";
      } else if (activeKey === 2) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "months").format(formatStr);
        dateType = "MONTH";
      } else {
        dateType = "DAY";
      }
      if (showType) {
        parms.dateTime = endDate;
        selectDate = endDate;
      } else {
        parms.startDateTime = startDate;
        parms.endDateTime = endDate;
        selectDate = endDate;
      }
      if (showType == 0) {
        return _extends({
          dateType: dateType,
          selectDate: selectDate
        }, newParams);
      } else {
        return _extends({
          dateType: dateType,
          selectDate: selectDate
        }, newParams);
      }
    }, _this.drawDatass = function (canvas, width, height) {
      var data = _this.state.data;

      var shuju = data.escTopReports;
      var arr = [];
      if (shuju) {
        // console.log('判断予以',shuju)
        shuju.map(function (val) {
          arr.push({ action: val.name, value: val.total });
        });
        // console.log('666666',arr)
      }
      // console.log('333333',arr)
      var Global = _f2.default.Global;
      var datas = arr.sort(function (a, b) {
        return a.value - b.value;
      });
      var chart = new _f2.default.Chart({
        el: canvas,
        width: width,
        height: height
      });
      chart.source(datas, {
        sales: {
          tickCount: 1
        }
      });
      chart.coord({
        transposed: true
      });
      chart.axis("action", {
        line: Global._defaultAxis.line,
        grid: null
      });
      chart.axis("value", {
        line: null,
        grid: Global._defaultAxis.grid,
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      chart.interval().position("action*value");

      // 绘制文本
      datas.map(function (obj) {
        chart.guide().text({
          position: [obj.opaction, obj.value],
          content: obj.value,
          style: {
            textAlign: "start"
          },
          offsetX: 10
        });
      });
      chart.render();
    }, _this.drawData = function (canvas, width, height) {
      var data = _this.state.data;

      var shuju = data.resultList;
      console.log("sss", shuju);
      var arr = [];
      if (shuju) {
        shuju.map(function (val) {
          val.dataList.map(function (item) {
            arr.push({
              country: item.realName,
              year: val.orderDate,
              value: item.count
            });
          });
          return arr;
        });
      }
      console.log("二手车", arr);
      var datas = arr;
      var chart = new _f2.default.Chart({
        el: canvas,
        width: width,
        height: height
      });
      chart.source(datas, {
        year: {
          range: [0, 1]
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        custom: true,
        onChange: function onChange(obj) {
          var legend = chart.get("legendController").legends.top[0];
          var tooltipItems = obj.items;
          var legendItems = legend.items;
          var map = {};
          legendItems.map(function (item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.map(function (item) {
            var name = item.name;
            var value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          var legend = chart.get("legendController").legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.line().position("year*value").color("country").size(2).adjust("stack");
      chart.point().position("year*value").color("country").adjust("stack");
      chart.render();
    }, _this.makeTendencyTableData = function (data) {
      var newArr = JSON.parse(JSON.stringify(data));
      var sdata = newArr.escTopReports;
      if (sdata) {
        sdata.unshift(newArr.total);
        sdata.push(newArr.avg);
        return Object.values(sdata).map(function (item) {
          var _ref2;

          return _ref2 = {
            name: item.name,
            escpgTotal: item.escpgTotal
          }, _defineProperty(_ref2, "escpgTotal", item.esczhTotal), _defineProperty(_ref2, "total", item.total), _ref2;
        });
      }
    }, _this.makeStatisticalTableData = function (data) {
      var result = data.resultList;
      var newArr = [];
      if (result) {
        _this.setState({
          zheData: result[0].dataList
        });
        result.map(function (item) {
          var oldData = {};
          var orderDate = item.orderDate;
          item.dataList.map(function (val) {
            oldData.orderDate = orderDate;
            oldData[val.escUserId] = val.count;
          });
          newArr.push(oldData);
        });
        // console.log('55555555555555555555555555555555',newArr)
        return newArr;
      }
      return Object.values(newArr).map(function (item) {
        var _ref3;

        return _ref3 = {
          name: item.name,
          escpgTotal: item.escpgTotal
        }, _defineProperty(_ref3, "escpgTotal", item.esczhTotal), _defineProperty(_ref3, "total", item.total), _ref3;
      });
    }, _this.handleDateChange = function (n) {
      var _this$state3 = _this.state,
          endDate = _this$state3.endDate,
          activeKey = _this$state3.activeKey;

      var unit = tabList[activeKey].value;

      var nextEndDate = null;
      if (n === -1) {
        nextEndDate = (0, _moment2.default)(endDate).subtract(1, unit).format(formatStr);
      } else if (n === 1) {
        nextEndDate = (0, _moment2.default)(endDate).add(1, unit).format(formatStr);
      }
      _this.setState({
        endDate: nextEndDate
      }, _this.loadData);
    }, _this.handleTabClick = function (e) {
      _this.setState({
        activeKey: e,
        endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr)
      }, _this.loadData);
    }, _this.handleDateTypeChange = function (e) {
      _this.setState({
        showType: e,
        endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr)
      }, _this.loadData);
    }, _this.getPagerTitle = function () {
      var _this$state4 = _this.state,
          endDate = _this$state4.endDate,
          activeKey = _this$state4.activeKey;

      var unit = tabList[activeKey].value;
      var endDateStr = (0, _moment2.default)(endDate).format("YYYY年MM月D日");
      var startDateStr = (0, _moment2.default)(endDate).format("YYYY年MM月D日");
      if (activeKey === 1) {
        startDateStr = (0, _moment2.default)(endDate).subtract(1, unit).format("YYYY年MM月D日");
      } else if (activeKey === 2) {
        startDateStr = (0, _moment2.default)(endDate).subtract(1, unit).format("YYYY年MM月D日");
      }
      if (startDateStr === endDateStr) {
        return startDateStr;
      } else {
        return startDateStr + "-" + endDateStr;
      }
    }, _this.customComponents = ["AtActivityIndicator", "F2Canvas", "AtTabs", "AtSegmentedControl", "Pager"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.loadData();
    }
    //请求数据

    //发起请求

    //接口参数

    //柱状图

    //折线图

    //柱状图标下方的表格数据

    //折线图下方表格数据

    //时间切换数据变化

    //切换趋势和总排行

    //切换年月日数据变化

  }, {
    key: "_createMainData",
    value: function _createMainData(_$uid) {
      var _this2 = this;

      return function () {
        var _genCompid = (0, _taroWeapp.genCompid)(_$uid + "$compid__432"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__432 = _genCompid2[0],
            $compid__432 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(_$uid + "$compid__433"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__433 = _genCompid4[0],
            $compid__433 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(_$uid + "$compid__434"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__434 = _genCompid6[0],
            $compid__434 = _genCompid6[1];

        var $anonymousCallee__24 = void 0;
        var $anonymousCallee__22 = void 0;

        var _state = _this2.state,
            showType = _state.showType,
            data = _state.data,
            isFetching = _state.isFetching;

        if (isFetching) {
          _taroWeapp.propsManager.set({
            "mode": "center",
            "content": "\u52A0\u8F7D\u4E2D..."
          }, $compid__432, $prevCompid__432);
        }
        if (showType === 0) {
          $anonymousCallee__22 = data ? _this2.makeTendencyTableData(data) : [];
          _taroWeapp.propsManager.set({
            "onCanvasInit": _this2.drawDatass
          }, $compid__433, $prevCompid__433);
        } else if (showType === 1) {
          $anonymousCallee__24 = _this2.makeStatisticalTableData(data);
          _taroWeapp.propsManager.set({
            "onCanvasInit": _this2.drawData
          }, $compid__434, $prevCompid__434);
        }
        return {
          $compid__432: $compid__432,
          $compid__433: $compid__433,
          $compid__434: $compid__434,
          isFetching: isFetching,
          data: data,
          showType: showType,
          $anonymousCallee__22: $anonymousCallee__22,
          $anonymousCallee__24: $anonymousCallee__24,
          zheData: _this2.state.zheData
        };
      };
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__435"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__435 = _genCompid8[0],
          $compid__435 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__436"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__436 = _genCompid10[0],
          $compid__436 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__437"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__437 = _genCompid12[0],
          $compid__437 = _genCompid12[1];

      var _state2 = this.__state,
          activeKey = _state2.activeKey,
          showType = _state2.showType;


      var anonymousState__temp = this._createMainData(__prefix + "eczzzzzzzz")();

      var anonymousState__temp2 = ["二手车完成台数", "二手车完成台数趋势"];
      var anonymousState__temp3 = this.getPagerTitle();
      _taroWeapp.propsManager.set({
        "current": activeKey,
        "tabList": tabList,
        "onClick": this.handleTabClick.bind(this),
        "animated": false
      }, $compid__435, $prevCompid__435);
      _taroWeapp.propsManager.set({
        "current": showType,
        "onClick": this.handleDateTypeChange,
        "values": anonymousState__temp2
      }, $compid__436, $prevCompid__436);
      _taroWeapp.propsManager.set({
        "title": anonymousState__temp3,
        "onNext": this.handleDateChange.bind(this, 1),
        "onPrev": this.handleDateChange.bind(this, -1)
      }, $compid__437, $prevCompid__437);
      Object.assign(this.__state, {
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        $compid__435: $compid__435,
        $compid__436: $compid__436,
        $compid__437: $compid__437,
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/report-top10-er/index", _temp2);
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/report-top10-er/index.wxml";

/***/ }),

/***/ "./src/pages/report-top10-er/index.jsx":
/*!*********************************************!*\
  !*** ./src/pages/report-top10-er/index.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE&":
/*!**************************************************************************!*\
  !*** ./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-top10-er/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE&":
/*!****************************************************************************!*\
  !*** ./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-top10-er/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/report-top10-er/index.scss":
/*!**********************************************!*\
  !*** ./src/pages/report-top10-er/index.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/report-top10-er/index.jsx","runtime","vendors","common"]]]);