
const path = require('path')
const https = require('https')
const fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/front-laboratory/laboratory/dist/'
    : '/',
    devServer: {
        https: true,
    },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    externals: {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'element-ui': 'element-ui'
      // importStr : noduleStr
      THREE:'THREE',
      animejs:'anime',//cdn定义为anime  引入为imoprt的'animejs'
      // 'THREE/examples/js/controls/OrbitControls.js':'',

      'ami.js':'AMI',
    },
  }
}