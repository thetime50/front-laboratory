(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff92cc76"],{"51bd":function(e,t,i){},b882:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"component-cuble flex-layout"},[i("div",{staticClass:"option flex-none"},[i("el-form",{attrs:{"label-width":"8rem"}},[i("el-form-item",{attrs:{label:"create at"}},[e._v(" "+e._s((new Date).toLocaleTimeString())+" ")]),i("el-form-item",{attrs:{label:"Speed:"+e.speed}},[i("el-slider",{attrs:{min:0,max:.1,step:.001},model:{value:e.speed,callback:function(t){e.speed=t},expression:"speed"}})],1)],1)],1),i("div",{ref:"three",staticClass:"three flex-auto"})])},r=[],s=i("4a44"),a={name:"cuble",data:function(){return{speed:.05}},created:function(){},mounted:function(){var e=this;this.$nextTick((function(){e.init()}))},methods:{init:function(){var e=this.$refs.three;if(e){var t=new s["Scene"],i=new s["PerspectiveCamera"](75,e.clientWidth/e.clientHeight,.1,1e3),n=new s["WebGLRenderer"];n.setSize(e.clientWidth,e.clientHeight),e.appendChild(n.domElement);var r=new s["CubeGeometry"](1,1,1),a=new s["MeshLambertMaterial"]({color:53248}),o=new s["Mesh"](r,a);t.add(o),i.position.z=5;var c=new s["PointLight"](16777215);c.position.set(400,200,300),t.add(c);var d=new s["AmbientLight"](8947848);t.add(d),n.setClearColor(12178431,1),this.scene=t,this.camera=i,this.renderer=n,this.geometry=r,this.material=a,this.cube=o,this.render()}},render:function(){requestAnimationFrame(this.render),this.cube.rotation.x+=this.speed,this.cube.rotation.y+=this.speed,this.renderer.render(this.scene,this.camera)}}},o=a,c=(i("ddb4"),i("2877")),d=Object(c["a"])(o,n,r,!1,null,"142df825",null);t["default"]=d.exports},ddb4:function(e,t,i){"use strict";i("51bd")}}]);
//# sourceMappingURL=chunk-ff92cc76.f3786086.js.map