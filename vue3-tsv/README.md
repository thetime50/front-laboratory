# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


## todo
- [x] ui框架
- [x] threejs
- [ ] @type/three 原理 和 vite-plugin-resolve-externals插件
- [ ] UML


## 解决绝对路径引入问题

[vite+ts环境配置路径别名@，安排~](https://zhuanlan.zhihu.com/p/491943690)

## vite 配置cdn导入的包

[vite 配置cdn导入的包文件，类似webpack的externals](https://blog.csdn.net/Cynthia_Yue27/article/details/123577202)


[Declare an Array with Fixed length in TypeScript](https://bobbyhadz.com/blog/typescript-array-with-fixed-length)


## ts 配置说明

```json
{
  "compilerOptions": {
    // 在vue3-ts项目中
    "skipLibCheck": true, // 跳过声明文件的类型检查。 https://www.typescriptlang.org/tsconfig/#skipLibCheck
    "allowSyntheticDefaultImports": true, // 允许合成默认导入 https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports
    "forceConsistentCasingInFileNames": true, // 在文件名中强制使用一致的大小写 https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames


    // 在vue3-tsv项目中
    "resolveJsonModule": true, // 解析json模块 https://www.typescriptlang.org/tsconfig/#resolveJsonModule
    "useDefineForClassFields": true, // https://zhuanlan.zhihu.com/p/258906525
    "isolatedModules": true, // 代码无法被单文件解释器处理时 发出警告 https://www.typescriptlang.org/tsconfig/#isolatedModules
  }
}

```

## three 资源

[three Libraries and Plugins](https://threejs.org/docs/#manual/en/introduction/Libraries-and-Plugins)  
[基础形状 Three.js Primitives](https://r105.threejsfundamentals.org/threejs/lessons/threejs-primitives.html)  
[three 社区讨论 OpenSourced Library/List of Meshes/Geometries](https://discourse.threejs.org/t/opensourced-library-list-of-meshes-geometries/38674)  

[three-rounded-box](https://www.npmjs.com/package/three-rounded-box)


- [x] 旋转轴没有清清楚 end 没有处理好
- [x] 状态保存恢复
- [x] 还原按钮
- [ ] .公式控制器
- [ ] .操作记录
- [ ] 视图控制器
- [ ] 公式-视图切换
- [ ] .自动复原

## 【vite】vite项目从0开始配置eslint
[【vite】vite项目从0开始配置eslint](https://blog.csdn.net/qq_42345108/article/details/124386056)

npm install eslint --save-dev  
npx eslint --init  

eslint 好像没有检测到 vue里面的ts


## AStar

A* 寻径算法
- [x] 清除计算
- [x] 清屏
- [x] 迭代顺序优先级问题
- [x] 画墙和画地面覆盖source target问题
- [ ] 外部设置宽高
- [x] 对角距离 抽象类
- [ ] 保存地图
- [ ] 浮窗
- [ ] 优先级显示
- [ ] 动画开关
- [x] 路径不可点击
- [ ] 重复点击 source target问题
- [x] 有些点没有遍历到问题


a* 算法解出来的不一定是最优解，因为会受到启发函数的影响优先向某方向移动，之后的移动依赖于之前已经移动的距离记录。如果已移动的路径绕了远路需要折回，那么已经绕远的路径依然会被记录到之后的路径中。  
如果需要绝对的最优解，那么应该使用的是广度优先(BFS)。有启发的倾向，就有与倾向相悖的情况。

a* 可以做到什么
- 稀疏场景下可以容易找到非常接近的最优解，可以减少很多的遍历
- 搜索方向就像给水流加了一个坡度，如果受到阻碍就会先填满当前坡度，然后向上回溯最接近的坡度(??)
- BFS的模型是到起点的消费距离形成的距离梯度/路径树，a*则是加权期望距离形成的复合距离梯度/路径树，受到阻碍时会往不同方向增长，增加树的远端接触面(生长面)  
    - 如果终点在拓扑上的最远点，a*依然大概率会遍历整个地图
    - a*可以省略掉加上预期路径后的没有优势的路径


优化方式
- 每个折点和一个间隔折点做一次a*优化
- 指定步长a*优化
- 大方向判定a*优化  
    根据一定规则判定某一段区间的路径是一个大方向，以此分段优化
- 双向a*  
    起始点和介绍点同时做a*寻径，以对方的当前位置/最近位置/加权原始位置双向同时进行(会不会有震荡的问题)
