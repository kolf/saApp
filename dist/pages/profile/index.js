(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/profile/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/profile/index.jsx?taro&type=script&parse=PAGE&":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/profile/index.jsx?taro&type=script&parse=PAGE& ***!
  \***************************************************************************************************************************************************/
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

var _storage = __webpack_require__(/*! ../../utils/storage */ "./src/utils/storage.js");

var _storage2 = _interopRequireDefault(_storage);

__webpack_require__(/*! ./index.scss */ "./src/pages/profile/index.scss");

var _defaultAvatar = __webpack_require__(/*! ../../assets/images/default-avatar.png */ "./src/assets/images/default-avatar.png");

var _defaultAvatar2 = _interopRequireDefault(_defaultAvatar);

var _apis = __webpack_require__(/*! ../../servers/apis */ "./src/servers/apis.js");

var _options = __webpack_require__(/*! ../../utils/options */ "./src/utils/options.js");

var _index = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.js");

var _baseUrl = __webpack_require__(/*! ../../servers/baseUrl */ "./src/servers/baseUrl.js");

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function loop(e) {
  e.stopPropagation();
}
var genders = (0, _options.getOptions)("genders");
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__254", "$compid__255", "$compid__256", "$compid__257", "$compid__258", "$compid__259", "$compid__260", "$compid__261", "$compid__262", "$compid__263", "$compid__264", "userInfo", "submitUserInfo", "genderNames", "confirmLoading"], _this.config = {
      navigationBarTitleText: "完善个人信息"
    }, _this.state = {
      confirmLoading: false,
      userInfo: {},
      submitUserInfo: {},
      genderNames: genders.map(function (o) {
        return o.label;
      })
    }, _this.loadData = function () {
      (0, _apis.getUserInfo)().then(function (res) {
        var userInfo = res.data;
        _this.setState({
          userInfo: userInfo
        });

        _storage2.default.set("userInfo", userInfo);
      });
    }, _this.getSubmitDisabledStatus = function () {
      var _this$state$userInfo = _this.state.userInfo,
          workStart = _this$state$userInfo.workStart,
          avatarUrl = _this$state$userInfo.avatarUrl,
          gender = _this$state$userInfo.gender,
          realName = _this$state$userInfo.realName;

      return !workStart || !avatarUrl || !gender || !realName;
    }, _this.handleSubmit = function () {
      _this.setState({
        confirmLoading: true
      });
      (0, _apis.submitDZ)().then(function (res) {
        _this.setState({
          confirmLoading: false
        });

        var userInfo = _this.state.userInfo;

        var checkStatus = userInfo.checkStatus;
        _taroWeapp2.default.redirectTo({
          url: "/pages/review-result/index?checkStatus=" + checkStatus
        });
      });
    }, _this.handleGenderChange = function (e) {
      _taroWeapp2.default.showModal({
        title: "提示",
        content: "性别一经确认，无法修改，请正确选择您的性别"
      }).then(function (res) {
        if (!res.confirm) {
          return false;
        }

        var gender = genders[e.target.value].value;
        (0, _apis.updateGender)({ gender: gender }).then(function (res) {
          var nextSubmitUserInfo = _extends({}, _this.state.submitUserInfo, {
            gender: gender
          });
          var nextUserInfo = _extends({}, _this.state.userInfo, {
            gender: gender
          });
          _this.setState({
            userInfo: nextUserInfo,
            submitUserInfo: nextSubmitUserInfo
          });
        });
      });
    }, _this.handleDateChange = function (e) {
      _taroWeapp2.default.showModal({
        title: "提示",
        content: "请正确选择您在本店工作的开始时间，如果输 入有误，可能会影响车主对您的选择"
      }).then(function (res) {
        if (!res.confirm) {
          return false;
        }

        var workStart = e.target.value;
        (0, _apis.updateWorkStart)({
          workStart: workStart
        }).then(function (res) {
          var nextSubmitUserInfo = _extends({}, _this.state.submitUserInfo, {
            workStart: workStart
          });
          var nextUserInfo = _extends({}, _this.state.userInfo, {
            workStart: workStart
          });
          _this.setState({
            userInfo: nextUserInfo,
            submitUserInfo: nextSubmitUserInfo
          });
        });
      });
    }, _this.handleAvatarChange = function () {
      var JSESSIONID = _storage2.default.get("JSESSIONID");
      _taroWeapp2.default.chooseImage({
        number: 1,
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          _taroWeapp2.default.uploadFile({
            url: (0, _baseUrl2.default)("/api/v1/base/upload") + "/api/v1/base/upload",
            filePath: tempFilePaths[0],
            name: "file",
            header: {
              Cookie: JSESSIONID ? "SESSION=" + JSESSIONID : null
            },
            success: function success(res) {
              var avatarUrl = JSON.parse(res.data).data;
              var nextUserInfo = _extends({}, _this.state.userInfo, {
                avatarUrl: avatarUrl
              });
              _this.setState({
                userInfo: nextUserInfo
              });

              _storage2.default.set("userInfo", nextUserInfo);
            }
          });
        }
      });
    }, _this.customComponents = ["AtList", "AtListItem", "ListItem", "AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
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
      if (_storage2.default.get("submitRealName")) {
        this.setState({
          submitUserInfo: _extends({}, this.state.submitUserInfo, {
            realName: _storage2.default.get("submitRealName")
          })
        });
      }
    }

    // 手机号修改后，需要使用修改后的手机号重新登录

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__254"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__254 = _genCompid2[0],
          $compid__254 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__255"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__255 = _genCompid4[0],
          $compid__255 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__256"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__256 = _genCompid6[0],
          $compid__256 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__257"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__257 = _genCompid8[0],
          $compid__257 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__258"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__258 = _genCompid10[0],
          $compid__258 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__259"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__259 = _genCompid12[0],
          $compid__259 = _genCompid12[1];

      var _genCompid13 = (0, _taroWeapp.genCompid)(__prefix + "$compid__260"),
          _genCompid14 = _slicedToArray(_genCompid13, 2),
          $prevCompid__260 = _genCompid14[0],
          $compid__260 = _genCompid14[1];

      var _genCompid15 = (0, _taroWeapp.genCompid)(__prefix + "$compid__261"),
          _genCompid16 = _slicedToArray(_genCompid15, 2),
          $prevCompid__261 = _genCompid16[0],
          $compid__261 = _genCompid16[1];

      var _genCompid17 = (0, _taroWeapp.genCompid)(__prefix + "$compid__262"),
          _genCompid18 = _slicedToArray(_genCompid17, 2),
          $prevCompid__262 = _genCompid18[0],
          $compid__262 = _genCompid18[1];

      var _genCompid19 = (0, _taroWeapp.genCompid)(__prefix + "$compid__263"),
          _genCompid20 = _slicedToArray(_genCompid19, 2),
          $prevCompid__263 = _genCompid20[0],
          $compid__263 = _genCompid20[1];

      var _genCompid21 = (0, _taroWeapp.genCompid)(__prefix + "$compid__264"),
          _genCompid22 = _slicedToArray(_genCompid21, 2),
          $prevCompid__264 = _genCompid22[0],
          $compid__264 = _genCompid22[1];

      var _state = this.__state,
          userInfo = _state.userInfo,
          genderNames = _state.genderNames,
          submitUserInfo = _state.submitUserInfo;

      if (!userInfo) {
        return null;
      }

      this.anonymousFunc0 = submitUserInfo.realName ? loop : _index.goTo.bind(this, "update-name");
      var anonymousState__temp = userInfo.gender ? (0, _options.getOptionLabel)("genders", userInfo.gender) : "必填项";

      var anonymousState__temp2 = this.getSubmitDisabledStatus() || this.__state.confirmLoading;

      _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__254, $prevCompid__254);
      _taroWeapp.propsManager.set({
        "isRequire": true,
        "title": "\u5934\u50CF",
        "extraThumb": userInfo.avatarUrl || _defaultAvatar2.default,
        "onClick": this.handleAvatarChange,
        "arrow": "right"
      }, $compid__255, $prevCompid__255);
      _taroWeapp.propsManager.set({
        "isRequire": true,
        "title": "\u59D3\u540D",
        "extraText": userInfo.realName || "必填项",
        "arrow": submitUserInfo.realName ? "" : "right",
        "onClick": this.anonymousFunc0
      }, $compid__256, $prevCompid__256);
      _taroWeapp.propsManager.set({
        "title": "\u6027\u522B",
        "isRequire": true,
        "arrow": submitUserInfo.gender ? "" : "right"
      }, $compid__257, $prevCompid__257);
      _taroWeapp.propsManager.set({
        "isRequire": true,
        "title": "\u624B\u673A\u53F7",
        "extraText": userInfo.phone
      }, $compid__258, $prevCompid__258);
      _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__259, $prevCompid__259);
      _taroWeapp.propsManager.set({
        "title": "\u5F00\u59CB\u5DE5\u4F5C\u65F6\u95F4",
        "isRequire": true,
        "arrow": submitUserInfo.workStart ? "" : "right"
      }, $compid__260, $prevCompid__260);
      _taroWeapp.propsManager.set({
        "title": "\u95E8\u5E97\u540D\u79F0",
        "extraText": userInfo.disName
      }, $compid__261, $prevCompid__261);
      _taroWeapp.propsManager.set({
        "title": "\u6240\u5728\u90E8\u95E8",
        "extraText": userInfo.departName || "无"
      }, $compid__262, $prevCompid__262);
      _taroWeapp.propsManager.set({
        "title": "\u804C\u4F4D",
        "extraText": userInfo.positionName || "无"
      }, $compid__263, $prevCompid__263);
      _taroWeapp.propsManager.set({
        "type": "primary",
        "onClick": this.handleSubmit,
        "disabled": anonymousState__temp2
      }, $compid__264, $prevCompid__264);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        $compid__254: $compid__254,
        $compid__255: $compid__255,
        $compid__256: $compid__256,
        $compid__257: $compid__257,
        $compid__258: $compid__258,
        $compid__259: $compid__259,
        $compid__260: $compid__260,
        $compid__261: $compid__261,
        $compid__262: $compid__262,
        $compid__263: $compid__263,
        $compid__264: $compid__264
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
}(_taroWeapp.Component), _class.$$events = ["handleGenderChange", "handleDateChange"], _class.$$componentPath = "pages/profile/index", _temp2);
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/profile/index.jsx?taro&type=template&parse=PAGE&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/profile/index.jsx?taro&type=template&parse=PAGE& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/profile/index.wxml";

/***/ }),

/***/ "./src/pages/profile/index.jsx":
/*!*************************************!*\
  !*** ./src/pages/profile/index.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/profile/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/profile/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/profile/index.jsx?taro&type=script&parse=PAGE&":
/*!******************************************************************!*\
  !*** ./src/pages/profile/index.jsx?taro&type=script&parse=PAGE& ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/profile/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/profile/index.jsx?taro&type=template&parse=PAGE&":
/*!********************************************************************!*\
  !*** ./src/pages/profile/index.jsx?taro&type=template&parse=PAGE& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/profile/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/profile/index.scss":
/*!**************************************!*\
  !*** ./src/pages/profile/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/profile/index.jsx","runtime","vendors","common"]]]);