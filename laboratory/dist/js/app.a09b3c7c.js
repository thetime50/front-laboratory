(function(e){function n(n){for(var c,r,a=n[0],i=n[1],l=n[2],d=0,h=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(u,r)&&u[r]&&h.push(u[r][0]),u[r]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);s&&s(n);while(h.length)h.shift()();return o.push.apply(o,l||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],c=!0,r=1;r<t.length;r++){var a=t[r];0!==u[a]&&(c=!1)}c&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},r={app:0},u={app:0},o=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-20425114":"bf7f34c8","chunk-219e08a6":"61c8299d","chunk-271537ec":"9053bb79","chunk-2901adc0":"a1870c93","chunk-2a70628e":"6ade9936","chunk-30b0b20c":"e0214abc","chunk-336f5b8a":"615a476b","chunk-388a8d40":"6fe9bcc8","chunk-0fc55234":"91710f36","chunk-4bf57718":"c1618662","chunk-39341a96":"fa478b18","chunk-3a742678":"96bde9b9","chunk-3ea79a62":"ba40a9a5","chunk-42601ad9":"3bc0e195","chunk-426503bb":"f49d93f6","chunk-635d6638":"7ab859c1","chunk-714f4656":"726dfb99","chunk-44db70c4":"9f7ac68f","chunk-4cb9f67c":"acfd3177","chunk-53ebb1d9":"c1eeb7d7","chunk-6f3542c7":"cbaebfd6","chunk-c93ea066":"491892e6","chunk-5ff84632":"9ffdfeca","chunk-6143fd86":"47f84d11","chunk-619622df":"fa1c062e","chunk-654342aa":"a6f8b953","chunk-6d438436":"25d55411","chunk-6de33aa4":"e5360a15","chunk-71d2ca16":"bf311986","chunk-7d409a4c":"15da55af","chunk-7f0e9e91":"7e93825d","chunk-89720522":"7c3d0294","chunk-8ac2d040":"c33d35bb","chunk-96313082":"4be7b943","chunk-9d7054b6":"a4a8dcab","chunk-a020cef2":"8b531dba","chunk-a959b536":"e0b3918e","chunk-c7646962":"4360329e","chunk-f21c8754":"198b0759","chunk-ff92cc76":"b7067b84"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-20425114":1,"chunk-219e08a6":1,"chunk-271537ec":1,"chunk-2901adc0":1,"chunk-2a70628e":1,"chunk-30b0b20c":1,"chunk-336f5b8a":1,"chunk-0fc55234":1,"chunk-4bf57718":1,"chunk-39341a96":1,"chunk-3a742678":1,"chunk-3ea79a62":1,"chunk-42601ad9":1,"chunk-635d6638":1,"chunk-714f4656":1,"chunk-44db70c4":1,"chunk-4cb9f67c":1,"chunk-6f3542c7":1,"chunk-c93ea066":1,"chunk-5ff84632":1,"chunk-6143fd86":1,"chunk-619622df":1,"chunk-654342aa":1,"chunk-6d438436":1,"chunk-6de33aa4":1,"chunk-71d2ca16":1,"chunk-7d409a4c":1,"chunk-7f0e9e91":1,"chunk-89720522":1,"chunk-8ac2d040":1,"chunk-96313082":1,"chunk-9d7054b6":1,"chunk-a020cef2":1,"chunk-a959b536":1,"chunk-c7646962":1,"chunk-f21c8754":1,"chunk-ff92cc76":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-20425114":"267be2fb","chunk-219e08a6":"267be2fb","chunk-271537ec":"267be2fb","chunk-2901adc0":"267be2fb","chunk-2a70628e":"267be2fb","chunk-30b0b20c":"267be2fb","chunk-336f5b8a":"f541cac7","chunk-388a8d40":"31d6cfe0","chunk-0fc55234":"267be2fb","chunk-4bf57718":"267be2fb","chunk-39341a96":"267be2fb","chunk-3a742678":"267be2fb","chunk-3ea79a62":"267be2fb","chunk-42601ad9":"9495aaaf","chunk-426503bb":"31d6cfe0","chunk-635d6638":"267be2fb","chunk-714f4656":"267be2fb","chunk-44db70c4":"1b28b167","chunk-4cb9f67c":"7fd0aed9","chunk-53ebb1d9":"31d6cfe0","chunk-6f3542c7":"267be2fb","chunk-c93ea066":"aaf91d77","chunk-5ff84632":"56af5bd8","chunk-6143fd86":"267be2fb","chunk-619622df":"267be2fb","chunk-654342aa":"267be2fb","chunk-6d438436":"267be2fb","chunk-6de33aa4":"267be2fb","chunk-71d2ca16":"70168562","chunk-7d409a4c":"72168341","chunk-7f0e9e91":"267be2fb","chunk-89720522":"267be2fb","chunk-8ac2d040":"267be2fb","chunk-96313082":"267be2fb","chunk-9d7054b6":"267be2fb","chunk-a020cef2":"92d0b50b","chunk-a959b536":"e22fe65f","chunk-c7646962":"1ef50fe8","chunk-f21c8754":"97c1067b","chunk-ff92cc76":"9648fefe"}[e]+".css",u=i.p+c,o=document.getElementsByTagName("link"),a=0;a<o.length;a++){var l=o[a],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===c||d===u))return n()}var h=document.getElementsByTagName("style");for(a=0;a<h.length;a++){l=h[a],d=l.getAttribute("data-href");if(d===c||d===u)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var c=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=c,delete r[e],s.parentNode.removeChild(s),t(o)},s.href=u;var f=document.getElementsByTagName("head")[0];f.appendChild(s)})).then((function(){r[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var o=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=o);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=a(e);var h=new Error;l=function(n){d.onerror=d.onload=null,clearTimeout(s);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;h.message="Loading chunk "+e+" failed.\n("+c+": "+r+")",h.name="ChunkLoadError",h.type=c,h.request=r,t[1](h)}u[e]=void 0}};var s=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/front-laboratory/laboratory/dist/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=n,l=l.slice();for(var h=0;h<l.length;h++)n(l[h]);var s=d;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"0585":function(e,n,t){},"0736":function(e,n,t){},"0ded":function(e,n,t){},"2e87":function(e,n,t){"use strict";t("0ded")},"2ee5":function(e,n,t){"use strict";var c=t("ce44");c["a"].render=function(e){var n=this;return e("div",{style:n.styles})},n["a"]=c["a"]},"440a":function(e,n,t){"use strict";var c=t("53ca"),r=(t("159b"),t("4e82"),t("b64b"),t("ac1f"),t("1276"),t("d3b7"),t("25f0"),t("5319"),function e(n,t,c,r,u){var o,a,i,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[],h=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[],s=!1;if(d.push(n),c&&(o=c(n,"before",l,d,h)||{},s=o.skip),r&&(a=r(n,"before",l,d,h)||{},s=a.skip),t)if("string"==typeof t||"number"==typeof t)i=n[t];else{if("function"!=typeof t)throw"unsupported types";i=t(n,l,d,h)}else i=n.children;i&&Array.isArray(i)&&!s&&i.forEach((function(n,o,a){h.push(o),e(n,t,c,r,u,l+1,d,h),h.pop()})),c&&c(n,"after",l,d,h),u&&u(n,"after",l,d,h),d.pop()}),u={CloneDeep:function(e){var n,t=e.constructor===Array?[]:{};if("object"===Object(c["a"])(e)){if(window.JSON)n=JSON.stringify(e),t=JSON.parse(n);else for(var r in e)t[r]="object"===Object(c["a"])(e[r])?cloneObj(e[r]):e[r];return t}},CloneDeepObj:function(e){var n,t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("object"===Object(c["a"])(e)){if(null===e)return null;n=e.constructor===Array?[]:{};var u=function(e,n,r){return"object"===Object(c["a"])(e[n])?t.CloneDeepObj(e[n],r):e[n]};if(Array.isArray(e))for(var o in e)n[o]=u(e,o,r);else{var a=Object.keys(e).sort();r&&(a=a.sort()),a.forEach((function(t){n[t]=u(e,t,r)}))}return n}},objectPitch:function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r={};for(var u in e){var o=void 0;t?n.indexOf(u)>=0&&(o=e[u]):n.indexOf(u)<0&&(o=e[u]),o&&(r[u]=c?this.CloneDeepObj(o):o)}return r},CloneDeepSort:function(e){var n,t=this;if("object"===Object(c["a"])(e)){if(null===e)return null;if(n=e.constructor===Array?[]:{},"object"===Object(c["a"])(e)){var r=Object.keys(e).sort();r.forEach((function(r){n[r]="object"===Object(c["a"])(e[r])?t.CloneDeepSort(e[r]):e[r]}))}else for(var u in e)(n[u]="object"===Object(c["a"])(e[u]))?this.CloneDeepSort(e[u]):e[u];return n}},traverseTree:r,getVm:function(){return document.querySelector("#app").__vue__},convertToChinaNum:function(e){var n=new Array("零","一","二","三","四","五","六","七","八","九"),t=new Array("","十","百","千","万","十","百","千","亿","十","百","千","万","十","百","千","亿");if(!e||isNaN(e))return"零";for(var c=e.toString().split(""),r="",u=0;u<c.length;u++){var o=c.length-1-u;r=t[u]+r;var a=c[o];r=n[a]+r}return r=r.replace(/零(千|百|十)/g,"零").replace(/十零/g,"十"),r=r.replace(/零+/g,"零"),r=r.replace(/零亿/g,"亿").replace(/零万/g,"万"),r=r.replace(/亿万/g,"亿"),r=r.replace(/零+$/,""),r=r.replace(/^一十/g,"十"),r}};n["a"]=u},"4a44":function(e,n){e.exports=THREE},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"flex-layout justify-start",class:{frow:"column"==e.ui.menu},attrs:{id:"app"}},[t("menu-tree",{staticClass:"flex-none",attrs:{menu:e.menu}}),t("div",{staticClass:"flex-auto flex-layout  justify-start"},[t("breadcrumb",{staticClass:"flex-none"}),t("router-view",{staticClass:"flex-auto scroll-all"})],1)],1)},u=[],o=t("5530"),a=t("2f62"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"component-menu-tree",class:e.ui.menu},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"column"==e.ui.menu?"vertical":"horizontal",collapse:e.isCollapse},on:{select:e.menuSelected}},[e._l(e.menu,(function(e,n){return[t("menu-item",{attrs:{menu:e,path:[e],ipath:[n]}})]}))],2)],1)},l=[],d=(t("fb6a"),t("ac1f"),t("1276"),t("d81d"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.menu.children?t("el-submenu",{staticClass:"component-menu-item",attrs:{index:e.menu.id}},[t("template",{slot:"title"},[e._v(e._s(e.menu.title))]),e._l(e.menu.children,(function(n,c){return[t("menu-item",{attrs:{menu:n,path:e.path.concat([n]),ipath:e.ipath.concat([c])}})]}))],2):t("el-menu-item",{staticClass:"component-menu-item",attrs:{index:e.menu.id,route:e.route}},[e._v(" "+e._s(e.menu.title)+" ")])}),h=[],s=(t("a15b"),{name:"menu-item",props:{menu:{required:!0},path:{type:Array,default:function(){return[]}},ipath:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{route:function(){return this.path.map((function(e){return e.route})).join("/")}}}),f=s,m=(t("5889"),t("2877")),b=Object(m["a"])(f,d,h,!1,null,"18145c06",null),p=b.exports,k=t("440a"),v={name:"menu-tree",components:{menuItem:p},props:{menu:{type:Array,default:[]}},data:function(){return{activeIndex:"2-1",isCollapse:!0}},computed:Object(o["a"])({},Object(a["b"])(["ui"])),methods:{menuSelected:function(e,n,t){this.$router.push("/"+t.route)}},watch:{"$route.path":{handler:function(e,n){var t=this,c=e;c=c.split("/").slice(3);var r=null;k["a"].traverseTree({children:this.navMenus},null,null,(function(e,n,t,u,o){if(c.length&&u.length-1==c.length){var a=u.slice(1).map((function(e){return e.route})),i=a.reduce((function(e,n,t,r){return e&&n==c[t]}),!0);i&&(r=e)}})),r&&this.$nextTick((function(){t.defaultActive=r.id}))},immediate:!0}}},g=v,y=(t("ec97"),Object(m["a"])(g,i,l,!1,null,"6cd27aa2",null)),j=y.exports,w=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"component-breadcrumb"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",[t("i",{staticClass:"el-icon-s-home"})]),e._l(e.bitems,(function(n){return[t("el-breadcrumb-item",[e._v(e._s(n.title))])]}))],2)],1)},O=[],x=(t("159b"),t("99af"),{title:"threejs",id:"2",route:"threejs",children:[{title:"demo",id:"2-1",route:"demo",children:[{title:"cuble",id:"2-1-1",route:"cuble"},{title:"grid",id:"2-1-2",route:"grid"}]},{title:"1. three.js快速入门",id:"2-2",route:"start",children:[{title:"1.第一个3D场景",id:"2-2-1",route:"scene"},{title:"3.鼠标操作三维场景旋转缩放",id:"2-2-2",route:"control"},{title:"4.几何体",id:"2-2-3",route:"geometry"},{title:"5.材质",id:"2-2-4",route:"material"}]},{title:"2、顶点概念、几何体结构",id:"2-3",route:"vertices-geometry",children:[{title:"1.2.3.顶点位置 颜色 法向量光照",id:"2-3-1",route:"vertices"},{title:"4.顶点索引复用顶点数据",id:"2-3-4",route:"vertices-index"},{title:"5.设置Geometry",id:"2-3-5",route:"objgeometry"},{title:"6.设置Geometry三角面",id:"2-3-6",route:"objgeometry-face"},{title:"7.访问几何体对象的数据",id:"2-3-7",route:"objgeometry-data"},{title:"8.旋转平移缩放变换、复制、克隆",id:"2-3-8",route:"objgeometry-operation"}]},{title:"3、材质对象",id:"2-4",route:"material",children:[{title:"1.常用材质介绍",id:"2-4-1",route:"common"}]},{title:"4、模型对象",id:"2-5",route:"object3d",children:[{title:"2.模型对象旋转平移缩放变换",id:"2-5-1",route:"object3d-operation"}]},{title:" 5、光源对象",id:"2-6",route:"light",children:[{title:"1.光照原理和常见光源类型",id:"2-6-1",route:"light-common"}]}]}),_={title:"demo",id:"dm",route:"demo",children:[{title:"DICOM 切片",id:"dm-1",route:"dicom"},{title:"clientjs",id:"clientjs",route:"clientjs"},{title:"qs",id:"qs",route:"qs"},{title:"protobuf",id:"protobuf",route:"protobuf"},{title:"css-doodle",id:"css-doodle",route:"css-doodle"},{title:"sku",id:"sku",route:"sku"}]},C={title:"css",id:"css",route:"css",children:[{title:"tailwindcss",id:"tailwindcss",route:"tailwindcss"}]},E={title:"animation",id:"1",route:"animation",children:[{title:"vue-transition",id:"1-1",route:"vue-transition"},{title:"anime",id:"1-2",route:"anime",children:[{title:"start",id:"1-2-1",route:"start"}]},{title:"scroll-animate",id:"scroll-animate",route:"scroll-animate"}]},S={title:"opencv",id:"cv",route:"opencv",children:[{title:"cv-start",id:"cv-1",route:"cv-start"}]},T={title:"百度地图",id:"bmap",route:"bmap",children:[{title:"start",id:"bmstart",route:"bmstart"},{title:"gl",id:"gl",route:"gl",children:[{title:"gl start",id:"glstart",route:"glstart"}]},{title:"v30",id:"v30",route:"v30",children:[{title:"v30 start",id:"v30start",route:"v30start"}]},{title:"lite",id:"lite",route:"lite",children:[{title:"lite start",id:"litestart",route:"litestart"}]}]},A={title:"web",id:"web",route:"web",children:[{title:"index",id:"web-index",route:"index"},{title:"shadow-dom",id:"shadow-dom",route:"shadow-dom"},{title:"custom-elements",id:"custom-elements",route:"custom-elements"}]},P=[{title:"首页",id:"0",route:"home"},{title:"gameoflife",id:"gol",route:"gameoflife"},C,E,x,_,S,T,A],$={name:"wx-breadcrumb",data:function(){return{root:""}},computed:{bitems:function(){var e=[],n=this.$route.path.split("/").slice(1),t=this,c=function c(r){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];r.forEach((function(r,a,i){if(r.route==n[u]){var l=o.map((function(e){return e.route}));l.unshift(t.root),l.push(r.route),l=l.join("/"),e.push({title:r.title,path:l}),r.children&&u<n.length-1&&c(r.children,u+1,o.concat(r))}}))};return c(P),e}}},D=$,M=(t("2e87"),Object(m["a"])(D,w,O,!1,null,"c985892e",null)),N=M.exports,q={name:"App",components:{menuTree:j,breadcrumb:N},data:function(){return{menu:P}},computed:Object(o["a"])({},Object(a["b"])(["ui"]))},I=q,J=(t("5c0b"),Object(m["a"])(I,r,u,!1,null,null,null)),L=J.exports,B=(t("d3b7"),t("3ca3"),t("ddb0"),t("8c4f")),z=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},G=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"component-home"},[e._v(" home"),t("br"),e._v(" from vuecli4 ")])}],H={name:"home",data:function(){return{}}},F=H,K=(t("8031"),Object(m["a"])(F,z,G,!1,null,"e607980c",null)),R=K.exports,U={path:"/threejs",redirect:"threejs/demo",name:"threejs",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"demo",name:"demo",redirect:"demo/cuble",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"cuble",name:"cuble",component:function(){return t.e("chunk-ff92cc76").then(t.bind(null,"b882"))}},{path:"grid",name:"grid",component:function(){return t.e("chunk-71d2ca16").then(t.bind(null,"daa2"))}}]},{path:"start",name:"",redirect:"start/scene",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"scene",name:"scene",component:function(){return t.e("chunk-3a742678").then(t.bind(null,"0b84"))}},{path:"control",name:"control",component:function(){return t.e("chunk-271537ec").then(t.bind(null,"7f02"))}},{path:"geometry",name:"geometry",component:function(){return t.e("chunk-6143fd86").then(t.bind(null,"f583"))}},{path:"material",name:"material",component:function(){return t.e("chunk-219e08a6").then(t.bind(null,"5a6e"))}}]},{path:"vertices-geometry",name:"",redirect:"vertices-geometry/vertices",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"vertices",name:"vertices",component:function(){return Promise.all([t.e("chunk-426503bb"),t.e("chunk-714f4656")]).then(t.bind(null,"4a82"))}},{path:"vertices-index",name:"vertices-index",component:function(){return Promise.all([t.e("chunk-426503bb"),t.e("chunk-635d6638")]).then(t.bind(null,"0499"))}},{path:"objgeometry",name:"objgeometry",component:function(){return t.e("chunk-619622df").then(t.bind(null,"1589"))}},{path:"objgeometry-face",name:"objgeometry-face",component:function(){return t.e("chunk-30b0b20c").then(t.bind(null,"8ed7"))}},{path:"objgeometry-data",name:"objgeometry-data",component:function(){return t.e("chunk-2901adc0").then(t.bind(null,"e974c"))}},{path:"objgeometry-operation",name:"objgeometry-operation",component:function(){return t.e("chunk-9d7054b6").then(t.bind(null,"2684"))}}]},{path:"material",name:"",redirect:"material/common",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"common",name:"common",component:function(){return Promise.all([t.e("chunk-388a8d40"),t.e("chunk-0fc55234")]).then(t.bind(null,"18b0"))}}]},{path:"object3d",name:"",redirect:"object3d/object3d-operation",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"object3d-operation",name:"object3d-operation",component:function(){return Promise.all([t.e("chunk-388a8d40"),t.e("chunk-4bf57718")]).then(t.bind(null,"e39e"))}}]},{path:"light",name:"",redirect:"light/light-common",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"light-common",name:"light-common",component:function(){return t.e("chunk-654342aa").then(t.bind(null,"d47c"))}}]}]},V={path:"/demo",name:"demo",redirect:"demo/dicom",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"dicom",name:"dicom",component:function(){return t.e("chunk-42601ad9").then(t.bind(null,"017b"))}},{path:"clientjs",name:"clientjs",component:function(){return t.e("chunk-336f5b8a").then(t.bind(null,"8660"))}},{path:"qs",name:"qs",component:function(){return t.e("chunk-6de33aa4").then(t.bind(null,"e837"))}},{path:"protobuf",name:"protobuf",component:function(){return t.e("chunk-96313082").then(t.bind(null,"fc4d"))}},{path:"css-doodle",name:"css-doodle",component:function(){return t.e("chunk-f21c8754").then(t.bind(null,"ffa7"))}},{path:"sku",name:"sku",component:function(){return t.e("chunk-a020cef2").then(t.bind(null,"f29e"))}},{path:"vueEchartsTest",name:"vueEchartsTest",component:function(){return t.e("chunk-5ff84632").then(t.bind(null,"e631"))}}]},X={path:"/css",name:"css",redirect:"css/tailwindcss",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"tailwindcss",name:"tailwindcss",component:function(){return t.e("chunk-39341a96").then(t.bind(null,"3ce7"))}}]},Q={path:"/animation",redirect:"animation/vue-transition",name:"animation",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"vue-transition",name:"vue-transition",component:function(){return t.e("chunk-a959b536").then(t.bind(null,"3bdc"))}},{path:"anime",name:"anime",redirect:"anime/start",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"start",name:"start",component:function(){return t.e("chunk-c7646962").then(t.bind(null,"ace1"))}}]},{path:"scroll-animate",name:"scroll-animate",component:function(){return t.e("chunk-7d409a4c").then(t.bind(null,"f6ac"))}}]},W={path:"/opencv",redirect:"opencv/cv-start",name:"opencv",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"cv-start",name:"cv-start",component:function(){return Promise.all([t.e("chunk-53ebb1d9"),t.e("chunk-6f3542c7")]).then(t.bind(null,"e060"))}}]},Y={path:"/bmap",name:"bmap",redirect:"bmap/start",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"bmstart",name:"bmstart",component:function(){return t.e("chunk-89720522").then(t.bind(null,"ee2a"))}},{path:"gl",name:"gl",redirect:"gl/start",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"glstart",name:"glstart",component:function(){return t.e("chunk-7f0e9e91").then(t.bind(null,"b3a0"))}}]},{path:"v30",name:"v30",redirect:"v30/start",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"v30start",name:"v30start",component:function(){return t.e("chunk-3ea79a62").then(t.bind(null,"49f6"))}}]},{path:"lite",name:"lite",redirect:"lite/start",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"litestart",name:"litestart",component:function(){return t.e("chunk-20425114").then(t.bind(null,"ab08"))}}]}]},Z={path:"/web",redirect:"web/shadow-dom",name:"web",component:function(){return t.e("chunk-6d438436").then(t.bind(null,"36ea"))},children:[{path:"index",name:"web-index",component:function(){return t.e("chunk-4cb9f67c").then(t.bind(null,"eadc"))}},{path:"shadow-dom",name:"shadow-dom",component:function(){return t.e("chunk-2a70628e").then(t.bind(null,"70c8"))}},{path:"custom-elements",name:"custom-elements",component:function(){return t.e("chunk-8ac2d040").then(t.bind(null,"b2a7"))}}]},ee=t("323e"),ne=t.n(ee);t("a5d8");c["default"].use(B["a"]);var te=new B["a"]({routes:[{path:"/",redirect:"home"},{path:"/home",name:"home",component:R},{path:"/gameoflife",name:"gameoflife",component:function(){return Promise.all([t.e("chunk-53ebb1d9"),t.e("chunk-c93ea066")]).then(t.bind(null,"921b"))}},X,Q,U,V,W,Y,Z,{path:"*",component:function(){return t.e("chunk-44db70c4").then(t.bind(null,"3e1f"))}}]});ne.a.configure({showSpinner:!1}),te.beforeEach((function(e,n,t){ne.a.start(),t()})),te.afterEach((function(){ne.a.done()}));var ce=te,re={namespaced:!0,state:function(){return{menu:"column"}},mutations:{},actions:{}};c["default"].use(a["a"]);var ue=new a["a"].Store({state:{},mutations:{},actions:{},modules:{ui:re}}),oe=t("5c96"),ae=t.n(oe),ie=(t("0fae"),t("428d")),le=t.n(ie);c["default"].directive("resize",le.a);t("1054");var de=t("38b8"),he=(t("a766"),t("1368")),se=t.n(he);oe["Submenu"].methods.handleMouseenter=function(e){var n=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.showTimeout;if("ActiveXObject"in window||"focus"!==e.type||e.relatedTarget){var c=this.rootMenu,r=this.disabled;if(!("click"===c.menuTrigger&&"horizontal"===c.mode||!c.collapse&&"vertical"===c.mode||r)&&(this.dispatch("ElSubmenu","mouse-enter-child"),clearTimeout(this.timeout),this.timeout=setTimeout((function(){n.rootMenu.openMenu(n.index,n.indexPath)}),t),this.appendToBody)){var u=this.$parent.$el;u==this.$el&&(u=this.$parent.$parent.$el),u.dispatchEvent(new MouseEvent("mouseenter"))}}};t("2ee5");se.a.polyfill(),c["default"].use(ae.a),c["default"].use(de["a"]),c["default"].config.ignoredElements=["popup-info","css-doodle"],c["default"].config.productionTip=!1,new c["default"]({el:"#app",router:ce,store:ue,render:function(e){return e(L)}})},5889:function(e,n,t){"use strict";t("0736")},"5c0b":function(e,n,t){"use strict";t("9c0c")},8031:function(e,n,t){"use strict";t("0585")},"9c0c":function(e,n,t){},a766:function(e,n,t){},cdb9:function(e,n){e.exports=anime},e325:function(e,n,t){},ec97:function(e,n,t){"use strict";t("e325")}});
//# sourceMappingURL=app.a09b3c7c.js.map