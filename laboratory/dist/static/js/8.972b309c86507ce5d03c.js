webpackJsonp([8],{"1Flu":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("QTrw"),r={name:"scene",data:function(){return{}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){var e=new i.Scene,t=new i.BoxGeometry(100,100,100),n=new i.MeshLambertMaterial({color:255}),r=new i.Mesh(t,n);e.add(r);var s=new i.PointLight(16777215);s.position.set(400,200,300),e.add(s);var a=new i.AmbientLight(4473924);e.add(a);var o=this.$refs.three.clientWidth,c=this.$refs.three.clientHeight,d=o/c,h=200,l=new i.OrthographicCamera(-h*d,h*d,h,-h,1,1e3);l.position.set(200,300,200),l.lookAt(e.position);var f=new i.WebGLRenderer;f.setSize(o,c),f.setClearColor(12178431,1),this.$refs.three.appendChild(f.domElement),f.render(e,l)}}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"component-scene"},[t("div",{ref:"three",staticClass:"three full-block"})])},staticRenderFns:[]};var a=n("VU/8")(r,s,!1,function(e){n("Xfnk")},"data-v-92972a52",null);t.default=a.exports},Xfnk:function(e,t){}});
//# sourceMappingURL=8.972b309c86507ce5d03c.js.map