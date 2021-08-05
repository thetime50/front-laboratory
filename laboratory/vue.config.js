
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    // assetsPublicPath: process.env.NODE_ENV === 'production'
    //   ? '/front-laboratory/laboratory/dist/'
    //   : '/',
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