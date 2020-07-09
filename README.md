# front-laboratory
front-laboratory

- laboratory  
  访问 https://thetime50.github.io/front-laboratory/  
- vuecli4-stats-animation  
  README: [./vuecli4/README.md](./vuecli4/README.md)  
  README: [./vuecli4/vc4/README.md](./vuecli4/vc4/README.md)  
  访问 https://thetime50.github.io/front-laboratory/vuecli4  

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
