(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c458798a"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("d3b7");function o(t,e,r,o,n,a,i){try{var s=t[a](i),c=s.value}catch(d){return void r(d)}s.done?e(c):Promise.resolve(c).then(o,n)}function n(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function s(t){o(i,n,a,s,c,"next",t)}function c(t){o(i,n,a,s,c,"throw",t)}s(void 0)}))}}},"2b03":function(t,e,r){"use strict";r("2fe3")},"2fe3":function(t,e,r){},"4df4":function(t,e,r){"use strict";var o=r("0366"),n=r("7b0b"),a=r("9bdd"),i=r("e95a"),s=r("50c4"),c=r("8418"),d=r("9a1f"),u=r("35a1");t.exports=function(t){var e,r,l,f,h,v,p=n(t),g="function"==typeof this?this:Array,m=arguments.length,y=m>1?arguments[1]:void 0,w=void 0!==y,b=u(p),_=0;if(w&&(y=o(y,m>2?arguments[2]:void 0,2)),void 0==b||g==Array&&i(b))for(e=s(p.length),r=new g(e);e>_;_++)v=w?y(p[_],_):p[_],c(r,_,v);else for(f=d(p,b),h=f.next,r=new g;!(l=h.call(f)).done;_++)v=w?a(f,y,[l.value,_],!0):l.value,c(r,_,v);return r.length=_,r}},"96cf":function(t,e,r){var o=function(t){"use strict";var e,r=Object.prototype,o=r.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",s=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(z){c=function(t,e,r){return t[e]=r}}function d(t,e,r,o){var n=e&&e.prototype instanceof g?e:g,a=Object.create(n.prototype),i=new S(o||[]);return a._invoke=E(t,r,i),a}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(z){return{type:"throw",arg:z}}}t.wrap=d;var l="suspendedStart",f="suspendedYield",h="executing",v="completed",p={};function g(){}function m(){}function y(){}var w={};c(w,a,(function(){return this}));var b=Object.getPrototypeOf,_=b&&b(b(N([])));_&&_!==r&&o.call(_,a)&&(w=_);var x=y.prototype=g.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(n,a,i,s){var c=u(t[n],t,a);if("throw"!==c.type){var d=c.arg,l=d.value;return l&&"object"===typeof l&&o.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(l).then((function(t){d.value=t,i(d)}),(function(t){return r("throw",t,i,s)}))}s(c.arg)}var n;function a(t,o){function a(){return new e((function(e,n){r(t,o,e,n)}))}return n=n?n.then(a,a):a()}this._invoke=a}function E(t,e,r){var o=l;return function(n,a){if(o===h)throw new Error("Generator is already running");if(o===v){if("throw"===n)throw a;return T()}r.method=n,r.arg=a;while(1){var i=r.delegate;if(i){var s=j(i,r);if(s){if(s===p)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===l)throw o=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=h;var c=u(t,e,r);if("normal"===c.type){if(o=r.done?v:f,c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(o=v,r.method="throw",r.arg=c.arg)}}}function j(t,r){var o=t.iterator[r.method];if(o===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=u(o,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,p;var a=n.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function N(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){while(++n<t.length)if(o.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:T}}function T(){return{value:e,done:!0}}return m.prototype=y,c(x,"constructor",y),c(y,"constructor",m),m.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},k(L.prototype),c(L.prototype,i,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,o,n,a){void 0===a&&(a=Promise);var i=new L(d(e,r,o,n),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(x),c(x,s,"Generator"),c(x,a,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var o=e.pop();if(o in t)return r.value=o,r.done=!1,r}return r.done=!0,r}},t.values=N,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(o,n){return s.type="throw",s.arg=t,r.next=o,n&&(r.method="next",r.arg=e),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),d=o.call(i,"finallyLoc");if(c&&d){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var o=r.completion;if("throw"===o.type){var n=o.arg;O(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,o){return this.delegate={iterator:N(t),resultName:r,nextLoc:o},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=o}catch(n){"object"===typeof globalThis?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}},"9bdd":function(t,e,r){var o=r("825a"),n=r("2a62");t.exports=function(t,e,r,a){try{return a?e(o(r)[0],r[1]):e(r)}catch(i){n(t,"throw",i)}}},a630:function(t,e,r){var o=r("23e7"),n=r("4df4"),a=r("1c7e"),i=!a((function(t){Array.from(t)}));o({target:"Array",stat:!0,forced:i},{from:n})},ffa7:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"component-css-doodle-demo"},[r("h2",[t._v("css-doodle")]),t._m(0),r("div",{staticClass:"demo-wrap flex-layout"},[r("css-doodle",{attrs:{"click-to-update":""}},[t._v(" @grid: 14 / 80%; /* 可以注释吗 */ @random { border-left: 1px solid #5d81bc; } @random { border-top: 1px solid #5d81bc; } @random(.25) { background: linear-gradient( @p(#fff, tan, #5d81bc), @lp ) 50% / @r(60%) @lr no-repeat; } @random { filter: drop-shadow(0 0 10px #fff); } ")])],1),r("div",{staticClass:"prop-wrap"},[r("h2",[t._v("属性")]),r("h3",[t._v("grid属性")]),r("pre",[t._v(t._s(t.preStr.grid))]),r("div",{staticClass:"flex-layout frow justify-around"},[r("css-doodle",{attrs:{grid:"5"}},[t._v(" :doodle { grid-gap: 1px; width: 8em; height: 8em; } background: #60569e; ")]),r("css-doodle",{attrs:{grid:"1x5"}},[t._v(" :doodle { grid-row-gap: 1px; @size: 8em; } background: #60569e; width: @rand(5%, 100%); ")])],1),r("h3",[t._v("use")]),r("pre",[t._v(t._s(t.preStr.use))]),r("div",{staticClass:"flex-layout frow justify-around"},[r("css-doodle",{staticClass:"use",attrs:{use:"var(--rule)"}})],1),r("h3",[t._v("seed")]),r("pre",[t._v("seed不支持在样式模板中定义")]),r("div",{staticClass:"flex-layout frow justify-around"},[r("css-doodle",{attrs:{seed:"2020","click-to-update":""}},[t._v(" :doodle { @grid: 5 / 8em; } background: #60569e; transform: scale(@rand(.2, .9)); ")]),r("css-doodle",{attrs:{"click-to-update":""}},[t._v(" :doodle { @seed:2020; @grid: 5 / 8em; } background: #60569e; transform: scale(@rand(.2, .9)); ")])],1),r("h2",[t._v("Selectors 选择器")]),r("h3",[t._v(":doodle")]),r("pre",[t._v("选择shdow dom 根元素 hover this ↓")]),r("div",{staticClass:"flex-layout frow justify-around"},[r("css-doodle",[t._v(" :doodle { @grid:4; grid-gap: 1px; width: 8em; height: 8em; } background: #60569e; :doodle { --s: 0 } :doodle(:hover) { --s: 1 } transition: .5s cubic-bezier(.175, .885, .32, 1.275); transition-delay: @rand(500ms); transform: translateY(calc(var(--s) * 100%)); ")])],1),r("h3",[t._v(":container")]),r("pre",[t._v("容器属性 感觉像对当前容器的一个拷贝额加工 会继承所属元素的属性")]),r("div",{staticClass:"flex-layout frow justify-around"},[r("css-doodle",[t._v(" background: rgba(96, 86, 158,0.6); :doodle { overflow: hidden; @grid: 5; background: #9e6056; } :container { @size: 8em; grid-gap: 1px; transform: rotate(45deg) scale(2); } ")]),r("css-doodle",[t._v(" background: rgba(96, 86, 158,0.6); :doodle { overflow: hidden; @grid: 5; @size: 8em; background: #9e6056; } :container { grid-gap: 1px; transform: rotate(45deg) scale(2); } ")]),r("css-doodle",[t._v(" background: rgba(96, 86, 158,0.6); :doodle { "),t._v(" @grid: 5; @size: 8em; grid-gap: 1px; background: #9e6056; } ")])],1),r("div",{ref:"container",staticClass:"flex-layout frow justify-around",staticStyle:{"margin-top":"100px"},on:{mouseenter:t.containerMouseenter,mouseleave:t.containerMouseleave}},[r("css-doodle",{staticClass:"cr45",attrs:{use:"var(--cr45)"}},[t._v(" background: rgba(96, 86, 158,0.6); :doodle { "),t._v(" @grid: 5; background: #9e6056; } :container { @size: 8em; grid-gap: 1px; "),t._v(" } ")]),r("css-doodle",{staticClass:"cr45",attrs:{use:"var(--cr45)"}},[t._v(" background: rgba(96, 86, 158,0.6); :doodle { "),t._v(" @grid: 5; @size: 8em; background: #9e6056; } :container { grid-gap: 1px; "),t._v(" } ")]),r("css-doodle",[t._v(" background: rgba(96, 86, 158,0.6); :doodle { "),t._v(" @grid: 5; @size: 8em; grid-gap: 1px; background: #9e6056; } ")])],1),r("h3",[t._v("@nth")]),r("h3",[t._v("@even")]),r("h3",[t._v("@odd")]),r("h3",[t._v("@at")]),r("h3",[t._v("@random")]),r("h3",[t._v("@row")]),r("h3",[t._v("@col")])])])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"info"},[r("a",{attrs:{href:"https://css-doodle.com/"}},[t._v("css-doodle")]),t._v(" 使用 CSS 绘制图案的 Web 组件 "),r("br"),t._v(" <css-doodle /> 基于 "),r("a",{attrs:{href:"https://developers.google.com/web/fundamentals/web-components/shadowdom"}},[t._v("Shadow DOM v1")]),t._v(" 和 "),r("a",{attrs:{href:"https://html.spec.whatwg.org/multipage/scripting.html#custom-elements"}},[t._v("Custom Elements v1")]),r("br"),r("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=kummy.vscode-css-doodle"}},[t._v("vscode-css-doodle")])])}],a=r("1da1"),i=(r("96cf"),r("a630"),r("3ca3"),r("159b"),{grid:"\n支持字格式 \n'5' -- 5 x 5\n'5x7'\n'5 x 7'\n'5,7'\n",use:'\n1. 通过元素属性数组\n2. 通过根节点 @grid 属性设置\n3. 使用 <css-doodle use="var(--rule)>  ---- <style> css-doodle {--rule: ( xxx ) } 匹配应用\n    建议这样使用\n    网络慢或浏览器不支持Web Component时它不​​会中断。\n<css-doodle  grid = "5" ></css-doodle> \n或者\n<css-doodle >\n  :doodle {\n    @grid: 5 / 8em;\n  }\n</css-doodle>\n <css-doodle >\n     @grid: 5 / 8em; /*:doodle 不是必须的 可以注释 */\n </css-doodle>\n\n或者\n<style>\n  css-doodle {\n    --rule: (\n      @grid: 5 / 8em;\n    );\n  }\n</style>\n<css-doodle use="var(--rule)"></css-doodle>\n'}),s={name:"css-doodle-demo",data:function(){return{preStr:i}},methods:{containerMouseenter:function(t){var e=this;console.log("container update"),this.$nextTick(Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=Array.from(e.$refs.container.children),r.forEach((function(t){t.update()}));case 2:case"end":return t.stop()}}),t)}))))},containerMouseleave:function(t){var e=this;console.log("container update"),this.$nextTick(Object(a["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=Array.from(e.$refs.container.children),r.forEach((function(t){t.update(),console.dir(t)}));case 2:case"end":return t.stop()}}),t)}))))}}},c=s,d=(r("2b03"),r("2877")),u=Object(d["a"])(c,o,n,!1,null,"063d104c",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-c458798a.7a49eb97.js.map