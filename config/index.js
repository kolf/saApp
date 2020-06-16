const path = require("path");
const config = {
  projectName: "saApp",
  date: "2020-6-5",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  babel: {
    sourceMap: true,
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      [
        "transform-runtime",
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: "babel-runtime"
        }
      ]
    ]
  },
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/servers": path.resolve(__dirname, "..", "src/servers"),
    "@/npm": path.resolve(__dirname, "..", "src/npm")
  },
  plugins: [],
  defineConstants: {},
  mini: {
    webpackChain(chain, webpack) {
      // const config = chain.optimization.get("splitChunks");
      // console.log(config, "config");
      // chain.optimization.splitChunks({
      //   ...config,
      //   cacheGroups: {
      //     ...config.cacheGroups,
      //     antv: {
      //       name: "npm/@antv/f2",
      //       minChunks: 2,
      //       test: module => /[\\/]node_modules[\\/]@antv[\\/]/.test(module.resource),
      //       priority: 200
      //     }
      //   }
      // });
      chain
        .plugin("analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, []);
      chain
        .plugin("contextReplace")
        .use(
          new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
          []
        );
    },
    addChunkPages (pages) {
      // pages.set('admin/components/charts/*.jsx', ['antv'])
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
