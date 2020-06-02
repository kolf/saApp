(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/owner-details/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE&":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE& ***!
  \*********************************************************************************************************************************************************/
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

__webpack_require__(/*! ./index.scss */ "./src/pages/owner-details/index.scss");

var _defaultAvatar = __webpack_require__(/*! ../../assets/images/default-avatar.png */ "./src/assets/images/default-avatar.png");

var _defaultAvatar2 = _interopRequireDefault(_defaultAvatar);

var _apis = __webpack_require__(/*! ../../servers/apis */ "./src/servers/apis.js");

var _options = __webpack_require__(/*! ../../utils/options */ "./src/utils/options.js");

var _index = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function loop(e) {
  e.stopPropagation();
}
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "data", "$compid__302", "$compid__303", "$compid__304", "$compid__305", "$compid__306", "$compid__307", "$compid__308", "$compid__309", "$compid__310", "$compid__311", "$compid__312", "$compid__313", "isNew", "newRealName", "isOpenedModal"], _this.config = {
      navigationBarTitleText: "车主详情"
    }, _this.state = {
      data: null,
      newRealName: "",
      isOpenedModal: false
    }, _this.handleSubmit = function () {
      var id = _this.$router.params.id;
      var newRealName = _this.state.newRealName;

      var params = {
        cuId: id
      };
      if (newRealName) {
        params.correctName = newRealName;
      }
      (0, _apis.confirmBind)(params).then(function (res) {
        _taroWeapp2.default.navigateBack({
          delta: 1
        });
      });
    }, _this.handleOrderClick = function (id) {
      (0, _index.goTo)("order-details", {
        id: id
      });
    }, _this.loadData = function () {
      var id = _this.$router.params.id;

      (0, _apis.getCuDetail)({ cuId: id }).then(function (res) {
        _this.setState({
          data: _extends({}, res.data, {
            avatarUrl: res.data.avatarUrl || _defaultAvatar2.default
          })
        });
      });
    }, _this.handleNameClick = function () {
      _this.setState({
        isOpenedModal: true
      });
    }, _this.confirmUpdateName = function (confirm) {
      if (!confirm) {
        _this.setState({
          newRealName: ""
        });
      } else {
        _this.setState({
          data: _extends({}, _this.state.data, {
            realName: _this.state.newRealName
          })
        });
      }
      _this.setState({
        isOpenedModal: false
      });
    }, _this.openAvater = function (url) {
      _taroWeapp2.default.previewImage({
        current: url,
        urls: [url]
      });
    }, _this.handleNameChange = function (value) {
      _this.setState({
        newRealName: value
      });
    }, _this.customComponents = ["AtModal", "AtModalHeader", "AtModalContent", "AtInput", "AtModalAction", "AtList", "AtListItem", "AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
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
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__302"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__302 = _genCompid2[0],
          $compid__302 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__303"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__303 = _genCompid4[0],
          $compid__303 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__304"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__304 = _genCompid6[0],
          $compid__304 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__305"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__305 = _genCompid8[0],
          $compid__305 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__306"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__306 = _genCompid10[0],
          $compid__306 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__307"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__307 = _genCompid12[0],
          $compid__307 = _genCompid12[1];

      var _genCompid13 = (0, _taroWeapp.genCompid)(__prefix + "$compid__308"),
          _genCompid14 = _slicedToArray(_genCompid13, 2),
          $prevCompid__308 = _genCompid14[0],
          $compid__308 = _genCompid14[1];

      var _genCompid15 = (0, _taroWeapp.genCompid)(__prefix + "$compid__309"),
          _genCompid16 = _slicedToArray(_genCompid15, 2),
          $prevCompid__309 = _genCompid16[0],
          $compid__309 = _genCompid16[1];

      var _genCompid17 = (0, _taroWeapp.genCompid)(__prefix + "$compid__310"),
          _genCompid18 = _slicedToArray(_genCompid17, 2),
          $prevCompid__310 = _genCompid18[0],
          $compid__310 = _genCompid18[1];

      var _genCompid19 = (0, _taroWeapp.genCompid)(__prefix + "$compid__311"),
          _genCompid20 = _slicedToArray(_genCompid19, 2),
          $prevCompid__311 = _genCompid20[0],
          $compid__311 = _genCompid20[1];

      var _genCompid21 = (0, _taroWeapp.genCompid)(__prefix + "$compid__312"),
          _genCompid22 = _slicedToArray(_genCompid21, 2),
          $prevCompid__312 = _genCompid22[0],
          $compid__312 = _genCompid22[1];

      var _genCompid23 = (0, _taroWeapp.genCompid)(__prefix + "$compid__313"),
          _genCompid24 = _slicedToArray(_genCompid23, 2),
          $prevCompid__313 = _genCompid24[0],
          $compid__313 = _genCompid24[1];

      var isNew = this.$router.params.isNew;
      var _state = this.__state,
          data = _state.data,
          isOpenedModal = _state.isOpenedModal,
          newRealName = _state.newRealName;


      if (!data) {
        return null;
      }

      this.anonymousFunc0 = isNew ? this.handleNameClick : loop;
      var anonymousState__temp = (0, _options.getOptionLabel)("genders", data.gender);
      var anonymousState__temp2 = (0, _index.getCityName)(data.city, data.province);
      var anonymousState__temp3 = data.carCount + "\u8F86";
      var anonymousState__temp4 = "\u5DF2\u53D1\u751F" + data.orderList.length + "\u7B14\u4E1A\u52A1";
      _taroWeapp.propsManager.set({
        "isOpened": isOpenedModal
      }, $compid__302, $prevCompid__302);
      _taroWeapp.propsManager.set({
        "clear": true,
        "className": "update-name__input no-border",
        "value": newRealName,
        "placeholder": "\u7ED1\u5B9A\u540E\u4E0D\u53EF\u66F4\u6539",
        "onChange": this.handleNameChange
      }, $compid__303, $prevCompid__303);
      _taroWeapp.propsManager.set({
        "title": "\u59D3\u540D",
        "extraText": data.realName,
        "arrow": isNew ? "right" : "",
        "onClick": this.anonymousFunc0
      }, $compid__304, $prevCompid__304);
      _taroWeapp.propsManager.set({
        "title": "\u6027\u522B",
        "extraText": anonymousState__temp
      }, $compid__305, $prevCompid__305);
      _taroWeapp.propsManager.set({
        "title": "\u624B\u673A\u53F7",
        "extraText": data.phone
      }, $compid__306, $prevCompid__306);
      _taroWeapp.propsManager.set({
        "title": "\u751F\u65E5",
        "extraText": data.birthday
      }, $compid__307, $prevCompid__307);
      _taroWeapp.propsManager.set({
        "title": "\u7231\u597D",
        "extraText": data.hobby
      }, $compid__308, $prevCompid__308);
      _taroWeapp.propsManager.set({
        "title": "\u5730\u533A",
        "extraText": anonymousState__temp2
      }, $compid__309, $prevCompid__309);
      _taroWeapp.propsManager.set({
        "title": "\u6240\u6709\u8F66\u8F86",
        "extraText": anonymousState__temp3,
        "className": "no-border"
      }, $compid__310, $prevCompid__310);
      _taroWeapp.propsManager.set({
        "className": "owner-details__order-list"
      }, $compid__311, $prevCompid__311);
      _taroWeapp.propsManager.set({
        "title": "\u8BA2\u5355\u4FE1\u606F",
        "extraText": anonymousState__temp4,
        "className": "no-border"
      }, $compid__312, $prevCompid__312);
      isNew === "1" && _taroWeapp.propsManager.set({
        "type": "primary",
        "onClick": this.handleSubmit
      }, $compid__313, $prevCompid__313);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        $compid__302: $compid__302,
        $compid__303: $compid__303,
        $compid__304: $compid__304,
        $compid__305: $compid__305,
        $compid__306: $compid__306,
        $compid__307: $compid__307,
        $compid__308: $compid__308,
        $compid__309: $compid__309,
        $compid__310: $compid__310,
        $compid__311: $compid__311,
        $compid__312: $compid__312,
        $compid__313: $compid__313,
        isNew: isNew
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = ["confirmUpdateName", "openAvater", "handleOrderClick"], _class.$$componentPath = "pages/owner-details/index", _temp2);
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/owner-details/index.wxml";

/***/ }),

/***/ "./src/pages/owner-details/index.jsx":
/*!*******************************************!*\
  !*** ./src/pages/owner-details/index.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE&":
/*!************************************************************************!*\
  !*** ./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE& ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/owner-details/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE&":
/*!**************************************************************************!*\
  !*** ./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/owner-details/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/owner-details/index.scss":
/*!********************************************!*\
  !*** ./src/pages/owner-details/index.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/owner-details/index.jsx","runtime","vendors","common"]]]);