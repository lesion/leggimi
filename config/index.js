// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  }
}
