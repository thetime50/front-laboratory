webpackJsonp([4],{"8c4R":function(e,t){},D6ZU:function(e,t){},"I/lU":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),i={name:"menu-item",props:{menu:{required:!0},path:{type:Array,default:function(){return[]}},ipath:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{route:function(){return this.path.map(function(e){return e.route}).join("/")}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"component-menu-item  el-menu-item"},[e.menu.children?n("el-submenu",{attrs:{index:e.menu.id}},[n("template",{slot:"title"},[e._v(e._s(e.menu.title))]),e._v(" "),e._l(e.menu.children,function(t,r){return[n("menu-item",{attrs:{menu:t,path:e.path.concat([t]),ipath:e.ipath.concat([r])}})]})],2):n("el-menu-item",{attrs:{index:e.menu.id,route:e.route}},[e._v("\r\n        "+e._s(e.menu.title)+"\r\n    ")])],1)},staticRenderFns:[]};var o=n("VU/8")(i,a,!1,function(e){n("I/lU")},"data-v-437d34d2",null).exports,u=n("fZjL"),c=n.n(u),l=n("mvHQ"),s=n.n(l),p=n("pFYg"),f=n.n(p),d={CloneDeep:function(e){var t,n=e.constructor===Array?[]:{};if("object"===(void 0===e?"undefined":f()(e))){if(window.JSON)t=s()(e),n=JSON.parse(t);else for(var r in e)n[r]="object"===f()(e[r])?cloneObj(e[r]):e[r];return n}},CloneDeepObj:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("object"===(void 0===e?"undefined":f()(e))){if(null===e)return null;var r=e.constructor===Array?[]:{},i=function(e,n,r){return"object"===f()(e[n])?t.CloneDeepObj(e[n],r):e[n]};if(Array.isArray(e))for(var a in e)r[a]=i(e,a,n);else{var o=c()(e).sort();n&&(o=o.sort()),o.forEach(function(t){r[t]=i(e,t,n)})}return r}},objectPitch:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i={};for(var a in e){var o=void 0;n?t.indexOf(a)>=0&&(o=e[a]):t.indexOf(a)<0&&(o=e[a]),o&&(i[a]=r?this.CloneDeepObj(o):o)}return i},CloneDeepSort:function(e){var t=this;if("object"===(void 0===e?"undefined":f()(e))){if(null===e)return null;var n=e.constructor===Array?[]:{};if("object"===(void 0===e?"undefined":f()(e)))c()(e).sort().forEach(function(r){n[r]="object"===f()(e[r])?t.CloneDeepSort(e[r]):e[r]});else for(var r in e)(n[r]="object"===f()(e[r]))?this.CloneDeepSort(e[r]):e[r];return n}},traverseTree:function e(t,n,r,i,a){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,u=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[],c=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[],l=!1;u.push(t),r&&(l=(r(t,"before",o,u,c)||{}).skip),i&&(l=(i(t,"before",o,u,c)||{}).skip);var s=void 0;if(n)if("string"==typeof n||"number"==typeof n)s=t[n];else{if("function"!=typeof n)throw"unsupported types";s=n(t,o,u,c)}else s=t.children;s&&Array.isArray(s)&&!l&&s.forEach(function(t,l,s){c.push(l),e(t,n,r,i,a,o+1,u,c),c.pop()}),r&&r(t,"after",o,u,c),a&&a(t,"after",o,u,c),u.pop()},getVm:function(){return document.querySelector("#app").__vue__},convertToChinaNum:function(e){var t=new Array("零","一","二","三","四","五","六","七","八","九"),n=new Array("","十","百","千","万","十","百","千","亿","十","百","千","万","十","百","千","亿");if(!e||isNaN(e))return"零";for(var r=e.toString().split(""),i="",a=0;a<r.length;a++){var o=r.length-1-a;i=n[a]+i,i=t[r[o]]+i}return i=(i=(i=(i=(i=(i=i.replace(/零(千|百|十)/g,"零").replace(/十零/g,"十")).replace(/零+/g,"零")).replace(/零亿/g,"亿").replace(/零万/g,"万")).replace(/亿万/g,"亿")).replace(/零+$/,"")).replace(/^一十/g,"十")}},m={name:"menu-tree",components:{menuItem:o},props:{menu:{type:Array,default:[]}},data:function(){return{activeIndex:"2-1"}},methods:{menuSelected:function(e,t,n){this.$router.push("/"+n.route)}},watch:{"$route.path":{handler:function(e,t){var n=this,r=e;r=r.split("/").slice(3);var i=null;d.traverseTree({children:this.navMenus},null,null,function(e,t,n,a,o){r.length&&a.length-1==r.length&&(a.slice(1).map(function(e){return e.route}).reduce(function(e,t,n,i){return e&&t==r[n]},!0)&&(i=e))}),i&&this.$nextTick(function(){n.defaultActive=i.id})},immediate:!0}}},h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"component-menu-tree"},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":this.activeIndex,mode:"horizontal"},on:{select:this.menuSelected}},[this._l(this.menu,function(e,n){return[t("menu-item",{attrs:{menu:e,path:[e],ipath:[n]}})]})],2)],1)},staticRenderFns:[]};var v=[{title:"首页",id:"0",route:"home"},{title:"page1",id:"1",route:"page1",children:[{title:"page1-1",id:"1-1",route:"page1-1"},{title:"page1-2",id:"1-2",route:"page1-2"}]},{title:"page2",id:"2",route:"page2",children:[{title:"page2-1",id:"2-1",route:"page2-1"},{title:"page2-2",id:"2-2",route:"page2-2"}]}],g={name:"wx-breadcrumb",data:function(){return{root:""}},computed:{bitems:function(){var e=[],t=this.$route.path.split("/"),n=this;return function r(i){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];i.forEach(function(i,u,c){if(i.route==t[a]){var l=o.map(function(e){return e.route});l.unshift(n.root),l.push(i.route),l=l.join("/"),e.push({title:i.title,path:l}),i.children&&a<t.length-1&&r(i.children,a+1,o.concat(i))}})}(v),e}}},b={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component-breadcrumb"},[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",[n("i",{staticClass:"el-icon-s-home"})]),e._v(" "),e._l(e.bitems,function(t){return[n("el-breadcrumb-item",[e._v(e._s(t.title))])]})],2)],1)},staticRenderFns:[]};var _={name:"App",components:{menuTree:n("VU/8")(m,h,!1,function(e){n("pQBY")},"data-v-340f031f",null).exports,breadcrumb:n("VU/8")(g,b,!1,function(e){n("D6ZU")},"data-v-1ece0733",null).exports},data:function(){return{mainMenu:v}}},y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"flex-layout",attrs:{id:"app"}},[t("menu-tree",{staticClass:"flex-none",attrs:{menu:this.mainMenu}}),this._v(" "),t("breadcrumb",{staticClass:"flex-none"}),this._v(" "),t("router-view",{staticClass:"flex-auto"})],1)},staticRenderFns:[]};var A=n("VU/8")(_,y,!1,function(e){n("tAO1")},null,null).exports,C=n("/ocq"),j={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"component-home"},[this._v("\r\n    home\r\n")])},staticRenderFns:[]};var x=n("VU/8")({name:"home",data:function(){return{}}},j,!1,function(e){n("8c4R")},"data-v-0ca37bb4",null).exports;r.default.use(C.a);var w=new C.a({routes:[{path:"/",redirect:"home"},{path:"/home",name:"home",component:x},{path:"/page1",redirect:"page1/page1-1",name:"page1",component:function(){return n.e(0).then(n.bind(null,"31cN"))},children:[{path:"page1-1",name:"page1-1",component:function(){return n.e(1).then(n.bind(null,"Hm4G"))}}]},{path:"*",component:function(){return n.e(2).then(n.bind(null,"FbWW"))}}]}),O=n("zL8q"),$=n.n(O);n("tvR6");r.default.use($.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:w,components:{App:A},template:"<App/>"})},pQBY:function(e,t){},tAO1:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.1c314a0f4db5d1252b3b.js.map