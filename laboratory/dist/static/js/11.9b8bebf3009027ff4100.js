webpackJsonp([11],{JwFo:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("QTrw"),i=(n("+3Av"),{name:"control",data:function(){return{}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){var e=new r.Scene,t=new r.BoxGeometry(100,100,100),n=new r.MeshLambertMaterial({color:16752800}),i=new r.Mesh(t,n);e.add(i);var o=new r.PointLight(16777215);o.position.set(400,200,300),e.add(o);var a=new r.AmbientLight(4473924);e.add(a);var s=this.$refs.three.clientWidth,c=this.$refs.three.clientHeight,d=s/c,l=200,h=new r.OrthographicCamera(-l*d,l*d,l,-l,1,1e3);h.position.set(200,300,200),h.lookAt(e.position);var u=new r.WebGLRenderer;function f(){u.render(e,h)}u.setSize(s,c),u.setClearColor(12178431,1),this.$refs.three.appendChild(u.domElement),u.render(e,h),f(),new r.OrbitControls(h,u.domElement).addEventListener("change",f)}}}),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"component-control"},[t("div",{ref:"three",staticClass:"three full-block"})])},staticRenderFns:[]};var a=n("VU/8")(i,o,!1,function(e){n("g36i")},"data-v-7816b229",null);t.default=a.exports},g36i:function(e,t){}});
//# sourceMappingURL=11.9b8bebf3009027ff4100.js.map