(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/report-error/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE& ***!
  \********************************************************************************************************************************************************/
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

var _index = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.js");

__webpack_require__(/*! ./index.scss */ "./src/pages/report-error/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp7", "anonymousState__temp8", "$compid__361", "$compid__362", "$compid__363", "anonymousState__temp6", "activeKey", "showType", "data", "isFetching", "endDate"], _this.config = {
      navigationBarTitleText: "异常统计"
    }, _this.state = {
      activeKey: 0,
      showType: 0,
      data: {},
      isFetching: false,
      endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr) //默认前一天
    }, _this.tendencyRef = null, _this.loadData = function () {
      _this.setState({
        isFetching: true
      });

      _this.fetchAction().then(function (res) {
        _this.setState({
          isFetching: false,
          data: res.data
        });

        _this.timer = setTimeout(function () {
          clearTimeout(_this.timer);
          _this.drawData();
        }, 300);
      });
    }, _this.fetchAction = function () {
      var _this$state = _this.state,
          showType = _this$state.showType,
          activeKey = _this$state.activeKey;

      if (showType === 0) {
        return (0, _apis.timeoutDayStatisticsReport)(_this.makeParams());
      } else if (showType === 1) {
        return (0, _apis.getTimeoutStatisticsReport)({
          selectDate: _this.state.endDate
        }, tabList[activeKey].value);
      }
    }, _this.makeParams = function () {
      var newParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state2 = _this.state,
          endDate = _this$state2.endDate,
          activeKey = _this$state2.activeKey;

      var startDate = endDate;
      if (activeKey === 1) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "weeks").format(formatStr);
      } else if (activeKey === 2) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "months").format(formatStr);
      }
      return _extends({
        startDate: startDate,
        endDate: endDate
      }, newParams);
    }, _this.drawData = function () {
      var _this$state3 = _this.state,
          data = _this$state3.data,
          showType = _this$state3.showType;

      if (showType === 0) {
        // console.log(data);
        var timeoutTotal = data.timeoutTotal;

        _this.tendencyRef.guide().text({
          position: ["50%", "45%"],
          content: timeoutTotal.total,
          style: {
            fill: "#333333", // 文本颜色
            fontSize: "29", // 文本大小
            fontWeight: "bold" // 文本粗细
          }
        });
        _this.tendencyRef.changeData(_this.makeTendencyData(data));
      } else if (showType === 1) {
        _this.statisticalRef.changeData(_this.makeStatisticalData(data));
      }
    }, _this.makeTendencyData = function (data) {
      var _data$timeoutTotal = data.timeoutTotal,
          escTotal = _data$timeoutTotal.escTotal,
          xsTotal = _data$timeoutTotal.xsTotal,
          total = _data$timeoutTotal.total;


      return [{
        name: "二手车部占比",
        percent: total === 0 ? 0.5 : (escTotal / total).toFixed(2) * 1,
        a: "1"
      }, {
        name: "销售部占比",
        percent: total === 0 ? 0.5 : (xsTotal / total).toFixed(2) * 1,
        a: "1"
      }];
    }, _this.makeStatisticalData = function (data) {
      return data.reduce(function (result, item) {
        var escpgTotal = item.escpgTotal,
            zhxcTotal = item.zhxcTotal,
            zgxcTotal = item.zgxcTotal,
            zjsTotal = item.zjsTotal,
            orderDate = item.orderDate,
            total = item.total;

        var count = total;
        result = [].concat(_toConsumableArray(result), [{
          name: "二手车评估",
          date: orderDate,
          num: escpgTotal,
          count: count
        }, {
          name: "置换新车",
          date: orderDate,
          num: zhxcTotal,
          count: count
        }, {
          name: "再购新车",
          date: orderDate,
          num: zgxcTotal,
          count: count
        }, { name: "转介绍", date: orderDate, num: zjsTotal, count: count }]);

        return result;
      }, []);
    }, _this.makeStatisticalTableData = function (data) {
      return Array.isArray(data) ? data : [];
    }, _this.handleDateChange = function (n) {
      var endDate = _this.state.endDate;


      var nextEndDate = null;
      if (n === -1) {
        nextEndDate = (0, _moment2.default)(endDate).subtract(1, "days").format(formatStr);
      } else if (n === 1) {
        nextEndDate = (0, _moment2.default)(endDate).add(1, "days").format(formatStr);
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
    }, _this.customComponents = ["AtActivityIndicator", "TendencyChart", "StatisticalChart", "AtTabs", "AtSegmentedControl", "Pager"], _temp), _possibleConstructorReturn(_this, _ret);
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
  }, {
    key: "_createMainData",
    value: function _createMainData(_$uid) {
      var _this2 = this;

      return function () {
        var _$anonymousState__temp, _$anonymousState__temp2, _$anonymousState__temp3, _$anonymousState__temp4, _$anonymousState__temp5;

        var _genCompid = (0, _taroWeapp.genCompid)(_$uid + "$compid__358"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__358 = _genCompid2[0],
            $compid__358 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(_$uid + "$compid__359"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__359 = _genCompid4[0],
            $compid__359 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(_$uid + "$compid__360"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__360 = _genCompid6[0],
            $compid__360 = _genCompid6[1];

        var $anonymousCallee__15 = void 0;

        var _state = _this2.state,
            showType = _state.showType,
            data = _state.data,
            isFetching = _state.isFetching;

        if (isFetching) {
          _taroWeapp.propsManager.set({
            "mode": "center",
            "content": "\u52A0\u8F7D\u4E2D..."
          }, $compid__358, $prevCompid__358);
        }
        if (showType === 0) {
          _$anonymousState__temp = function _$anonymousState__temp(r) {
            return _this2.tendencyRef = r;
          };

          _$anonymousState__temp2 = (0, _index.toPercentage)(data.timeoutRate ? data.timeoutRate.xsRate : 0);
          _$anonymousState__temp3 = (0, _index.toPercentage)(data.timeoutRate ? data.timeoutRate.escRate : 0);
          _$anonymousState__temp4 = (0, _index.toPercentage)(data.timeoutRate ? data.timeoutRate.totalRate : 0);
          _taroWeapp.propsManager.set({
            "title": "\u8D85\u65F6\u53F0\u6570",
            "saveRef": _$anonymousState__temp
          }, $compid__359, $prevCompid__359);
        } else if (showType === 1) {
          _$anonymousState__temp5 = function _$anonymousState__temp5(r) {
            return _this2.statisticalRef = r;
          };

          $anonymousCallee__15 = _this2.makeStatisticalTableData(data);
          _taroWeapp.propsManager.set({
            "saveRef": _$anonymousState__temp5
          }, $compid__360, $prevCompid__360);
        }
        return {
          _$anonymousState__temp: _$anonymousState__temp,
          _$anonymousState__temp2: _$anonymousState__temp2,
          _$anonymousState__temp3: _$anonymousState__temp3,
          _$anonymousState__temp4: _$anonymousState__temp4,
          _$anonymousState__temp5: _$anonymousState__temp5,
          $compid__358: $compid__358,
          $compid__359: $compid__359,
          $compid__360: $compid__360,
          isFetching: isFetching,
          data: data,
          showType: showType,
          $anonymousCallee__15: $anonymousCallee__15
        };
      };
    }

    //   escpgTotal: 0
    // orderDate: "09月13日"
    // total: 0
    // zgxcTotal: 0
    // zhxcTotal: 0
    // zjsTotal: 0

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__361"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__361 = _genCompid8[0],
          $compid__361 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__362"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__362 = _genCompid10[0],
          $compid__362 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__363"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__363 = _genCompid12[0],
          $compid__363 = _genCompid12[1];

      var _state2 = this.__state,
          activeKey = _state2.activeKey,
          showType = _state2.showType;


      var anonymousState__temp6 = this._createMainData(__prefix + "dazzzzzzzz")();

      var anonymousState__temp7 = ["异常统计", "异常趋势"];
      var anonymousState__temp8 = this.getPagerTitle();
      _taroWeapp.propsManager.set({
        "current": activeKey,
        "tabList": tabList,
        "onClick": this.handleTabClick.bind(this),
        "animated": false
      }, $compid__361, $prevCompid__361);
      _taroWeapp.propsManager.set({
        "current": showType,
        "onClick": this.handleDateTypeChange,
        "values": anonymousState__temp7
      }, $compid__362, $prevCompid__362);
      _taroWeapp.propsManager.set({
        "title": anonymousState__temp8,
        "onNext": this.handleDateChange.bind(this, 1),
        "onPrev": this.handleDateChange.bind(this, -1)
      }, $compid__363, $prevCompid__363);
      Object.assign(this.__state, {
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        $compid__361: $compid__361,
        $compid__362: $compid__362,
        $compid__363: $compid__363,
        anonymousState__temp6: anonymousState__temp6
      });
      return this.__state;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/report-error/index", _temp2);
//timeoutNoDeal


exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/report-error/index.wxml";

/***/ }),

/***/ "./src/pages/report-error/index.jsx":
/*!******************************************!*\
  !*** ./src/pages/report-error/index.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE&":
/*!***********************************************************************!*\
  !*** ./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-error/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE&":
/*!*************************************************************************!*\
  !*** ./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-error/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/report-error/index.scss":
/*!*******************************************!*\
  !*** ./src/pages/report-error/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/report-error/index.jsx","runtime","vendors","common"]]]);