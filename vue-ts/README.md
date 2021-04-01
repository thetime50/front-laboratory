# vue-ts

> vue ts test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#  note
vue + typescript 项目起手式  
https://segmentfault.com/a/1190000011744210


```cmd
安装vue的官方插件
npm i vue-class-component vue-property-decorator --save

// ts-loader typescript 必须安装，其他的相信你以后也会装上的
npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev
```

- vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
- vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
- ts-loader：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件
- tslint-loader跟tslint：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）
- tslint-config-standard：tslint 配置 standard风格的约束
