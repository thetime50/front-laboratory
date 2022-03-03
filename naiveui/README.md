# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## note 

[naive-ui](https://www.naiveui.com/zh-CN/os-theme/docs/installation)  
<s>[Vue3+Vite+TS+Eslint（Airbnb规则）搭建生产项目，踩坑详记（一）：项目初始化、引入ESLint](https://zhuanlan.zhihu.com/p/388703150)</s>

最后使用vuecli 创建vue3 ts eslint 文件获取 .eslintrc.js 配置  
配置 'vue/setup-compiler-macros': true,  处理 defineProps 报错问题

// todo vue-eslint-parser
