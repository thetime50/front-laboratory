webpackJsonp([14],{"/plN":function(e,t){},zNp3:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("QTrw"),n=(r("+3Av"),{name:"geometry",data:function(){return{}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){var e=new o.Scene,t=[];t.push({geometry:new o.BoxGeometry(100,100,100),color:8421631}),t.push({geometry:new o.SphereGeometry(60,40,40),color:8454143}),t.push({geometry:new o.CylinderGeometry(50,50,100,25),color:8454016}),t.push({geometry:new o.OctahedronGeometry(50),color:16777088}),t.push({geometry:new o.DodecahedronGeometry(50),color:16744576}),t.push({geometry:new o.IcosahedronGeometry(50),color:16744703}),t.forEach(function(t,r,n){var i=new o.MeshLambertMaterial({color:t.color}),s=new o.Mesh(t.geometry,i);s.position.set(r%3*130-130,0,130*Math.floor(r/3)-65),e.add(s)});var r=new o.AxisHelper(250);e.add(r);var n=new o.PointLight(16777215);n.position.set(400,200,300),e.add(n);var i=new o.AmbientLight(8421504);e.add(i);var s=this.$refs.three.clientWidth,a=this.$refs.three.clientHeight,c=s/a,h=200,l=new o.OrthographicCamera(-h*c,h*c,h,-h,1,1e3);l.position.set(200,300,200),l.lookAt(e.position);var d=new o.WebGLRenderer;function m(){d.render(e,l)}d.setSize(s,a),d.setClearColor(12178431,1),this.$refs.three.appendChild(d.domElement),d.render(e,l),m(),new o.OrbitControls(l,d.domElement).addEventListener("change",m)}}}),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"component-geometry"},[t("div",{ref:"three",staticClass:"three full-block"})])},staticRenderFns:[]};var s=r("VU/8")(n,i,!1,function(e){r("/plN")},"data-v-3e0046be",null);t.default=s.exports}});
//# sourceMappingURL=14.8d93d6455dce8f5a2990.js.map