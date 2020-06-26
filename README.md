# front-laboratory
front-laboratory

访问 https://thetime50.github.io/front-laboratory/

## Web Worker前端多进程

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

## AssemblyScript 浏览器汇编
AssemblyScript 入门指南  
https://segmentfault.com/a/1190000021063091  

21分钟，学会使用Vue+WebAssembly开发一个图表动效  
https://www.bilibili.com/video/av69685103/  

## Ie不支持vue Promise 问题
vue项目于IE浏览器的兼容性问题(针对promise问题)  
https://zhuanlan.zhihu.com/p/70697108