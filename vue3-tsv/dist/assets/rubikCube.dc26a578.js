var de=Object.defineProperty;var me=(o,s,e)=>s in o?de(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e;var h=(o,s,e)=>(me(o,typeof s!="symbol"?s+"":s,e),e);import{P as pe,W as fe,S as ge,C as ae,a as be,A as we,V as u,E as Z,F as ve,Q as q,G as _e,b as oe,O as he,c as xe,d as S,e as m,n as D,M as ee,s as Ae,f as Se,g as Ee,h as ye,D as Me,i as te,R as Pe,r as se,j as Le,L as De}from"./rubikCube.948e717c.js";import{_ as qe}from"./about.120ede73.js";import{d as Oe,eP as Re,eQ as ze,g as ie,A as Ce,z as Ie,n as Fe,c as He,$ as ke,a as k,k as x,l as A,q as We,v as je,r as E,eR as Te,o as Ve,u as ne,m as O,t as Qe}from"./common.337cf465.js";const Be=()=>{const o=new pe(45,1,.1,100);return o.position.set(0,0,15),o},Ne=()=>new fe({antialias:!0}),Xe=o=>{const s=new ge;return s.background=new ae(o),s},Ye=()=>{let o=new be(16777215);o.position.set(400,200,300);let s=new we(8421504);return{pointLight:o,ambientLight:s}},Ue=(o,s)=>{const e=o.clone().dot(s);return Math.acos(e/(o.length()*s.length()))};function Ge(o){const s={[0]:new u(0,1,0),[1]:new u(0,-1,0),[2]:new u(-1,0,0),[3]:new u(1,0,0),[4]:new u(0,0,1),[5]:new u(0,0,-1)};if(s[o])return s[o];throw console.error(o),new Error("directionEnum2Vector3 error")}class $e{constructor(s=3,e=["#fb3636","#ff9351","#fade70","#9de16f","#51acfa","#da6dfa"]){h(this,"cubeOrder");h(this,"colors");h(this,"elements",[]);h(this,"_orderSnFaceMaps",{});this.cubeOrder=s,this.colors=e,this.initElements()}initElements(s=!0){s&&localStorage&&(this.elements=this.getLocalData()),this.elements.length!==this.cubeOrder**3-(this.cubeOrder-2)**3&&(this.initialFinishData(),this.saveDataToLocal())}getOrderSnFaceMaps(s){if(this._orderSnFaceMaps&&this._orderSnFaceMaps[s])return this._orderSnFaceMaps[s];let e=[];for(let i=0;i<s;i++)for(let t=0;t<s;t++)for(let n=0;n<s;){let r=[];n==0&&r.push(2),i==0&&r.push(5),t==0&&r.push(1),t==s-1&&r.push(0),n==s-1&&r.push(3),i==s-1&&r.push(4),e.push(r),t!==0&&t!==this.cubeOrder-1&&i!==0&&i!==this.cubeOrder-1&&n==0?n+=this.cubeOrder-1:n+=1}return this._orderSnFaceMaps[s]=e,e}getFaces(s,e,i){return this.getOrderSnFaceMaps(e)[s].map(n=>({dir:Ge(n),color:i[Number(n)]}))}initialFinishData(){this.elements=[];let s=[];if(this.cubeOrder%2){let e=this.cubeOrder-1,i=(this.cubeOrder-1)/2,t=(this.cubeOrder-1)/2;s.push([i,t,e].join(","))}else{let e=this.cubeOrder-1,i=this.cubeOrder/2,t=this.cubeOrder/2;s.push([i,t,e].join(",")),s.push([i-1,t,e].join(",")),s.push([i,t-1,e].join(",")),s.push([i-1,t-1,e].join(","))}for(let e=0;e<this.cubeOrder;e++)for(let i=0;i<this.cubeOrder;i++)for(let t=0;t<this.cubeOrder;){let n=this.elements.length,r=s.includes([t,i,e].join(","));this.elements.push({sn:n,origin:new u(t,i,e),position:new u(t,i,e),rotation:new Z(0,0,0),face:this.getFaces(n,this.cubeOrder,this.colors),withLogo:r}),i!==0&&i!==this.cubeOrder-1&&e!==0&&e!==this.cubeOrder-1&&t==0?t+=this.cubeOrder-1:t+=1}}saveDataToLocal(){const s=JSON.stringify(this.elements.map(e=>({sn:e.sn,origin:e.origin,position:e.position,rotation:e.rotation,withLogo:e.withLogo})));localStorage&&localStorage.setItem(`${this.cubeOrder}-xRubik`,s)}getLocalData(){try{if(localStorage){const s=localStorage.getItem(`${this.cubeOrder}-xRubik`);if(s)return JSON.parse(s).map(t=>({sn:t.sn,origin:new u(t.origin.x,t.origin.y,t.origin.z),position:new u(t.position.x,t.position.y,t.position.z),rotation:new Z(t.rotation._x,t.rotation._y,t.rotation._z),face:this.getFaces(t.sn,this.cubeOrder,this.colors),withLogo:t.withLogo}))}}catch(s){console.error(s)}return[]}}class Je{constructor(s){h(this,"_squares");h(this,"inRotation",!1);h(this,"rotateAnglePI",0);h(this,"activeSquares",[]);h(this,"controlSquare");h(this,"rotateDirection");h(this,"rotateAxisLocal");this._squares=s}setRotating(s,e,i,t){this.inRotation=!0,this.controlSquare=s,this.activeSquares=e,this.rotateDirection=i,this.rotateAxisLocal=t}resetState(){this.inRotation=!1,this.activeSquares=[],this.controlSquare=void 0,this.rotateDirection=void 0,this.rotateAxisLocal=void 0,this.rotateAnglePI=0}validateFinish(){let s=!0,e={};const i=this._squares.reduce((t,n)=>t.concat(n.children.filter(r=>r instanceof ve)),[]);return i.find(t=>{let n=t.face_,r=n.dir.toArray().join(",");if(!e[r]&&(e[r]={dir:n.dir,wdir:new u(0,0,1).applyQuaternion(t.getWorldQuaternion(new q).invert())},Object.keys(e).length>=6))return!0}),console.log("planeMap",e),s=i.every(t=>{let n=!0,a=t.face_.dir.toArray().join(",");return new u(0,0,1).applyQuaternion(t.getWorldQuaternion(new q).invert()).clone().sub(e[a].wdir).length()<.001?n=!0:n=!1,n}),s}}function Ke(o,{width:s=20,height:e=20,color:i="#fff",fontSize:t=18,align:n="center"}={}){let r=document.createElement("canvas");r.width=s,r.height=e;let a=r.getContext("2d");if(a){a.fillStyle=i,a.font=t+'px/1 " bold';let c=0;const l=a.measureText(o);let f=t*.8;switch(n){case"left":c=0;break;case"center":c=(s-l.width)/2;break;case"right":c=s-l.width;break}a.fillText(o,c,f)}return r}function H(o,{width:s=.2,height:e=.2,color:i="#fff",fontSize:t=18,align:n="center"}={}){const r={width:s<20?20:s,height:e<20?20:e,color:i,fontSize:t,align:n},a=new Se(r.width,r.height);let c=new Ee({map:new ye(Ke(o,r)),side:Me}),l=new te(a,c);return new te(a,c),(s<20||e<20)&&l.scale.set(s/r.width,e/r.height,1),new he().add(l)}class Ze extends _e{constructor(e=3,i={}){super();h(this,"data");h(this,"state");h(this,"events");h(this,"haxes");h(this,"_size",1);this.data=new $e(e),this.events=i,this.createChildrenByData(),this.rotateX(Math.PI*.25),this.rotateY(Math.PI*.25);const t=this.order*.8;let n=this.getLabAxes(t);n.rotateX(Math.PI*.25),n.rotateY(Math.PI*.25),this.haxes=n}get squaresBg(){return"#eeeeee"}get squares(){return this.children}get order(){return this.data.cubeOrder}get squareSize(){return this._size}get finish(){return this.state.validateFinish()}getLabAxes(e){let i=new oe(e),t=new he,n=H("x"),r=H("y"),a=H("z");return n.position.set(e,0,0),r.position.set(0,e,0),a.position.set(0,0,e),t.add(i),t.add(n),t.add(r),t.add(a),t}createChildrenByData(){this.remove(...this.children);for(let e=0;e<this.data.elements.length;e++){const i=xe(this.order,this.squareSize,this.data.elements[e],new ae(this.squaresBg));this.add(i)}this.state=new Je(this.squares)}rotateOnePlane(e,i,t,n,r){var W,j,T;if(i.distanceTo(e)<5||!this.squares.includes(t.square))return;const a=i.clone().sub(e);if(a.x===0&&a.y===0)return;if(!this.state.inRotation){let v=function(d){return d.applyQuaternion(ue.clone().invert())},le=function(d){return d.applyQuaternion(Q.clone().invert())},V=function(d){return d.applyQuaternion(Q)},Q=t.square.getWorldQuaternion(new q),ue=this.getWorldQuaternion(new q),w=t.point.clone().sub(t.square.getWorldPosition(new u));le(w);let z=0,B=0,N=0,X=[0,0,0];w.toArray().forEach((d,g)=>{Math.abs(d)>B&&(B=Math.abs(d),z=g,N=d)}),X[z]=N>0?1:-1,w=new u(...X),w=V(w).normalize();let _=[];(W=S)==null||W.lineRemove(),w.toArray().forEach((d,g)=>{var $,J;if(g!==z){let K=[0,0,0];K[g]=1;let L=V(new u(...K)).normalize(),b=this.getSquareScreenVector(t.point,L,n,r);_.push({dir3:L,dir2:new m(b.x,b.y).normalize()}),($=S)==null||$.webLineAdd(new m(0,0),new m(b.x,b.y)),b=this.getSquareScreenVector(t.point,L.clone().negate(),n,r),_.push({dir3:L.clone().negate(),dir2:new m(b.x,b.y).normalize()}),(J=S)==null||J.webLineAdd(new m(0,0),new m(b.x,b.y))}});let Y=t.point.clone();Y.project(n);let U=D(Y.project(n),r.w,r.h);(j=S)==null||j.afterDotDom(U.x+r.w/2,r.h/2-U.y);let G=Math.PI*2,C=_[0];for(let d=0;d<_.length;d++){const g=Math.abs(_[d].dir2.angle()-a.angle());G>g&&(G=g,C=_[d])}const I=w.clone().cross(C.dir3).normalize();(T=S)==null||T.drawArrows(t.point,I,"#ff0000");const F=[];F.push(t.square);for(let d=0;d<this.squares.length;d++)if(t.square!=this.squares[d]){let g=t.square.getWorldPosition(new u).sub(this.squares[d].getWorldPosition(new u));Math.abs(g.dot(I))<.01*this.squareSize&&F.push(this.squares[d])}this.state.setRotating(t.square,F,C,v(I))}const c=this.state.activeSquares,l=this.state.rotateAxisLocal,f=Ue(this.state.rotateDirection.dir2,a),p=Math.cos(f)*a.length(),y=this.getCoarseCubeSize(n,r),M=p/y*Math.PI*.5,R=M-this.state.rotateAnglePI;this.state.rotateAnglePI=M;const P=new ee;P.makeRotationAxis(l,R);for(let v=0;v<c.length;v++)c[v].applyMatrix4(P),c[v].updateMatrix()}getAfterRotateAnimation(){const e=this.getNeededRotateAngle(),i=Math.PI*.5/500;let t=0,n;return a=>{n||(n=a);const c=a-n;if(n=a,t<Math.abs(e)){let l=c*i;t+l>Math.abs(e)&&(l=Math.abs(e)-t),t+=l,l=e>0?l:-l;const f=new ee;f.makeRotationAxis(this.state.rotateAxisLocal,l);for(let p=0;p<this.state.activeSquares.length;p++)this.state.activeSquares[p].applyMatrix4(f),this.state.activeSquares[p].updateMatrix();return!0}else return this.updateStateAfterRotate(),this.data.saveDataToLocal(),this.events.rotateDone&&this.events.rotateDone({type:"rotateDone",finish:this.finish}),!1}}updateStateAfterRotate(){const e=this.getNeededRotateAngle();this.state.rotateAnglePI+=e;const i=this.state.rotateAnglePI%(Math.PI*2);Math.abs(i)>.1&&this.state.activeSquares.forEach(t=>{let n=Ae(this.order,this.squareSize,t.position.clone());t.element.position=n,t.element.rotation=t.rotation}),this.state.resetState()}getNeededRotateAngle(){const e=Math.PI*.5,i=Math.abs(this.state.rotateAnglePI)%e;let t=i>e*.2?e-i:-i;return t=this.state.rotateAnglePI>0?t:-t,t}getCoarseCubeSize(e,i){const t=this.order*this.squareSize,n=new u(-t/2,0,0),r=new u(t/2,0,0);n.project(e),r.project(e);const{w:a,h:c}=i,l=D(n,a,c),f=D(r,a,c);return Math.abs(f.x-l.x)}getSquareScreenPos(e,i,t){if(!this.squares.includes(e))return null;const n=e.getWorldPosition(new u);n.project(i);const{w:r,h:a}=t;return D(n,r,a)}getSquareScreenVector(e,i,t,n){const r=e.clone().project(t),a=i.clone().add(e).project(t),{w:c,h:l}=n;return a.sub(r),new m(a.x*c/2,-a.y*l/2)}restore(){this.data.initialFinishData(),this.data.saveDataToLocal(),this.createChildrenByData(),this.rotation.setFromVector3(new u(0,0,0)),this.rotateX(Math.PI*.25),this.rotateY(Math.PI*.25)}}class ce{constructor(s,e,i,t){h(this,"renderer");h(this,"scene");h(this,"cube");h(this,"camera");h(this,"_squareInfo",null);h(this,"start",!1);h(this,"lastOperateUnfinish",!1);h(this,"startPos",new m);h(this,"raycaster",new Pe);this.cube=t,this.renderer=i,this.scene=e,this.camera=s}get domElement(){return this.renderer.domElement}getIntersects(s,e){const i=s/this.domElement.clientWidth*2-1,t=-(e/this.domElement.clientHeight)*2+1;this.raycaster.setFromCamera({x:i,y:t},this.camera);let n=[];for(let r=0;r<this.cube.squares.length;r++){const a=this.raycaster.intersectObjects([this.cube.squares[r]]);a.length>0&&n.push({distance:a[0].distance,square:this.cube.squares[r],point:a[0].point})}return n.sort((r,a)=>r.distance-a.distance),n.length>0?n[0]:null}operateStart(s,e){if(this.start)return;this.start=!0,this.startPos=new m;const i=this.getIntersects(s,e);this._squareInfo=null,i&&(this._squareInfo=i,this.startPos=new m(s,e))}operateDrag(s,e,i,t){if(this.start&&this.lastOperateUnfinish===!1){if(this._squareInfo){const n=new m(s,e);this.cube.rotateOnePlane(this.startPos,n,this._squareInfo,this.camera,{w:this.domElement.clientWidth,h:this.domElement.clientHeight})}else{const n=i,r=-t,a=Math.sqrt(n*n+r*r),c=this.cube.getCoarseCubeSize(this.camera,{w:this.domElement.clientWidth,h:this.domElement.clientHeight}),l=Math.PI*a/c,p=new m(n,r).rotateAround(new m(0,0),Math.PI*.5);se(this.cube,new u(p.x,p.y,0),l),se(this.cube.haxes,new u(p.x,p.y,0),l)}this.renderer.render(this.scene,this.camera)}}operateEnd(){if(this.lastOperateUnfinish===!1){if(this._squareInfo){const s=this.cube.getAfterRotateAnimation();this.lastOperateUnfinish=!0;const e=i=>{const t=s(i);this.renderer.render(this.scene,this.camera),t?requestAnimationFrame(e):this.lastOperateUnfinish=!1};requestAnimationFrame(e)}this.start=!1,this._squareInfo=null}}}class et extends ce{constructor(s,e,i,t){super(s,e,i,t),this.mousedownHandle=this.mousedownHandle.bind(this),this.mouseupHandle=this.mouseupHandle.bind(this),this.mousemoveHandle=this.mousemoveHandle.bind(this),this.mouseoutHandle=this.mouseoutHandle.bind(this),this.init()}mousedownHandle(s){s.preventDefault(),this.operateStart(s.offsetX,s.offsetY)}mouseupHandle(s){s.preventDefault(),console.log("mouseup"),this.operateEnd()}mouseoutHandle(s){s.preventDefault(),this.operateEnd()}mousemoveHandle(s){s.preventDefault(),this.operateDrag(s.offsetX,s.offsetY,s.movementX,s.movementY)}init(){this.domElement.addEventListener("mousedown",this.mousedownHandle),this.domElement.addEventListener("mouseup",this.mouseupHandle),this.domElement.addEventListener("mousemove",this.mousemoveHandle),this.domElement.addEventListener("mouseout",this.mouseoutHandle)}dispose(){this.domElement.removeEventListener("mousedown",this.mousedownHandle),this.domElement.removeEventListener("mouseup",this.mouseupHandle),this.domElement.removeEventListener("mousemove",this.mousemoveHandle),this.domElement.removeEventListener("mouseout",this.mouseoutHandle)}}class tt extends ce{constructor(e,i,t,n){super(e,i,t,n);h(this,"lastPos");this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchEnd=this.touchEnd.bind(this),this.init()}touchStart(e){e.preventDefault();const i=e.touches;if(i.length===1){const t=i[0];this.lastPos=new m(t.pageX,t.pageY),this.operateStart(t.pageX,t.pageY)}}touchMove(e){e.preventDefault();const i=e.touches;if(i.length===1&&this.lastPos){const t=i[0];this.operateDrag(t.pageX,t.pageY,t.pageX-this.lastPos.x,t.pageY-this.lastPos.y),this.lastPos=new m(t.pageX,t.pageY)}}touchEnd(e){e.preventDefault(),this.lastPos=void 0,this.operateEnd()}init(){this.domElement.addEventListener("touchstart",this.touchStart),this.domElement.addEventListener("touchmove",this.touchMove),this.domElement.addEventListener("touchend",this.touchEnd)}dispose(){this.domElement.removeEventListener("touchstart",this.touchStart),this.domElement.removeEventListener("touchmove",this.touchMove),this.domElement.removeEventListener("touchend",this.touchEnd)}}const re=(o,s,e)=>{s.aspect=o.clientWidth/o.clientHeight,s.updateProjectionMatrix(),e.setSize(o.clientWidth,o.clientHeight),e.setPixelRatio(window.devicePixelRatio)};class st{constructor(s,e={}){h(this,"container");h(this,"camera");h(this,"scene");h(this,"cube");h(this,"renderer");h(this,"pointLight");h(this,"ambientLight");h(this,"_controls",[]);this.container=s,this.camera=Be(),this.scene=Xe("#ccddcc"),this.renderer=Ne(),Le(this.renderer,this.scene,this.camera);let{pointLight:i,ambientLight:t}=Ye();this.pointLight=i,this.ambientLight=t,s.appendChild(this.renderer.domElement),re(this.container,this.camera,this.renderer),this.setOrder(3,e),this.startAnimation()}addWorldAxes(){let s=new oe(3),e=new De({vertexColors:!0,toneMapped:!1,color:16776960,linewidth:.6,dashSize:.05,gapSize:.05});s.material=e,s.computeLineDistances(),this.scene.add(s)}setOrder(s,e){this.scene.remove(...this.scene.children),this.scene.add(this.pointLight),this.scene.add(this.ambientLight),this._controls.length>0&&this._controls.forEach(c=>c.dispose()),this.addWorldAxes();const i=new Ze(s,e);this.scene.add(i),this.cube=i,this.render();const t=this.renderer.domElement.clientWidth,n=this.renderer.domElement.clientHeight,r=i.getCoarseCubeSize(this.camera,{w:t,h:n}),a=Math.max(2.2/(t/r),2.2/(n/r));this.camera.position.z*=a,this._controls.push(new et(this.camera,this.scene,this.renderer,i),new tt(this.camera,this.scene,this.renderer,i)),this.render()}restore(){this.cube?(this.cube.restore(),this.render()):console.error("RESTORE_ERROR: this.cube is undefined.")}render(){this.renderer.render(this.scene,this.camera)}resize(){re(this.container,this.camera,this.renderer),this.render()}startAnimation(){const s=e=>{if(e/=1e3,this.cube){e<2?this.cube.position.z=0:this.cube.position.z=0;const i=e;this.cube.position.y=Math.sin(i)*.1}this.render(),requestAnimationFrame(s)};requestAnimationFrame(s)}}const it=o=>(We("data-v-70a5f62c"),o=o(),je(),o),nt={class:"component-rubik-cube flex-layout frow"},rt=it(()=>k("div",{id:"point"},null,-1)),at={class:"right flex-0"},ot=O(" \u63A7\u5236\u53F0 "),ht=O(" \u72B6\u6001\uFF1A "),ct=O("\u8FD8\u539F"),lt=Oe({__name:"rubikCube",props:{},emits:[],setup(o,{emit:s}){Re(),ze();const e=ie(null);Ce(()=>{});let i=null,t=ie({finish:!1});Ie(async()=>{await Fe(),e.value&&(i=new st(e.value,{rotateDone:n}))});function n(c){console.log("e",c),t.value.finish=c.finish}function r(){i&&i.resize()}function a(){i==null||i.restore()}return(c,l)=>{const f=E("a-typography-title"),p=E("a-tag"),y=E("a-form-item"),M=E("a-button"),R=E("a-form"),P=Te("resize");return Ve(),He("div",nt,[ke(k("div",{class:"three flex-auto",ref_key:"threeRef",ref:e},null,512),[[P,r,"throttle"]]),rt,k("div",at,[x(f,{level:3,class:"title"},{default:A(()=>[ot]),_:1}),x(R,null,{default:A(()=>[x(y,{class:"state"},{default:A(()=>[ht,x(p,{color:ne(t).finish?"success":"default"},{default:A(()=>[O(Qe(ne(t).finish?"\u8FD8\u539F":"\u6253\u4E71"),1)]),_:1},8,["color"])]),_:1}),x(y,null,{default:A(()=>[x(M,{type:"primary",onClick:a,size:"mini"},{default:A(()=>[ct]),_:1})]),_:1})]),_:1})])])}}});var ft=qe(lt,[["__scopeId","data-v-70a5f62c"]]);export{ft as default};
