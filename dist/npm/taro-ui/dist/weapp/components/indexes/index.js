(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["npm/taro-ui/dist/weapp/components/indexes/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _component = __webpack_require__(/*! ../../common/component */ "./node_modules/taro-ui/dist/weapp/common/component.tsx");

var _component2 = _interopRequireDefault(_component);

var _utils = __webpack_require__(/*! ../../common/utils */ "./node_modules/taro-ui/dist/weapp/common/utils.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _utils.initTestEnv)();
var ENV = _taroWeapp2.default.getEnv();

var AtIndexes = (_temp2 = _class = function (_AtComponent) {
  _inherits(AtIndexes, _AtComponent);

  function AtIndexes() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AtIndexes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AtIndexes.__proto__ || Object.getPrototypeOf(AtIndexes)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray68", "loopArray69", "$compid__469", "list", "rootCls", "listId", "animation", "isWEB", "_scrollTop", "undefined", "_scrollIntoView", "topKey", "_tipText", "_isShowToast", "isShowToast", "isVibrate", "className", "customStyle", "children"], _this.handleClick = function (item) {
      _this.props.onClick && _this.props.onClick(item);
    }, _this.handleTouchMove = function (event) {
      event.stopPropagation();
      event.preventDefault();
      var list = _this.props.list;

      var pageY = event.touches[0].pageY;
      var index = Math.floor((pageY - _this.startTop) / _this.itemHeight);
      if (index >= 0 && index <= list.length && _this.currentIndex !== index) {
        _this.currentIndex = index;
        var key = index > 0 ? list[index - 1].key : 'top';
        var touchView = "at-indexes__list-" + key;
        _this.jumpTarget(touchView, index);
      }
    }, _this.handleTouchEnd = function () {
      _this.currentIndex = -1;
    }, _this.customComponents = ["AtList", "AtListItem", "AtToast"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AtIndexes, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(AtIndexes.prototype.__proto__ || Object.getPrototypeOf(AtIndexes.prototype), '_constructor', this).call(this, props);

      this.state = {
        _scrollIntoView: '',
        _scrollTop: 0,
        _tipText: '',
        _isShowToast: false,
        isWEB: _taroWeapp2.default.getEnv() === _taroWeapp2.default.ENV_TYPE.WEB
      };
      // 右侧导航高度
      this.menuHeight = 0;
      // 右侧导航距离顶部高度
      this.startTop = 0;
      // 右侧导航元素高度
      this.itemHeight = 0;
      // 当前索引
      this.currentIndex = -1;
      this.listId = (0, _utils.isTest)() ? 'indexes-list-AOTU2018' : "list-" + (0, _utils.uuid)();
      this.timeoutTimer = undefined;
      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: 'jumpTarget',
    value: function jumpTarget(_scrollIntoView, idx) {
      var _this2 = this;

      var _props = this.props,
          topKey = _props.topKey,
          list = _props.list;

      var _tipText = idx === 0 ? topKey : list[idx - 1].key;
      if (ENV === _taroWeapp2.default.ENV_TYPE.WEB) {
        (0, _utils.delayQuerySelector)(this, '.at-indexes', 0).then(function (rect) {
          var targetOffsetTop = _this2.listRef.childNodes[idx].offsetTop;
          var _scrollTop = targetOffsetTop - rect[0].top;
          _this2.updateState({
            _scrollTop: _scrollTop,
            _scrollIntoView: _scrollIntoView,
            _tipText: _tipText
          });
        });
        return;
      }
      this.updateState({
        _scrollIntoView: _scrollIntoView,
        _tipText: _tipText
      });
    }
  }, {
    key: '__jumpTarget',
    value: function __jumpTarget(key) {
      var list = this.props.list;
      // const index = _findIndex(list, ['key', key])

      var index = list.findIndex(function (item) {
        return item.key === key;
      });
      var targetView = "at-indexes__list-" + key;
      this.jumpTarget(targetView, index + 1);
    }
  }, {
    key: 'updateState',
    value: function updateState(state) {
      var _this3 = this;

      var _props2 = this.props,
          isShowToast = _props2.isShowToast,
          isVibrate = _props2.isVibrate;
      var _scrollIntoView = state._scrollIntoView,
          _tipText = state._tipText,
          _scrollTop = state._scrollTop;
      // TODO: Fix dirty hack

      this.setState({
        _scrollIntoView: _scrollIntoView,
        _tipText: _tipText,
        _scrollTop: _scrollTop,
        _isShowToast: isShowToast
      }, function () {
        clearTimeout(_this3.timeoutTimer);
        _this3.timeoutTimer = setTimeout(function () {
          _this3.setState({
            _tipText: '',
            _isShowToast: false
          });
        }, 3000);
      });
      if (isVibrate) {
        _taroWeapp2.default.vibrateShort();
      }
    }
  }, {
    key: 'initData',
    value: function initData() {
      var _this4 = this;

      (0, _utils.delayQuerySelector)(this, '.at-indexes__menu').then(function (rect) {
        var len = _this4.props.list.length;
        _this4.menuHeight = rect[0].height;
        _this4.startTop = rect[0].top;
        _this4.itemHeight = Math.floor(_this4.menuHeight / (len + 1));
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      if (e && e.detail) {
        this.setState({
          _scrollTop: e.detail.scrollTop
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.list.length !== this.props.list.length) {
        this.initData();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (ENV === _taroWeapp2.default.ENV_TYPE.WEB) {
        this.listRef = document.getElementById(this.listId);
      }
      this.initData();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.onScrollIntoView && this.props.onScrollIntoView(this.__jumpTarget.bind(this));
    }
  }, {
    key: '_createData',
    value: function _createData() {
      var _this5 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      var listId = this.listId;

      var _genCompid = (0, _taroWeapp.genCompid)(__prefix + "$compid__469"),
          _genCompid2 = _slicedToArray(_genCompid, 2),
          $prevCompid__469 = _genCompid2[0],
          $compid__469 = _genCompid2[1];

      var _props3 = this.__props,
          className = _props3.className,
          customStyle = _props3.customStyle,
          animation = _props3.animation,
          topKey = _props3.topKey,
          list = _props3.list;
      var _state = this.__state,
          _scrollTop = _state._scrollTop,
          _scrollIntoView = _state._scrollIntoView,
          _tipText = _state._tipText,
          _isShowToast = _state._isShowToast,
          isWEB = _state.isWEB;

      var toastStyle = { minWidth: _taroWeapp2.default.pxTransform(100) };
      var rootCls = (0, _classnames2.default)('at-indexes', className);
      var anonymousState__temp = (0, _taroWeapp.internal_inline_style)(customStyle);
      var loopArray68 = list.map(function (dataList, i) {
        dataList = {
          $original: (0, _taroWeapp.internal_get_original)(dataList)
        };

        var key = dataList.$original.key;

        var targetView = "at-indexes__list-" + key;
        return {
          key: key,
          targetView: targetView,
          $original: dataList.$original
        };
      });
      var loopArray69 = list.map(function (dataList, _anonIdx3) {
        dataList = {
          $original: (0, _taroWeapp.internal_get_original)(dataList)
        };
        var $anonymousCallee__28 = dataList.$original.items ? dataList.$original.items.map(function (item, _anonIdx) {
          item = {
            $original: (0, _taroWeapp.internal_get_original)(item)
          };

          var _genCompid3 = (0, _taroWeapp.genCompid)(__prefix + 'eizzzzzzzz' + _anonIdx3 + "-" + _anonIdx, true),
              _genCompid4 = _slicedToArray(_genCompid3, 2),
              $prevCompid__468 = _genCompid4[0],
              $compid__468 = _genCompid4[1];

          _taroWeapp.propsManager.set({
            "title": item.$original.name,
            "onClick": _this5.handleClick.bind(_this5, item.$original)
          }, $compid__468, $prevCompid__468);
          return {
            $compid__468: $compid__468,
            $original: item.$original
          };
        }) : [];
        return {
          $anonymousCallee__28: $anonymousCallee__28,
          $original: dataList.$original
        };
      });
      _taroWeapp.propsManager.set({
        "customStyle": toastStyle,
        "isOpened": _isShowToast,
        "text": _tipText,
        "duration": 2000
      }, $compid__469, $prevCompid__469);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray68: loopArray68,
        loopArray69: loopArray69,
        $compid__469: $compid__469,
        list: list,
        rootCls: rootCls,
        listId: listId,
        animation: animation,
        undefined: undefined,
        topKey: topKey
      });
      return this.__state;
    }
  }]);

  return AtIndexes;
}(_component2.default), _class.$$events = ["jumpTarget", "handleTouchMove", "handleTouchEnd", "handleScroll"], _class.$$componentPath = "node_modules/taro-ui/dist/weapp/components/indexes/index", _temp2);


AtIndexes.propTypes = {
  customStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  animation: _propTypes2.default.bool,
  isVibrate: _propTypes2.default.bool,
  isShowToast: _propTypes2.default.bool,
  topKey: _propTypes2.default.string,
  list: _propTypes2.default.array,
  onClick: _propTypes2.default.func,
  onScrollIntoView: _propTypes2.default.func
};
AtIndexes.defaultProps = {
  customStyle: '',
  className: '',
  animation: false,
  topKey: 'Top',
  isVibrate: true,
  isShowToast: true,
  list: [],
  onClick: function onClick() {},
  onScrollIntoView: function onScrollIntoView() {}
};
exports.default = AtIndexes;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(AtIndexes));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\node_modules&outputPath=npm!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/node_modules&outputPath=npm!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "npm/taro-ui/dist/weapp/components/indexes/index.wxml";

/***/ }),

/***/ "./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx":
/*!**********************************************************************!*\
  !*** ./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.tsx?taro&type=template&parse=COMPONENT& */ "./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.tsx?taro&type=script&parse=COMPONENT& */ "./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT&":
/*!********************************************************************************************************!*\
  !*** ./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=script&parse=COMPONENT& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=script&parse=COMPONENT&");
/* harmony import */ var _tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_script_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT&":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_node_modules_outputPath_npm_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/node_modules&outputPath=npm!../../../../../@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../../../@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.tsx?taro&type=template&parse=COMPONENT& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\node_modules&outputPath=npm!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx?taro&type=template&parse=COMPONENT&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_node_modules_outputPath_npm_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_node_modules_outputPath_npm_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_node_modules_outputPath_npm_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_node_modules_outputPath_npm_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_tsx_taro_type_template_parse_COMPONENT___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ })

},[["./node_modules/taro-ui/dist/weapp/components/indexes/index.tsx","runtime","vendors"]]]);