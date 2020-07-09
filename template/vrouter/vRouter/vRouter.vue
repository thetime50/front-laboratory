<template>
<div class="component-v-router">
    <v-router-view
        :vr_handle="vrHandle"
        :vr_route="vrRoute"
        :vr_router="vrRouter"
        v-bind="$attrs"/>
</div>
</template>

<script>
/* message */
import vRouterView from "@/components/common/vRouter/vRouterView.vue"

export default {
    name: "v-router",
    components:{
        vRouterView,
    },
    props:{
        router:{//公共的操作数据 所有数据从这里产生
            type:Object,
            // default:()=>{return {
            //     routes:[],
            // }}
            required:true,
        },
        full_path:{type:String,default:()=>''}
    },
    data () {
        return {
            vrHandle:{//递归调用的句柄
                index:-1,
            },
        }
    },
    computed:{
        routerRoutes(){
            return this.router.routes
        },
        fullPath:{
            get(){
                return this.full_path
            },
            set(val){
                this.$emit('update:full_path',val)
            },
        },
        path(){
            return this.fullPath.replace(/(?:\/(?=$))?$/,'')
        },
        query(){
            let match = this.fullPath.match(/(?:\/(?=$))?$/)|| []
            return  match[0] || ''
        },
        // queryObj(){
        //     this.query
        // },
        pathArr(){
            return this.path.split('/').filter(v=>v)
        },
        routePath(){
            let editPathArr = [].concat(this.pathArr)//copy
            let reMatch  = true
            let rpath = []
            let ipath = []
            let fullMatched = false
            while(reMatch){
                reMatch = false
                rpath = []
                ipath = []
                fullMatched = false
                let matchChildren=(child,patharr,cnt=0)=>{
                    let index = child.findIndex((v,i,a)=>{
                        return v.path.replace(/^\//,'') == patharr[cnt]
                    })
                    if(index>=0){
                        let mchild = child[index]
                        rpath.push(mchild)
                        ipath.push(index)
                        if(cnt+1>=patharr.length){
                            fullMatched=true
                            if(mchild.redirect){//目前只支持相对路径的替换
                                //todo
                                editPathArr = this.pathAdd(editPathArr.join('/'),mchild.redirect).replace(/^\//,'').split('/')
                                reMatch = true
                            }
                            return
                        }
                        if(mchild.children){
                            matchChildren(mchild.children,patharr,cnt+1)
                        }
                    }else{
                        // 
                    }
                }
                matchChildren(this.routerRoutes,editPathArr)
            }
            let spath = rpath.reduce((t,v,i,a)=>{
                return t+'/'+v.path
            },'')
            return {spath,ipath,rpath,fullMatched}
        },
        currentRouter(){
            let rpath = this.routePath.rpath
            return rpath[rpath.length - 1]
        },
        matched(){
            function getMatched(v,i,a){
                let path = a.slice(0,i+1).reduce((t,v,i,a)=>{
                    return t+'/'+v.path
                },'')

                let regex = path.replace('/','\\/')
                regex = `^${regex}(?:\\/(?=$))?$`
                return {
                    // beforeEnter: undefined,
                    components: {default:v.component},
                    // instances: {default: VueComponent},
                    // matchAs: undefined,
                    // meta: {},
                    name: v.name,
                    // parent: undefined,
                    path: path,
                    props: {},
                    redirect: v.redirect,
                    regex: new RegExp(regex, "i"),
                }
            }
            return this.routePath.rpath.map(getMatched)
        },
        vrRoute(){//相当于$route
            return {
                fullPath:this.fullPath,
                hash:'',
                matched:this.matched,
                // meta:{},
                name:'',
                // params:{},
                path:this.path,
                // query:'',
            }
        },
        vrRouter(){//相当于$router 包装了一些方法
            return {
                push: this.push
            }
        },
    },
    methods:{
        pathParse(...paths){
            let fpath = paths.reduce((t,v,i,a)=>{
                let vs = ''
                if(Array.isArray(v)){
                    vs=v.join('/')
                }
                if(typeof(v) == 'string'){
                    vs = v.replace(/^\//,'')
                }
                return t + '/' + vs
            },'')
            let parr = fpath.replace(/^\//,'').split('/')
            let pparr = []
            parr.forEach((v,i,a) => {
                if(v=='' || v == '.'){
                    ;
                }else if( /^\.{2,}$/.test(v) ){
                    let cnt = v.match('.').length-1
                    pparr.splice(pparr.length - cnt, cnt)
                }else{
                    pparr.push(v)
                }
            });

            fpath = '/' + pparr.join('/')
            return fpath
        },
        pathAdd(fpath,addpath){
            let path = addpath
            if(path[0] == '/'){
                ;
            }else{
                let oldPath = fpath.replace(/\/?(\w|-)+\/?$/,'')
                path = this.pathParse(oldPath,path)
            }
            return path
        },
        push(to){
            let result = ''
            if(typeof(to)=="string"){
                let path =  to.replace(/(?:\/(?=$))?$/,'')
                let query = (to.match(/(?:\/(?=$))?$/)|| [])[0] || ""
                result = this.pathAdd(this.fullPath,path)+query
            }
            if(typeof(to)=='object'){
                let path = this.pathAdd(this.fullPath,to.path)
                let query = []
                for(let q in query){
                    let qv = query[q]
                    query.push(q+"="+qv)
                }
                query = query.join('&')

                result = path + (query? '?' : query)
            }
            this.fullPath = result
            // console.log(this,result)
            // {path: '/login', query:{stage: stage}}
        },
    },
    watch:{
        "routePath.spath":{
            handler(after,before){
                if(this.path != this.routePath.spath){
                    // console.log(this.routePath.spath ,this.query)
                    this.fullPath = this.routePath.spath + this.query
                }
            },
            // deep:true,
            immediate:true,
        },
    },
}
</script>
<!--

VueRouter {app: Vue, apps: Array(1), options: {…}, beforeHooks: Array(1), resolveHooks: Array(0), …}
afterHooks: (2) [ƒ, ƒ]
app: Vue {_uid: 3, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
apps: [Vue]
beforeHooks: [ƒ]
fallback: false
history: HashHistory {router: VueRouter, base: "", current: {…}, pending: null, ready: true, …}
matcher: {match: ƒ, addRoutes: ƒ}
mode: "hash"
options: {linkActiveClass: "active", routes: Array(17)}
resolveHooks: []
currentRoute: (...)
__proto__:
    addRoutes: ƒ addRoutes(routes)
    afterEach: ƒ afterEach(fn)
    back: ƒ back()
    beforeEach: ƒ beforeEach(fn)
    beforeResolve: ƒ beforeResolve(fn)
    forward: ƒ forward()
    getMatchedComponents: ƒ getMatchedComponents(to)
    go: ƒ go(n)
    init: ƒ init(app /* Vue component instance */)
    match: ƒ match( raw, current, redirectedFrom )
    onError: ƒ onError(errorCb)
    onReady: ƒ onReady(cb, errorCb)
    push: ƒ push(location, onComplete, onAbort)
    replace: ƒ replace(location, onComplete, onAbort)
    resolve: ƒ resolve( to, current, append )
    constructor: ƒ VueRouter(options)
    currentRoute: (...)
    get currentRoute: ƒ ()
    __proto__: Object


fullPath: "/mgwx/wxlogin"
hash: ""
matched: Array(2)
    0:
        beforeEnter: undefined
        components: {default: {…}}
        instances: {default: VueComponent}
        matchAs: undefined
        meta: {}
        name: undefined
        parent: undefined
        path: "/mgwx"
        props: {}
        redirect: "mgwx/wxhome"
        regex: /^\/mgwx(?:\/(?=$))?$/i
        __proto__: Object
    1: {path: "/mgwx/wxlogin", regex: /^\/mgwx\/wxlogin(?:\/(?=$))?$/i, components: {…}, instances: {…}, name: undefined, …}
    length: 2
    __proto__: Array(0)
meta:
    guest: true
    title: "卫星登录"
    __proto__: Object
name: undefined
params: {}
path: "/mgwx/wxlogin"
query: {}

 -->



<style rel="stylesheet/scss" lang="scss" scoped>
.component-v-router{
    
}
</style>