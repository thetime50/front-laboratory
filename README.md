# front-laboratory
front-laboratory

- laboratory  
  访问 https://thetime50.github.io/front-laboratory/  
  (国内) http://thetime50.com/front-laboratory/  
- vuecli4-stats-animation  
  README: [./vuecli4/README.md](./vuecli4/README.md)  
  README: [./vuecli4/vc4/README.md](./vuecli4/vc4/README.md)  
  访问 https://thetime50.github.io/front-laboratory/vuecli4  
  (国内) http://thetime50.com/front-laboratory/vuecli4  

## laboratory
### note
https://blog.csdn.net/cvper/article/details/79543262  
npm view jquery versions # 服务器上所有的jquery版本信息  
npm view jquery version # 最新版本  
npm info jquery # 详细信息  

npm ls jquery # 本地包路径  
npm ls jquery -g # 全局包路径  


### Web Worker前端多进程

前端多线程用于3d图表计算和更新  
图表运算只是用于转换格式后输出显示 并不要求计算结果参与下一次运算  
所以对缩短时间的要求不高，只要能把时间分出去不卡主进程就好(当然能得到一部分并行的收益)

掘金 你不知道的 Web Workers （上）[7.8K 字 | 多图预警]  
https://juejin.im/post/5ef2a554f265da02e47d952b  

阮一峰 Web Worker 使用教程  
http://www.ruanyifeng.com/blog/2018/07/web-worker.html 
五、实例：Worker 线程完成轮询  

[项目文件->](./laboratory/src/js/worker.js)  
[页面(用于右侧3d图表更新)](https://thetime50.github.io/front-laboratory/laboratory/dist/index.html#/gameoflife)  
[国内页面(用于右侧3d图表更新)](http://thetime50.com/front-laboratory/laboratory/dist/index.html#/gameoflife)

### AssemblyScript 浏览器汇编
AssemblyScript 入门指南  
https://segmentfault.com/a/1190000021063091  

21分钟，学会使用Vue+WebAssembly开发一个图表动效  
https://www.bilibili.com/video/av69685103/  
源码：https://github.com/lizzz0523/limni/tree/master/stats-animation  
设计：https://dribbble.com/shots/7077261-Stats-Animation  
项目在最外层执行npm install 在独立目录内npm run serve
文件: .\stats-animation\components\FeedMagic.vue  
  .\stats-animation\helper\wasm-canvas.js

WebAssembly技术解密  
https://www.bilibili.com/video/BV1ab411W71G?p=4  
环境：linux  
语言：c/cpp  
编译器:emsdk 命令: emcc  
输出：x.out.js x.out.wasm  
引入：&lt;script src="a.out.js"/&gt;  
其他：优化级别设置 emcc -o2 xx.c  
  用 Docker 镜像  
  内存文件系统  
  浏览器解析lua  
  指定script标签 的type 浏览器不识别类型就不会解析为js  
  编译 引入lua解析引擎 读取指定脚本解析执行  
  在Assembly c程序里里嵌入的js EM_ASM( console.log(xxx) ccall('cfun')/\*再调c函数 数据用内存文件传递 还需要设置为导出函数\*/ )

vuecli3 的webpack对WebAssembly的支持 (使用了webassemblyjs)
https://www.cnblogs.com/xiaohuochai/archive/2018/06/19/9196906.html  
1. 直接使用WebAssembly api
2. 迁移vue cli3 并使用 webassemblyjs 的polyfill (这个先不考虑 后面系统学习)

WebAssembly.instantiate

Will there be a JS -> WASM compiler?  
https://github.com/WebAssembly/design/issues/219

assemblyscript TypeScript to Assembly  
https://github.com/AssemblyScript/assemblyscript  
https://www.assemblyscript.org/quick-start.html  

### Ie不支持vue Promise 问题
vue项目于IE浏览器的兼容性问题(针对promise问题)  
https://zhuanlan.zhihu.com/p/70697108  
19年6月  
为什么 es6-promise 用的是 --save-dev

Vue.js 不支持 IE8 你们是怎么做的？  
https://www.zhihu.com/question/51468145?sort=created  
\[dog\]\[dog\] 已经是17年的帖子了

### webpack 和 CDN

https://www.jianshu.com/p/46e8865f78a8

module.exports中添加打包排除  
<s>dev模式下import会引入note_modules下的包</s> 好像用的都是cdn的包  
build后则使用windows下的包

1. vuecli 3.x

```javascript
// build/webpack.base.conf.js下module.exports
externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'element-ui': 'element-ui'
  },
```

```html
<!-- index.html -->

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
<!-- 引入组件库 用饿了吗官网提供的cdn也是比较慢的，建议自行换cdn-->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

```javascript
// main.js
import Vue from 'vue'
import Router from 'vue-router'
```

2. vuecli 4.x

根目录下的vue.config.js 添加 externals
```javascript

module.exports = {
    configureWebpack: config => {
        config.externals = {
            vue: "Vue",
            "element-ui": "ELEMENT",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            axios: "axios"
        };
    },
    chainWebpack: config => {
        const cdn = {//为什么这里定义的cdn 下面还要再定义
            // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
            css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
            js: [
                "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
                "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
                "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
                "//unpkg.com/axios@0.19.0/dist/axios.min.js",
                "//unpkg.com/element-ui@2.10.1/lib/index.js"
            ]
        };

        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // html中添加cdn
            args[0].cdn = cdn;
            return args;
        });
    }
};
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.css) { %>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
    <% } %>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- 使用CDN的JS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.js) { %>
    <script
            type="text/javascript"
            src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
    ></script>
    <% } %>
    <!-- built files will be auto injected -->
  </body>
</html>
```

### SRI解决CDN劫持问题

https://blog.csdn.net/mevicky/article/details/94618051

SRI是subresource integrity， 子资源完整性，是指浏览器通过验证资源的完整性来判断其是否被篡改的安全特性。  
它通过验证获取文件的哈希值是否和你提供的哈希值一样来判断资源是否被篡改。  
它的兼容性[在此](https://caniuse.com/#feat=subresource-integrity)，IE是全线没指望了

如果发现文件内容不一致，则会抛出该script的onerror事件，并不会去加载这段脚本的内容。

### optimize-cssnano-plugin 不支持 doodle 语法问题

npm run build 时 optimize-cssnano-plugin 不支持 doodle 语法

1. 开启optimize-cssnano-plugin
2. 局部配置optimize-cssnano-plugin
- node_modules\\.bin\vue-cli-service.cmd
- @vue\cli-service\bin\vue-cli-service.js
- @vue\cli-service\lib\Service.js
- @vue\cli-service\lib\config\css.js


### DICOM

**基础功能分析规划**

- DICOM 数据
  - json info
  - img
  - 服务(第二期)
    - 后端源文件预处理
- 3d show
  - three - image
  - 阵列 选中 显示
  - 高亮计算
  - 透明度计算
    - opencv
    - 其他库
    - three自带?
    - pixijs
  - 动画效果
    - step1 anime
    - step2 Three动画支持
- 图像处理 专业处理 分独立包 用不同实现


- 说明文档迁移  
  DICOM 开发文档详细说明已迁移至 [./doc/DICOM/README.md](./doc/DICOM/README.md)  
  此文件中的DICOM部分不再更新  
  2020-07-25

# todo
- <s>路由哈希有点问题</s>

three-geo