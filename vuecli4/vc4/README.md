# vc4

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

模仿 https://www.bilibili.com/video/BV1EE41197G9?from=search&seid=10164428447950272027  
https://github.com/lizzz0523/limni/tree/master/stats-animation



### vue-cli 如何配置assetsPublicPath

[vue-cli 如何配置assetsPublicPath](https://www.cnblogs.com/dreamstartplace/p/12922224.html)

1. vue-cli 2.x版本  
 在config文件夹下的index.js中修改 assetsPublicPath: './'
2. vue-cli 3.x版本  
在 cli3 中 assetsPublicPath 属性被 baseUrl 取代，只需要在vue.config.js 添加baseUrl 属性 设为 './' 即可
3. vue-cli 4.x版本  
与cli3相同都是修改 vue.config.js 文件，但将属性换为   publicPath:'./' 

```javascript
module.exports = {
    baseUr:"./",//vue-cli 3.x
    publicPath:"./",//vue-cli 4.x
}
```

https://developer.mozilla.org/zh-CN/docs/WebAssembly/Loading_and_running
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_objects/WebAssembly/instantiate  
https://cloud.tencent.com/developer/section/1192275
