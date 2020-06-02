(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/my-profile/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE& ***!
  \******************************************************************************************************************************************************/
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

__webpack_require__(/*! ./index.scss */ "./src/pages/my-profile/index.scss");

var _defaultAvatar = __webpack_require__(/*! ../../assets/images/default-avatar.png */ "./src/assets/images/default-avatar.png");

var _defaultAvatar2 = _interopRequireDefault(_defaultAvatar);

var _storage = __webpack_require__(/*! ../../utils/storage */ "./src/utils/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _index = __webpack_require__(/*! ../../utils/index */ "./src/utils/index.js");

var _options = __webpack_require__(/*! ../../utils/options */ "./src/utils/options.js");

var _apis = __webpack_require__(/*! ../../servers/apis */ "./src/servers/apis.js");

var _baseUrl = __webpack_require__(/*! ../../servers/baseUrl */ "./src/servers/baseUrl.js");

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "$compid__288", "$compid__289", "$compid__290", "$compid__291", "$compid__292", "$compid__293", "$compid__294", "$compid__295", "$compid__296", "$compid__297", "$compid__298", "$compid__299", "$compid__300", "$compid__301", "userInfo", "confirmLoading", "genders"], _this.config = {
      navigationBarTitleText: "信息展示墙"
    }, _this.state = {
      confirmLoading: false,
      userInfo: _storage2.default.get("userInfo") || {},
      genders: (0, _options.getOptions)("genders").map(function (o) {
        return o.label;
      })
    }, _this.handleLogout = function () {
      _this.setState({
        confirmLoading: true
      });
      (0, _apis.logout)().then(function (res) {
        _storage2.default.clear();
        _taroWeapp2.default.redirectTo({
          url: "/pages/login/index"
        });
      });
    }, _this.handleBirthdayChange = function (e) {
      (0, _apis.updateBirthday)({ birthday: e.target.value }).then(function (res) {});
    }, _this.loadData = function () {
      (0, _apis.getUserInfo)().then(function (res) {
        var userInfo = res.data;
        _this.setState({
          userInfo: userInfo
        });

        _storage2.default.set("userInfo", userInfo);
      });
    }, _this.handleAvatarChange = function () {
      var JSESSIONID = _storage2.default.get("JSESSIONID");
      _taroWeapp2.default.chooseImage({
        number: 1,
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          _taroWeapp2.default.uploadFile({
            url: (0, _baseUrl2.default)("/api/") + "/api/v1/base/upload",
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
    }, _this.customComponents = ["AtList", "AtListItem", "AtButton", "TabBar"], _temp), _possibleConstructorReturn(_this, _ret);
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

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__288"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__288 = _genCompid2[0],
          $compid__288 = _genCompid2[1];

      var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + "$compid__289"),
          _genCompid4 = _slicedToArray(_genCompid3, 2),
          $prevCompid__289 = _genCompid4[0],
          $compid__289 = _genCompid4[1];

      var _genCompid5 = (0, _taroWeapp.genCompid)(__prefix + "$compid__290"),
          _genCompid6 = _slicedToArray(_genCompid5, 2),
          $prevCompid__290 = _genCompid6[0],
          $compid__290 = _genCompid6[1];

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__291"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__291 = _genCompid8[0],
          $compid__291 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__292"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__292 = _genCompid10[0],
          $compid__292 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__293"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__293 = _genCompid12[0],
          $compid__293 = _genCompid12[1];

      var _genCompid13 = (0, _taroWeapp.genCompid)(__prefix + "$compid__294"),
          _genCompid14 = _slicedToArray(_genCompid13, 2),
          $prevCompid__294 = _genCompid14[0],
          $compid__294 = _genCompid14[1];

      var _genCompid15 = (0, _taroWeapp.genCompid)(__prefix + "$compid__295"),
          _genCompid16 = _slicedToArray(_genCompid15, 2),
          $prevCompid__295 = _genCompid16[0],
          $compid__295 = _genCompid16[1];

      var _genCompid17 = (0, _taroWeapp.genCompid)(__prefix + "$compid__296"),
          _genCompid18 = _slicedToArray(_genCompid17, 2),
          $prevCompid__296 = _genCompid18[0],
          $compid__296 = _genCompid18[1];

      var _genCompid19 = (0, _taroWeapp.genCompid)(__prefix + "$compid__297"),
          _genCompid20 = _slicedToArray(_genCompid19, 2),
          $prevCompid__297 = _genCompid20[0],
          $compid__297 = _genCompid20[1];

      var _genCompid21 = (0, _taroWeapp.genCompid)(__prefix + "$compid__298"),
          _genCompid22 = _slicedToArray(_genCompid21, 2),
          $prevCompid__298 = _genCompid22[0],
          $compid__298 = _genCompid22[1];

      var _genCompid23 = (0, _taroWeapp.genCompid)(__prefix + "$compid__299"),
          _genCompid24 = _slicedToArray(_genCompid23, 2),
          $prevCompid__299 = _genCompid24[0],
          $compid__299 = _genCompid24[1];

      var _genCompid25 = (0, _taroWeapp.genCompid)(__prefix + "$compid__300"),
          _genCompid26 = _slicedToArray(_genCompid25, 2),
          $prevCompid__300 = _genCompid26[0],
          $compid__300 = _genCompid26[1];

      var _genCompid27 = (0, _taroWeapp.genCompid)(__prefix + "$compid__301"),
          _genCompid28 = _slicedToArray(_genCompid27, 2),
          $prevCompid__301 = _genCompid28[0],
          $compid__301 = _genCompid28[1];

      var userInfo = this.__state.userInfo;


      var anonymousState__temp = (0, _options.getOptionLabel)("genders", userInfo.gender) || "未填写";
      var anonymousState__temp2 = (0, _options.getOptionLabel)("roles", userInfo.type);
      var anonymousState__temp3 = ["my-owner", "my-order", "my-profile"];
      _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__288, $prevCompid__288);
      _taroWeapp.propsManager.set({
        "title": "\u5934\u50CF",
        "extraThumb": userInfo.avatarUrl || _defaultAvatar2.default,
        "onClick": this.handleAvatarChange,
        "arrow": "right"
      }, $compid__289, $prevCompid__289);
      _taroWeapp.propsManager.set({
        "title": "\u59D3\u540D",
        "extraText": userInfo.realName || "未填写"
      }, $compid__290, $prevCompid__290);
      _taroWeapp.propsManager.set({
        "title": "\u6027\u522B",
        "extraText": anonymousState__temp
      }, $compid__291, $prevCompid__291);
      _taroWeapp.propsManager.set({
        "title": "\u624B\u673A\u53F7",
        "extraText": userInfo.phone,
        "arrow": "right",
        "className": "no-border",
        "onClick": _index.goTo.bind(this, "update-phone")
      }, $compid__292, $prevCompid__292);
      _taroWeapp.propsManager.set({
        "className": "gap-top"
      }, $compid__293, $prevCompid__293);
      _taroWeapp.propsManager.set({
        "title": "\u5F00\u59CB\u5DE5\u4F5C\u65F6\u95F4",
        "extraText": userInfo.workStart || "未填写"
      }, $compid__294, $prevCompid__294);
      _taroWeapp.propsManager.set({
        "title": "\u95E8\u5E97\u540D\u79F0",
        "extraText": userInfo.disName
      }, $compid__295, $prevCompid__295);
      _taroWeapp.propsManager.set({
        "title": "\u804C\u4F4D",
        "extraText": anonymousState__temp2
      }, $compid__296, $prevCompid__296);
      userInfo.type === "FW" && _taroWeapp.propsManager.set({
        "title": "\u79EF\u5206",
        "arrow": "right",
        "onClick": _index.goTo.bind(this, "my-integral")
      }, $compid__297, $prevCompid__297);
      _taroWeapp.propsManager.set({
        "title": "\u8054\u7CFB\u5BA2\u670D",
        "arrow": "right",
        "onClick": _index.goTo.bind(this, "service-index"),
        "className": "no-border"
      }, $compid__298, $prevCompid__298);
      userInfo.type === "FW" && _taroWeapp.propsManager.set({
        "style": "marginButtom: 24px",
        "type": "primary",
        "onClick": _index.goTo.bind(this, "profile-card")
      }, $compid__299, $prevCompid__299);
      _taroWeapp.propsManager.set({
        "loading": this.__state.confirmLoading,
        "type": "secondary",
        "onClick": this.handleLogout
      }, $compid__300, $prevCompid__300);
      _taroWeapp.propsManager.set({
        "activeKey": 2,
        "tabKeys": anonymousState__temp3
      }, $compid__301, $prevCompid__301);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        $compid__288: $compid__288,
        $compid__289: $compid__289,
        $compid__290: $compid__290,
        $compid__291: $compid__291,
        $compid__292: $compid__292,
        $compid__293: $compid__293,
        $compid__294: $compid__294,
        $compid__295: $compid__295,
        $compid__296: $compid__296,
        $compid__297: $compid__297,
        $compid__298: $compid__298,
        $compid__299: $compid__299,
        $compid__300: $compid__300,
        $compid__301: $compid__301
      });
      return this.__state;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/my-profile/index", _temp2);
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/my-profile/index.wxml";

/***/ }),

/***/ "./src/pages/my-profile/index.jsx":
/*!****************************************!*\
  !*** ./src/pages/my-profile/index.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE&":
/*!*********************************************************************!*\
  !*** ./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/my-profile/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE&":
/*!***********************************************************************!*\
  !*** ./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/my-profile/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/my-profile/index.scss":
/*!*****************************************!*\
  !*** ./src/pages/my-profile/index.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/my-profile/index.jsx","runtime","vendors","common"]]]);