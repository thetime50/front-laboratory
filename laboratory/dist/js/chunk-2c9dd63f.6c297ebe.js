(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c9dd63f"],{"0b84":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component-scene"},[n("div",{ref:"three",staticClass:"three full-block"})])},a=[],r=n("4a44"),s={name:"scene",data:function(){return{}},mounted:function(){var e=this;this.$nextTick((function(){e.init()}))},methods:{init:function(){var e=new r["Scene"],t=new r["BoxGeometry"](100,100,100),n=new r["MeshLambertMaterial"]({color:255}),i=new r["Mesh"](t,n);e.add(i);var a=new r["PointLight"](16777215);a.position.set(400,200,300),e.add(a);var s=new r["AmbientLight"](4473924);e.add(s);var o=this.$refs.three.clientWidth,c=this.$refs.three.clientHeight,h=o/c,d=200,l=new r["OrthographicCamera"](-d*h,d*h,d,-d,1,1e3);l.position.set(200,300,200),l.lookAt(e.position);var u=new r["WebGLRenderer"];u.setSize(o,c),u.setClearColor(12178431,1),this.$refs.three.appendChild(u.domElement),u.render(e,l)}}},o=s,c=(n("8aba"),n("cba8")),h=Object(c["a"])(o,i,a,!1,null,"3553e394",null);t["default"]=h.exports},"4a98":function(e,t,n){},"8aba":function(e,t,n){"use strict";n("4a98")}}]);
//# sourceMappingURL=chunk-2c9dd63f.6c297ebe.js.map