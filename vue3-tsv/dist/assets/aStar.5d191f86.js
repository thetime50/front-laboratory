var Z=Object.defineProperty;var T=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var A=(l,t,e)=>t in l?Z(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e,w=(l,t)=>{for(var e in t||(t={}))H.call(t,e)&&A(l,e,t[e]);if(T)for(var e of T(t))F.call(t,e)&&A(l,e,t[e]);return l};var o=(l,t,e)=>(A(l,typeof t!="symbol"?t+"":t,e),e);import{G as q,K as U,U as V,Q as b,ah as $,M as K}from"./shared/aStar/chartGraph.9f1ddb05.js";import{_ as Q}from"./about.15042085.js";import{g as X,eR as J,eS as Y,q as R,w as k,aj as tt,c as P,a as I,F as et,eW as st,x as rt,z as it,r as ot,o as L,eX as at,v as nt}from"./common.841047e3.js";import"./chartGraph.19ccca55.js";var ht=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,S=(l,t,e,s)=>{for(var r=s>1?void 0:s?lt(t,e):t,i=l.length-1,a;i>=0;i--)(a=l[i])&&(r=(s?a(t,e,r):a(r))||r);return s&&r&&ht(t,e,r),r};function z(l){return(t,e)=>{t[e]=l}}class x{constructor(t,e){o(this,"zshape");o(this,"tshape");o(this,"rate",0);o(this,"value");o(this,"empty",!0);o(this,"itemColor");o(this,"type");o(this,"emptyColor","");o(this,"groundColor","");o(this,"sourceColor","");o(this,"targetColor","");this.coord=t;const s=this;Object.prototype.hasOwnProperty.call(this,"emptyColor")&&delete s.emptyColor,Object.prototype.hasOwnProperty.call(this,"groundColor")&&delete s.groundColor,Object.prototype.hasOwnProperty.call(this,"sourceColor")&&delete s.sourceColor,Object.prototype.hasOwnProperty.call(this,"targetColor")&&delete s.targetColor,this.rate=0,this.value=0,this.empty=!0,this.itemColor=this.getItemColor(),this.type="Ground";const r={fill:this.itemColor,stroke:"none"},i=(e.gep+e.size)*t.x+e.gep,a=(e.gep+e.size)*t.y+e.gep;let c;switch(e.shape){case"Rect":{const p={x:i,y:a,r:e.size*.2,width:e.size,height:e.size};c=new U({shape:p,style:r})}break;case"Circle":default:{const p={cx:i+e.size/2,cy:a+e.size/2,r:e.size/2};c=new q({shape:p,style:r})}break}this.zshape=c,this.tshape=new V({x:i,y:a,style:{text:"",fontSize:12,opacity:.4}})}rangeTrans(t,e,s,r,i){const a=(i-r)/(s-e),c=r-a*e;return a*t+c}rate2color(t){const e=this.rangeTrans(this.rate,0,1,240,0),s=this.rangeTrans(this.rate,0,1,95,70);return`hsl(${e},100%,${s}%)`}getItemColor(){return this.type==="Wall"?this.groundColor:this.type==="Source"?this.sourceColor:this.type==="Target"?this.targetColor:this.empty?this.emptyColor:this.rate2color(this.rate)}itemRefresh(){this.itemColor=this.getItemColor(),this.zshape.attr("style",{fill:this.itemColor}),this.type==="Ground"&&!this.empty&&this.value!==void 0?this.tshape.attr("style",{text:this.value.toFixed(0)}):this.tshape.attr("style",{text:""})}setRate(t,e){if(this.type!=="Ground")throw new Error("item is not ground");this.rate=t,this.value=e,this.empty=!1,this.itemRefresh()}setEmpty(t){this.empty=t,t?this.type="Ground":this.rate=0,this.itemRefresh()}setType(t){this.type=t,this.itemRefresh()}}S([z("#eee")],x.prototype,"emptyColor",2);S([z("#333")],x.prototype,"groundColor",2);S([z("hsl(240,100%,55%)")],x.prototype,"sourceColor",2);S([z("hsl(0,100%,55%)")],x.prototype,"targetColor",2);class ct{constructor(t,e={gep:3,size:15,shape:"Circle"}){o(this,"cfg");o(this,"zr");o(this,"shapes",[]);o(this,"shapesCoord",[]);o(this,"controllerSet",new Set);o(this,"mousedown",!1);o(this,"sourceInfo");o(this,"targetInfo");o(this,"priorityGroup",new b({silent:!0}));o(this,"path",[]);o(this,"pathShape");const s=t.clientWidth,r=t.clientHeight;this.cfg={gep:e.gep,size:e.size,shape:e.shape,width:s,height:r,widthCnt:Math.floor(s/(e.gep+e.size)),heightCnt:Math.floor(r/(e.gep+e.size))},this.zr=$(t);for(let i=0;i<this.cfg.heightCnt;i++){const a=[];this.shapesCoord.push(a);for(let c=0;c<this.cfg.widthCnt;c++){const p=new x({x:c,y:i},this.cfg);this.shapes.push(p),a.push(p),this.zr.add(p.zshape),this.priorityGroup.add(p.tshape)}}this.zr.add(this.priorityGroup),this.registerControllerEvent("click"),this.zr.on("mousedown",()=>{this.mousedown=!0}),this.zr.on("mousemove",i=>{this.mousedown&&this.controllerSet.forEach(a=>{const c=a.mousedrag;c&&c(i)})}),this.zr.on("mouseup",()=>{this.mousedown=!1})}registerControllerEvent(t){const e=this;this.zr.on(t,s=>{e.controllerSet.forEach(r=>{const i=r[t];i&&i(s)})})}addController(t){this.controllerSet.add(t)}removeController(t){this.controllerSet.delete(t)}setWall(t){var e,s;((e=this.sourceInfo)==null?void 0:e.index)!==t&&((s=this.targetInfo)==null?void 0:s.index)!==t&&this.shapes[t].setType("Wall")}setGround(t){var e,s;((e=this.sourceInfo)==null?void 0:e.index)!==t&&((s=this.targetInfo)==null?void 0:s.index)!==t&&this.shapes[t].setType("Ground")}setSource(t){this.sourceInfo&&this.sourceInfo.item.setEmpty(!0),this.shapes[t].setType("Source"),this.sourceInfo={item:this.shapes[t],index:t}}setTarget(t){this.targetInfo&&this.targetInfo.item.setEmpty(!0),this.shapes[t].setType("Target"),this.targetInfo={item:this.shapes[t],index:t}}setRate(t,e,s){this.shapes[t].setRate(e,s)}destroy(){this.zr.dispose()}coord2point(t){const e=this.cfg,s=(e.gep+e.size)*t.x+e.gep+e.size/2,r=(e.gep+e.size)*t.y+e.gep+e.size/2;return{x:s,y:r}}showPriority(t){t?this.priorityGroup.show():this.priorityGroup.hide()}drawPath(t){const e={stroke:"#1b2",lineWidth:2};if(t.length<2)throw new Error("path is too short");this.pathShape&&(this.zr.remove(this.pathShape),this.pathShape=void 0,this.path=[]);let s=this.coord2point(t[0]);this.path=t,this.pathShape=new b({silent:!0});for(let r=1;r<t.length;r++){const i=this.coord2point(t[r]),a={shape:{x1:s.x,y1:s.y,x2:i.x,y2:i.y},style:e,silent:!0};this.pathShape.add(new K(a)),s=i}this.zr.add(this.pathShape)}clearRes(){this.shapes.forEach(t=>{t.type==="Ground"&&t.setEmpty(!0)}),this.pathShape&&(this.zr.remove(this.pathShape),this.pathShape=void 0,this.path=[])}clearAll(){this.shapes.forEach(t=>{t.type="Ground",t.setEmpty(!0)}),this.pathShape&&(this.zr.remove(this.pathShape),this.pathShape=void 0,this.path=[]),this.sourceInfo=void 0,this.targetInfo=void 0}}class pt{constructor(t="Ground"){o(this,"gpriority");o(this,"hpriority");o(this,"parent");this.type=t}get fpriority(){if(!(this.gpriority===void 0||this.hpriority===void 0))return this.gpriority+this.hpriority}}class ut{constructor(t,e){o(this,"width");o(this,"height");o(this,"mapArr",[]);o(this,"openSet",{});o(this,"closeSet",{});o(this,"openIndexList",[]);o(this,"sourceInfo");o(this,"targetInfo");o(this,"state","Editing");this.width=t,this.height=e;for(let s=0;s<this.height;s++){const r=[];this.mapArr.push(r);for(let i=0;i<this.width;i++){const a=new pt;r.push(a)}}this.state="Editing"}index2xy(t){const e=t%this.width,s=Math.floor(t/this.width);return{x:e,y:s}}setWall(t){const{x:e,y:s}=this.index2xy(t),r=this.mapArr[s][e];r.type="Wall"}setGround(t){const{x:e,y:s}=this.index2xy(t),r=this.mapArr[s][e];r.type="Ground"}setSource(t){const{x:e,y:s}=this.index2xy(t),r=this.mapArr[s][e];r.type="Source",this.sourceInfo={item:r,x:e,y:s,index:t}}setTarget(t){const{x:e,y:s}=this.index2xy(t),r=this.mapArr[s][e];r.type="Target",this.targetInfo={item:r,x:e,y:s,index:t}}getItem(t){const{x:e,y:s}=this.index2xy(t);try{return{x:e,y:s,item:this.mapArr[s][e]}}catch{return}}getItemCoord(t){if(!(t.x>=this.width||t.x<0||t.y>=this.height||t.y<0))return this.mapArr[t.y][t.x]}openListGet(t){const e=this.openIndexList[t];if(e===void 0)return;const[s,r]=e.split("-").map(i=>Number(i));if(!(s===void 0||r===void 0))return{key:e,x:s,y:r,item:this.mapArr[r][s]}}coordTest(t){return t.x>=0&&t.x<this.width&&t.y>=0&&t.y<this.height}clearRes(){this.mapArr.forEach(t=>{t.forEach(e=>{e.gpriority=void 0,e.hpriority=void 0})}),this.openSet={},this.openIndexList=[],this.closeSet={},this.state="Editing"}clearAll(){this.mapArr.forEach(t=>{t.forEach(e=>{e.type="Ground",e.gpriority=void 0,e.hpriority=void 0,e.parent=void 0})}),this.openSet={},this.openIndexList=[],this.closeSet={},this.state="Editing",this.sourceInfo=void 0,this.targetInfo=void 0}setItemPriority(t,e){if(!this.targetInfo)throw new Error("targetInfo is undefined");if(e.item.gpriority===void 0)throw new Error("parentInfo.item.gpriority is undefined");if(!this.coordTest(t))return{state:"over"};const s=this.mapArr[t.y][t.x];if(s.type==="Wall")return{state:"wall",item:s};if(s.gpriority!==void 0)return{state:"have",item:s};const r=w({item:s},t);if(this.stepTest){const i=this.stepTest(r,e);if(i)return i}return s.gpriority=this.gpMath(r,e),s.hpriority=this.hpMath(r),s.parent={x:e.x,y:e.y},{state:"update",item:s}}runInit(){if(!this.sourceInfo)throw new Error("sourceInfo is undefined");if(!this.targetInfo)throw new Error("targetInfo is undefined");const t=this.sourceInfo.x+"-"+this.sourceInfo.y;this.openSet={[t]:this.sourceInfo.item},this.openIndexList=[t],this.closeSet={},this.sourceInfo.item.hpriority=this.getDistance(this.sourceInfo,this.targetInfo),this.sourceInfo.item.gpriority=0,this.state="Running"}runStep(){this.state==="Editing"&&this.runInit();const t=this.openListGet(0);if(!t)return this.state="Never",{state:"Never"};if(!this.targetInfo)throw new Error("targetInfo is undefined");const{item:e,x:s,y:r}=t,i=this.getChilds(s,r);let a=!1;const c=[];i.forEach(u=>{const d=this.setItemPriority(u,{x:s,y:r,item:e}),y=u.x+"-"+u.y;if(d.state==="update"&&!this.openSet[y]){let C;this.openSet[y]=d.item;for(let f=0;f<this.openIndexList.length;f++){const g=this.openListGet(f);if(!!g&&(g.item.fpriority>d.item.fpriority||Math.abs(g.item.fpriority-d.item.fpriority)<.001&&g.item.gpriority<d.item.gpriority)){this.openIndexList.splice(f,0,y),C=f;break}}C===void 0&&this.openIndexList.push(y),c.push({x:u.x,y:u.y})}u.x===this.targetInfo.x&&u.y===this.targetInfo.y&&(a=!0)});const p=s+"-"+r;for(let u=0;u<this.openIndexList.length;u++)if(this.openIndexList[u]===p){this.openIndexList.splice(u,1);break}return delete this.openSet[p],this.closeSet[p]=e,this.state=a?"Done":"Running",{stae:this.state,update:c,gpriority:e.gpriority+1}}getPath(){if(!this.targetInfo)throw new Error("targetInfo is undefined");if(this.state!=="Done")throw new Error("state is not Done");const t=[];let e=this.targetInfo.item;for(t.push({x:this.targetInfo.x,y:this.targetInfo.y});e.parent;)t.push({x:e.parent.x,y:e.parent.y}),e=this.mapArr[e.parent.y][e.parent.x];return t.reverse(),t}}class dt extends ut{getDistance(t,e){const s=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y),i=Math.min(s,r);return s+r+(Math.sqrt(2)-2)*i}gpMath(t,e){return t.x===e.x||t.y===e.y?1+e.item.gpriority:Math.sqrt(2)+e.item.gpriority}hpMath(t){return this.getDistance(t,this.targetInfo)}getChilds(t,e){return[{x:t-1,y:e},{x:t+1,y:e},{x:t,y:e-1},{x:t,y:e+1},{x:t-1,y:e-1},{x:t+1,y:e+1},{x:t+1,y:e-1},{x:t-1,y:e+1}]}stepTest(t,e){if(!(t.x===e.x||t.y===e.y)){const s=this.getItemCoord({x:t.x,y:e.y}),r=this.getItemCoord({x:e.x,y:t.y});if(!s||!r||s.type==="Wall"&&r.type==="Wall")return{state:"wall",item:t.item}}}}class ft extends dt{setItemPriority(t,e){if(!this.targetInfo)throw new Error("targetInfo is undefined");if(!this.coordTest(t))return{state:"over"};const s=this.mapArr[t.y][t.x];if(s.type==="Wall")return{state:"wall",item:s};if(s.gpriority!==void 0)return{state:"have",item:s};const r=w({item:s},t);if(this.stepTest){const i=this.stepTest(r,e);if(i)return i}return this.getChilds(t.x,t.y).forEach(i=>{const a=this.getItemCoord(i);if(!(!a||a===e.item)){if(this.stepTest){const c=this.stepTest(r,w({item:a},i));if(c)return c}a.type==="Ground"&&a.gpriority<e.item.gpriority&&(e=w({item:a},i))}}),s.gpriority=this.gpMath(r,e),s.hpriority=this.hpMath(r),s.parent={x:e.x,y:e.y},{state:"update",item:s}}}class yt{constructor(t,e={gep:3,size:15,shape:"Circle",astar:ft}){o(this,"astar");o(this,"canvas");o(this,"gradientRow",[]);o(this,"maxGpriority",0);this.canvas=new ct(t,e);const s=this.canvas.cfg.widthCnt,r=this.canvas.cfg.heightCnt;this.astar=new e.astar(s,r)}get widthCnt(){return this.canvas.cfg.widthCnt}get heightCnt(){return this.canvas.cfg.heightCnt}addController(t){this.canvas.addController(t)}removeController(t){this.canvas.removeController(t)}getZshapeInfo(t){const e=this.canvas.shapes.findIndex(i=>i.zshape.id===t.id);if(e<1)return null;const s=e%this.widthCnt,r=Math.floor(e/this.widthCnt);return{index:e,x:s,y:r,astarItem:this.astar.mapArr[r][s],canvasItem:this.canvas.shapes[e]}}setWall(t){this.astar.setWall(t),this.canvas.setWall(t)}setGround(t){this.astar.setGround(t),this.canvas.setGround(t)}setSource(t){this.astar.setSource(t),this.canvas.setSource(t)}setTarget(t){this.astar.setTarget(t),this.canvas.setTarget(t)}run(){const t=[];let e=[],s=0;for(;this.astar.state!=="Done"&&this.astar.state!=="Never";){const r=this.astar.runStep();r.update&&(r.gpriority!==s?(e.length&&t.push(e),e=r.update.concat(),s=r.gpriority):e=e.concat(r.update))}this.gradientRow=t,this.maxGpriority=s}*drawGradientRow(){for(let t=0;t<this.gradientRow.length;t++)this.gradientRow[t].forEach(e=>{const{x:s,y:r}=e,i=this.astar.mapArr[r][s];if(i.gpriority===void 0)throw new Error("item.gpriority is undefined");i.type==="Ground"&&this.canvas.setRate(s+r*this.widthCnt,i.gpriority/this.maxGpriority,i.gpriority)}),yield this.gradientRow[t]}drawPath(){if(this.astar.state==="Done"){const t=this.astar.getPath();this.canvas.drawPath(t)}}clearRes(){this.canvas.clearRes(),this.astar.clearRes()}clearAll(){this.canvas.clearAll(),this.astar.clearAll()}destroy(){this.canvas.destroy()}}const gt={class:"component-a-star flex-layout frow"},mt={class:"tool flex-none"},vt=["onClick"],wt={class:"tool-item"},xt=it(" \u663E\u793A\u4EE3\u4EF7 "),Ct=X({__name:"aStar",props:{},emits:[],setup(l,{emit:t}){J(),Y();const e=R(null);let s=null;function r(h){if(h.target&&s){const n=s.getZshapeInfo(h.target);n&&s.setWall(n.index)}}const i={click:r,mousedrag:r};function a(h){if(h.target&&s){const n=s.getZshapeInfo(h.target);n&&s.setGround(n.index)}}const c={click:a,mousedrag:a};function p(h){if(h.target&&s){const n=s.getZshapeInfo(h.target);n&&s.setSource(n.index)}}const u={click:p};function d(h){if(h.target&&s){const n=s.getZshapeInfo(h.target);n&&s.setTarget(n.index)}}const y={click:d};async function C(h){return new Promise(n=>setTimeout(n,h))}async function f(){if(!s)return;s.run();const h=s.drawGradientRow();let n=0;for(let _ of h)n+=_.length,n>10&&(n=0,await C(50));s.drawPath()}const g={btnClick:f};function M(h){if(h.target&&s){const n=s.getZshapeInfo(h.target);n&&console.log("info",n.x,n.y,n.astarItem)}}const W={click:M};function D(){s&&s.clearRes()}const O={btnClick:D};function B(){s&&s.clearAll()}const G=[{title:"\u5899",value:"wall",zcontroller:i},{title:"\u5730\u9762",value:"ground",zcontroller:c},{title:"\u8D77\u70B9",value:"source",zcontroller:u},{title:"\u7EC8\u70B9",value:"target",zcontroller:y},{title:"\u8BA1\u7B97",value:"run",zcontroller:W,dcontroller:g},{title:"\u6E05\u9664\u8BA1\u7B97",value:"clearRes",dcontroller:O},{title:"\u6E05\u9664\u5168\u90E8",value:"clearAll",dcontroller:{btnClick:B}}],v=R(G[0]);k(e,()=>{!e.value||(s=new yt(e.value),v.value.zcontroller&&s.addController(v.value.zcontroller),j())});function j(){!s||(s.setSource(2),s.setTarget(s.widthCnt*(s.heightCnt-2)+s.widthCnt-2))}tt(()=>{s&&s.destroy()});function N(h){var n;v.value=h,(n=h.dcontroller)!=null&&n.btnClick&&h.dcontroller.btnClick()}k(v,(h,n)=>{s&&(n&&n.zcontroller&&s.removeController(n.zcontroller),h.zcontroller&&s.addController(h.zcontroller))},{immediate:!0});const E=R(!0);return k(E,h=>{s&&s.canvas.showPriority(h)}),(h,n)=>{const _=ot("a-switch");return L(),P("div",gt,[I("div",mt,[(L(),P(et,null,st(G,m=>I("div",{key:m.value,class:at(["tool-item",{active:v.value.value===m.value}]),onClick:St=>N(m)},nt(m.title),11,vt)),64)),I("div",wt,[xt,rt(_,{checked:E.value,"onUpdate:checked":n[0]||(n[0]=m=>E.value=m),size:"small"},null,8,["checked"])])]),I("div",{class:"zrader flex-auto",ref_key:"zrRef",ref:e},null,512)])}}});var kt=Q(Ct,[["__scopeId","data-v-4e669dda"]]);export{kt as default};