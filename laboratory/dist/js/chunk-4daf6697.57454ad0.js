(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4daf6697"],{"0499":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component-vertices-index flex-layout"},[n("div",{directives:[{name:"resize",rawName:"v-resize:throttle",value:e.onResize,expression:"onResize",arg:"throttle"}],staticClass:"three-wrap flex-auto"},[n("div",{ref:"three",staticClass:"three full-block"})])])},i=[],a=(n("a73a"),n("6424"),n("4406"),n("f8e5"),n("0d25"),n("f238"),n("4ec9"),n("c61c"),n("014d"),n("aa4d"),n("38260"),n("e385"),n("9bb8"),n("4a47"),n("a2b1"),n("42f2"),n("4b5c"),n("9b88"),n("2c05"),n("ba44"),n("66e5"),n("0ed3"),n("2314"),n("dfcc"),n("2b3f"),n("6761"),n("4a44")),s=(n("2de6"),{name:"vertices-index",data:function(){return{renderFun:null,para:{}}},mounted:function(){var e=this;this.$nextTick((function(){e.init()}))},computed:{},methods:{render:function(){this.renderFun&&this.renderFun()},onResize:function(){},init:function(){var e=this,t=this.$refs.three;t.firstChild&&t.removeChild(t.firstChild);var n=new a["Scene"],r=new a["BufferGeometry"],i=new Float32Array([0,0,0,80,0,0,80,80,0,0,80,0]),s=new a["BufferAttribute"](i,3);r.attributes.position=s;var o=new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1]);r.attributes.normal=new a["BufferAttribute"](o,3);var d=new Uint16Array([0,1,2,0,2,3]);r.index=new a["BufferAttribute"](d,1);var c=new a["MeshLambertMaterial"]({color:255,side:a["DoubleSide"]}),u=new a["Mesh"](r,c);n.add(u);var h=new a["AxisHelper"](250);n.add(h);var f=new a["PointLight"](16777215);f.position.set(400,200,300),n.add(f);var l=new a["AmbientLight"](4473924);n.add(l);var v=this.$refs.three.clientWidth,w=this.$refs.three.clientHeight,b=v/w,p=200,m=new a["OrthographicCamera"](-p*b,p*b,p,-p,1,1e3);m.position.set(200,300,200),m.lookAt(n.position);var C=new a["WebGLRenderer"];C.setClearColor(12178431,1),this.$refs.three.appendChild(C.domElement),this.renderFun=function(){var t=e.$refs.three.clientWidth,r=e.$refs.three.clientHeight;C.setSize(t,r),C.render(n,m)},this.renderFun();var x=new a["OrbitControls"](m,C.domElement);x.addEventListener("change",this.renderFun)}},watch:{para:{handler:function(e,t){this.init()},deep:!0}}}),o=s,d=(n("3872"),n("cba8")),c=Object(d["a"])(o,r,i,!1,null,"4ab5b939",null);t["default"]=c.exports},3872:function(e,t,n){"use strict";n("e03a")},6761:function(e,t,n){var r=n("4632");r("Uint16",(function(e){return function(t,n,r){return e(this,t,n,r)}}))},e03a:function(e,t,n){}}]);
//# sourceMappingURL=chunk-4daf6697.57454ad0.js.map