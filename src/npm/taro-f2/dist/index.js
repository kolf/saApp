if (process.env.TARO_ENV === 'h5') {
    module.exports = require('./h5/index')
    module.exports.default = module.exports
  } else if(process.env.TARO_ENV === 'rn'){
    module.exports = require('./rn/index')
    module.exports.default = module.exports
  } else {
    module.exports = require('./weapp/index')
    module.exports.default = module.exports
  }