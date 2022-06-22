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

## three 资源

[three Libraries and Plugins](https://threejs.org/docs/#manual/en/introduction/Libraries-and-Plugins)  
[基础形状 Three.js Primitives](https://r105.threejsfundamentals.org/threejs/lessons/threejs-primitives.html)  
[three 社区讨论 OpenSourced Library/List of Meshes/Geometries](https://discourse.threejs.org/t/opensourced-library-list-of-meshes-geometries/38674)  

[three-rounded-box](https://www.npmjs.com/package/three-rounded-box)


- 旋转轴没有清清楚 end 没有处理好
