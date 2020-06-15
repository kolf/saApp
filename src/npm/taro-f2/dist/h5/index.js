export { default as F2Canvas } from './components/f2-canvas/f2-canvas';
import Nerv from 'nervjs';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
export { fixF2 } from './common/f2-tool';