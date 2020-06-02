(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/report-users-xs/index"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE& ***!
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

__webpack_require__(/*! ./index.scss */ "./src/pages/report-users-xs/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formatStr = "YYYY-MM-DD";

var tabList = [{ title: "\u65E5", value: "days" }, { title: "\u5468", value: "weeks" }, { title: "\u6708", value: "months" }];

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this2), _this2.$usedState = ["anonymousState__temp4", "anonymousState__temp5", "$compid__393", "$compid__394", "$compid__395", "anonymousState__temp3", "activeKey", "showType", "listData", "isFetching", "endDate"], _this2.config = {
      navigationBarTitleText: "销售顾问"
    }, _this2.state = {
      activeKey: 0,
      showType: 0,
      listData: [],
      isFetching: false,
      endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr) //默认前一天
    }, _this2.tendencyRef = null, _this2.loadData = function () {
      _this2.setState({
        isFetching: true
      });
      var _this2$state = _this2.state,
          showType = _this2$state.showType,
          activeKey = _this2$state.activeKey;
      //饼状图

      if (showType == 0) {
        (0, _apis.getAdvisoryReportYesterday)(_this2.makeParams()).then(function (res) {
          _this2.setState({
            isFetching: false,
            data: res.data
          });
          _this2.timer = setTimeout(function () {
            clearTimeout(_this2.timer);
            _this2.drawData();
          }, 300);
        });
      } else {
        (0, _apis.getAdvisoryReportLast7Days)(_this2.makeParams(), tabList[activeKey].value).then(function (res) {
          _this2.setState({
            isFetching: false,
            data: res.data
          });
          _this2.timer = setTimeout(function () {
            clearTimeout(_this2.timer);
            _this2.drawData();
          }, 300);
        });
      }
    }, _this2.drawData = function () {
      if (_this2.state.showType === 0) {
        var _this2$state2 = _this2.state,
            data = _this2$state2.data,
            showType = _this2$state2.showType;
        var CJProportionPie = data.CJProportionPie;

        _this2.tendencyRef.guide().text({
          position: ['50%', '45%'],
          content: CJProportionPie.total,
          style: {
            fill: '#333333', // 文本颜色
            fontSize: '29', // 文本大小
            fontWeight: 'bold' // 文本粗细
          }
        });
        delete data.DateTime;
        /* for (let d in data) {
           data[d].transactionRate = data[d].proportion;
         }*/

        _this2.tendencyRef.changeData(_this2.makeData(data));
      } else if (_this2.state.showType === 1) {
        var _data = _this2.state.data;

        var rebuildData = [];
        _data.map(function (obj, i) {
          for (var v in obj) {
            if (v !== 'date' && v !== 'Total') {
              var name = void 0;
              var date = void 0;
              var num = void 0;
              if (v === 'ACTotal') {
                name = 'A卡台数';
                date = obj.date;
                num = obj[v] - obj['CJTotal'];
              } else if (v === 'CJTotal') {
                name = '完成台数';
                date = obj.date;
                num = obj[v];
              }

              rebuildData.push({
                name: name,
                date: date,
                num: num
              });
            }
          }
        });
        _data = rebuildData;
        var _this = _this2;
        var map = {},
            dest = [];
        for (var i = 0; i < _data.length; i++) {
          var ai = _data[i];
          if (!map[ai.date]) {
            dest.push({
              date: ai.date,
              name: ai.name,
              data: [ai]
            });
            map[ai.date] = ai;
          } else {
            for (var j = 0; j < dest.length; j++) {
              var dj = dest[j];
              if (dj.date == ai.date) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        dest.map(function (d, i) {
          var count = 0;
          d.data.map(function (n, m) {
            count += n.num;
          });
          d.count = count;
        });
        var newData = [];
        dest.map(function (obj, i) {
          obj.data.map(function (o, i) {
            o.count = obj.count;
            newData.push(o);
            if (i === 0) {
              _this.statisticalRef.guide().text({
                position: [obj.date, obj.count],
                content: obj.count,
                style: {
                  textAlign: 'center',
                  textBaseline: 'bottom'
                },
                offsetY: -4
              });
            }
          });
        });

        _this2.statisticalRef.changeData(newData);
      }
    }, _this2.makeTableData = function (data) {
      return Object.values(data).map(function (item) {
        return {
          name: item.orderTypeName,
          total: item.orderTotal,
          dealTotal: item.orderDealTotal,
          scale: (item.orderTotal === 0 ? '' : parseInt(item.orderDealTotal / item.orderTotal * 100)) + "%"
        };
      });
    }, _this2.makeParams = function () {
      var newParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var id = _this2.$router.params.id;
      var _this2$state3 = _this2.state,
          endDate = _this2$state3.endDate,
          activeKey = _this2$state3.activeKey,
          showType = _this2$state3.showType;

      var startDate = endDate;
      var parms = {};
      if (activeKey === 1) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "weeks").format(formatStr);
      } else if (activeKey === 2) {
        startDate = (0, _moment2.default)(endDate).subtract(1, "months").format(formatStr);
      }
      if (showType) {
        parms.dateTime = endDate;
      } else {
        parms.startDateTime = startDate;
        parms.endDateTime = endDate;
      }
      return _extends({
        uId: id
      }, parms, newParams);
    }, _this2.handleTabClick = function (e) {
      _this2.setState({
        activeKey: e,
        endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr)
      }, _this2.loadData);
    }, _this2.makeData = function (data) {
      var total = data ? data.CJProportionPie.total : 0;
      if (total === 0) {
        return [{
          name: "再购新车",
          percent: 0.33,
          a: "1"
        }, {
          name: "置换新车",
          percent: 0.33,
          a: "1"
        }, {
          name: "转介绍",
          percent: 0.34,
          a: "1"
        }];
      }
      delete data.TOTAL;
      delete data.DateTime;
      var array = [];
      for (var name in data.CJProportionPie) {

        if (name == 'ZGXCTotal') {
          var obj = {};
          obj['name'] = '再购新车';
          obj['percent'] = data.CJProportionPie.ZGXCTotal / 100;
          array.push(obj);
        }
        if (name == 'ZHXCTotal') {
          var _obj = {};
          _obj['name'] = '置换新车';
          _obj['percent'] = data.CJProportionPie.ZHXCTotal / 100;
          array.push(_obj);
        }
        if (name == 'ZJSTotal') {
          var _obj2 = {};
          _obj2['name'] = '转介绍';
          _obj2['percent'] = data.CJProportionPie.ZJSTotal / 100;
          array.push(_obj2);
        }
      }
      console.log(array);
      return array;
      /*return Object.values(data.CJProportionPie)
        .map(item => ({
          name: item.orderTypeName,
          percent: item.transactionRate / 100,
          a: "1"
        }));*/
    }, _this2.handleDateChange = function (n) {
      var _this2$state4 = _this2.state,
          endDate = _this2$state4.endDate,
          activeKey = _this2$state4.activeKey;

      var unit = tabList[activeKey].value;

      var nextEndDate = null;
      if (n === -1) {
        nextEndDate = (0, _moment2.default)(endDate).subtract(1, unit).format(formatStr);
      } else if (n === 1) {
        nextEndDate = (0, _moment2.default)(endDate).add(1, unit).format(formatStr);
      }
      _this2.setState({
        endDate: nextEndDate
      }, _this2.loadData);
    }, _this2.handleDateTypeChange = function (e) {
      _this2.setState({
        showType: e,
        endDate: (0, _moment2.default)().subtract(1, "days").format(formatStr)
      }, _this2.loadData);
    }, _this2.getPagerTitle = function () {
      var _this2$state5 = _this2.state,
          endDate = _this2$state5.endDate,
          activeKey = _this2$state5.activeKey;

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
    }, _this2.customComponents = ["AtActivityIndicator", "TendencyChart", "StatisticalChart", "AtTabs", "AtSegmentedControl", "Pager"], _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var title = this.$router.params.title;

      _taroWeapp2.default.setNavigationBarTitle({
        title: "\u9500\u552E\u987E\u95EE(" + title + ")"
      });
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.loadData();
    }
  }, {
    key: "drawStatisticalRefRadar",
    value: function drawStatisticalRefRadar(canvas, width, height) {

      var chart = new F2.Chart({
        el: canvas,
        width: width,
        height: height
      });
      chart.source([], {
        'num': {
          tickCount: 10
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          var legend = chart.get('legendController').legends.top[0];
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
          var legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.legend({
        position: "bottom",
        align: 'center',
        marker: {
          symbol: 'square',
          radius: 5
        }
      });
      chart.interval().position('date*num').color('name', ["l(90) 0:#7DE3FF 1:#0056E0", "l(90) 0:#FFF686 1:#FF9538", "l(90) 0:#A7F592 1:#4ADD4E"]).adjust('stack');
      chart.line().position('date*num').color('#EC3333');
      this.statisticalRef = chart;
      // 柱状图添加文本

      chart.render();
      return chart;
    }
  }, {
    key: "drawRadar",
    value: function drawRadar(canvas, width, height) {
      var _F = F2;
      var Util = _F.Util;
      var G = _F.G;
      var Vector2 = G.Vector2;
      F2.Shape.registerShape('interval', 'pie-with-text', {
        draw: function draw(cfg, container) {
          var points = this.parsePoints(cfg.points);
          var style = Util.mix({
            fill: cfg.color
          }, cfg.style);
          var coord = this._coord;
          if (cfg.isInCircle && coord.transposed) {
            // 只处理极坐标y
            var newPoints = [points[0], points[3], points[2], points[1]];
            var _cfg$center = cfg.center,
                x = _cfg$center.x,
                y = _cfg$center.y;
            var v = [1, 0];
            var v0 = [newPoints[0].x - x, newPoints[0].y - y];
            var v1 = [newPoints[1].x - x, newPoints[1].y - y];
            var v2 = [newPoints[2].x - x, newPoints[2].y - y];
            var startAngle = Vector2.angleTo(v, v1);
            var endAngle = Vector2.angleTo(v, v2);
            var r0 = Vector2.length(v0);
            var r = Vector2.length(v1);
            if (startAngle >= 1.5 * Math.PI) {
              startAngle = startAngle - 2 * Math.PI;
            }
            if (endAngle >= 1.5 * Math.PI) {
              endAngle = endAngle - 2 * Math.PI;
            }
            var middleAngle = (startAngle + endAngle) / 2;
            var numbricCenter = _getEndPoint(cfg.center, middleAngle, (r + r0) / 2);
            var sector = container.addShape('Sector', {
              className: 'interval',
              attrs: Util.mix({
                x: x,
                y: y,
                r: r,
                r0: r0,
                startAngle: startAngle,
                endAngle: endAngle
              }, style)
            });
            var text = container.addShape('text', {
              attrs: {
                x: numbricCenter.x,
                y: numbricCenter.y,
                textAlign: 'center',
                textBaseline: 'middle',
                fontSize: 12,
                text: cfg.origin._origin.percent * 100 + '%',
                fill: '#fff',
                fontWeight: '400'
              }
            });
            return [sector, text];
          }
        }
      });

      var chart = new F2.Chart({
        el: canvas,
        width: width,
        height: height
      });
      chart.source([], {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + "%";
          }
        }
      });
      chart.legend({
        position: "bottom",
        align: 'center',
        marker: {
          symbol: 'square',
          radius: 5
        }
      });
      chart.tooltip(false);
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.5
      });
      chart.axis(false);
      chart.interval().position("a*percent").color("name", ["l(0) 0:#A7F592 1:#4ADD4E", "#F89C63", "l(0) 0:#7DE3FF 1:#0056E0"]).adjust("stack").style({
        lineWidth: 1,
        stroke: "#fff",
        lineJoin: "round",
        lineCap: "round"
      }).shape('pie-with-text');
      // 饼图内部文字
      chart.guide().text({
        position: ['50%', '58%'],
        content: '总成交台数'
      });

      this.tendencyRef = chart;
      chart.render();
      return chart;
    }
  }, {
    key: "_createMainData",
    value: function _createMainData(_$uid) {
      var _this3 = this;

      return function () {
        var _$anonymousState__temp, _$anonymousState__temp2;

        var _genCompid = (0, _taroWeapp.genCompid)(_$uid + "$compid__390"),
            _genCompid2 = _slicedToArray(_genCompid, 2),
            $prevCompid__390 = _genCompid2[0],
            $compid__390 = _genCompid2[1];

        var _genCompid3 = (0, _taroWeapp.genCompid)(_$uid + "$compid__391"),
            _genCompid4 = _slicedToArray(_genCompid3, 2),
            $prevCompid__391 = _genCompid4[0],
            $compid__391 = _genCompid4[1];

        var _genCompid5 = (0, _taroWeapp.genCompid)(_$uid + "$compid__392"),
            _genCompid6 = _slicedToArray(_genCompid5, 2),
            $prevCompid__392 = _genCompid6[0],
            $compid__392 = _genCompid6[1];

        var _state = _this3.state,
            showType = _state.showType,
            data = _state.data,
            isFetching = _state.isFetching;

        if (isFetching) {
          _taroWeapp.propsManager.set({
            "mode": "center",
            "content": "\u52A0\u8F7D\u4E2D..."
          }, $compid__390, $prevCompid__390);
        }
        if (showType === 0) {
          _$anonymousState__temp = function _$anonymousState__temp(r) {
            return _this3.tendencyRef = r;
          };

          _taroWeapp.propsManager.set({
            "saveRef": _$anonymousState__temp,
            "title": "\u603B\u6210\u4EA4\u53F0\u6570"
          }, $compid__391, $prevCompid__391);
        } else if (showType === 1) {
          _$anonymousState__temp2 = function _$anonymousState__temp2(r) {
            return _this3.statisticalRef = r;
          };

          _taroWeapp.propsManager.set({
            "saveRef": _$anonymousState__temp2
          }, $compid__392, $prevCompid__392);
        }
        return {
          _$anonymousState__temp: _$anonymousState__temp,
          _$anonymousState__temp2: _$anonymousState__temp2,
          $compid__390: $compid__390,
          $compid__391: $compid__391,
          $compid__392: $compid__392,
          isFetching: isFetching,
          data: data,
          showType: showType
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

      var _genCompid7 = (0, _taroWeapp.genCompid)(__prefix + "$compid__393"),
          _genCompid8 = _slicedToArray(_genCompid7, 2),
          $prevCompid__393 = _genCompid8[0],
          $compid__393 = _genCompid8[1];

      var _genCompid9 = (0, _taroWeapp.genCompid)(__prefix + "$compid__394"),
          _genCompid10 = _slicedToArray(_genCompid9, 2),
          $prevCompid__394 = _genCompid10[0],
          $compid__394 = _genCompid10[1];

      var _genCompid11 = (0, _taroWeapp.genCompid)(__prefix + "$compid__395"),
          _genCompid12 = _slicedToArray(_genCompid11, 2),
          $prevCompid__395 = _genCompid12[0],
          $compid__395 = _genCompid12[1];

      var _state2 = this.__state,
          activeKey = _state2.activeKey,
          endDate = _state2.endDate,
          showType = _state2.showType;


      var anonymousState__temp3 = this._createMainData(__prefix + "dezzzzzzzz")();

      var anonymousState__temp4 = ["成交统计", "成交统计趋势"];
      var anonymousState__temp5 = this.getPagerTitle();
      _taroWeapp.propsManager.set({
        "current": activeKey,
        "tabList": tabList,
        "onClick": this.handleTabClick.bind(this),
        "animated": false
      }, $compid__393, $prevCompid__393);
      _taroWeapp.propsManager.set({
        "current": showType,
        "onClick": this.handleDateTypeChange,
        "values": anonymousState__temp4
      }, $compid__394, $prevCompid__394);
      _taroWeapp.propsManager.set({
        "title": anonymousState__temp5,
        "onNext": this.handleDateChange.bind(this, 1),
        "onPrev": this.handleDateChange.bind(this, -1)
      }, $compid__395, $prevCompid__395);
      Object.assign(this.__state, {
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        $compid__393: $compid__393,
        $compid__394: $compid__394,
        $compid__395: $compid__395,
        anonymousState__temp3: anonymousState__temp3
      });
      return this.__state;
    }
  }]);

  return Index;
}(_taroWeapp.Component), _class.$$events = [], _class.$$componentPath = "pages/report-users-xs/index", _temp2);
exports.default = Index;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Index, true));

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/report-users-xs/index.wxml";

/***/ }),

/***/ "./src/pages/report-users-xs/index.jsx":
/*!*********************************************!*\
  !*** ./src/pages/report-users-xs/index.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.jsx?taro&type=template&parse=PAGE& */ "./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.jsx?taro&type=script&parse=PAGE& */ "./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),

/***/ "./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE&":
/*!**************************************************************************!*\
  !*** ./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=script&parse=PAGE& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-users-xs/index.jsx?taro&type=script&parse=PAGE&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_script_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE&":
/*!****************************************************************************!*\
  !*** ./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!file-loader?name=[path][name].wxml&context=C:/Users/kolf/test/saApp/src!../../../node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!../../../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--6-0!./index.jsx?taro&type=template&parse=PAGE& */ "./node_modules/file-loader/dist/cjs.js?name=[path][name].wxml&context=C:\\Users\\kolf\\test\\saApp\\src!./node_modules/@tarojs/mini-runner/dist/loaders/miniTemplateLoader.js!./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/pages/report-users-xs/index.jsx?taro&type=template&parse=PAGE&");
/* harmony import */ var _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _file_loader_name_path_name_wxml_context_C_Users_kolf_test_saApp_src_node_modules_tarojs_mini_runner_dist_loaders_miniTemplateLoader_js_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_6_0_index_jsx_taro_type_template_parse_PAGE___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pages/report-users-xs/index.scss":
/*!**********************************************!*\
  !*** ./src/pages/report-users-xs/index.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/report-users-xs/index.jsx","runtime","vendors","common"]]]);