<template>
    <edialog
        ref="edialog"
        v-bind="{
                ...$props, // 传入的配置
                ...modeOptions.edialog //模式配置 覆盖传入的配置
            }"
        v-on="$listeners"
        v-dialogDrag:[dragEnable]
    >
            <template v-slot:title>
                <slot name="title"/>
            </template>
            <template v-slot>
                <div class="my-dialog_body" v-resize:throttle="autoTopSync">
                    <slot/>
                </div>
            </template>
            <template v-slot:footer>
                <slot name="footer"/>
            </template>
    </edialog>
</template>

<script>
/* my-dialog */
import Vue from 'vue';
import { Dialog } from 'element-ui'

let DialogComponent = Vue.component(Dialog.name, Dialog);
let objOptions=DialogComponent.options;

export default {
    name: "my-dialog",
    components:{
        edialog:Dialog,
    },
    props:{
        ...objOptions.props,

        // //覆盖默认配置
        // 统一在下面 modeOptions 处理了
        // modalAppendToBody:  {...objOptions.props.modalAppendToBody,   default:true},
        // appendToBody:       {...objOptions.props.appendToBody,        default:false},
        // modal:              {...objOptions.props.modal,               default:false},//hb项目遮罩有问题 暂时去掉遮罩
        // customClass:        {...objOptions.props.customClass,   required:true},// 必须要传customClass
        // closeOnClickModal:  {...objOptions.props.closeOnClickModal,   default:false},
        // closeOnPressEscape: {...objOptions.props.closeOnPressEscape,  default:false},
        // showClose:          {...objOptions.props.showClose,           default:false},

        //自定义的属性
        drag:{type:Boolean,default:true,required:false,},   //允许拖拽
        mode:{type:String,default:'',required:false,},      //模式 //固定模式 优先级高于上面的覆盖配置 无法被覆盖
    },
    // created(){
    //     console.log(Dialog,Dialog.props)
    //     console.dir(DialogComponent)
    //     console.log(this,this.$scopedSlots,this.$slots)
    //     console.log(objOptions)
    // },
    // mounted(){
    //     console.log(this.$refs.edialog)
    //     this.$refs.edialog.$scopedSlots=this.$scopedSlots
    // },
    data () {
        return {
            autoTop:undefined,
        };
    },
    computed:{
        dragEnable(){ // last out control
            if(this.modeOptions.drag!==undefined){//模式配置 覆盖传入的配置
                return this.modeOptions.drag
            }else{
                return this.drag?"":"disable"
            }
        },
        modeOptions(){
            // console.log(this.$options.propsData,this._self.$props)
            let objCfg={
                drag:undefined,
                edialog:{}// eldialog props
            }
            let objPd=this.$options.propsData
            let setUndefined= (key,val) =>{
                (objPd[key]===undefined) && (objCfg.edialog[key]=val)
            }
            // if(){//缩放
            if( this.themeCustId=="hb" && //暂时用一下
                /^\/set\b/.test(this.$route.path) == false
            ){//是hb项目并且不是后台
                setUndefined("modal",false)
                setUndefined("modalAppendToBody",false)
                setUndefined("appendToBody",false)
                setUndefined("closeOnClickModal",true)
            }else{
                setUndefined("modalAppendToBody",true)
                setUndefined("appendToBody",true)
                setUndefined("closeOnClickModal",false)
            }

            setUndefined("top",this.autoTop+"px")

            switch(this.mode){//配置可复用的模式
                case 'mode1':
                    objCfg.edialog.showClose=false
                    break
                default:
                    break
            }
            return objCfg
        },
    },
    methods:{
        autoTopSync(){
            let height = this.$refs.edialog.$refs.dialog.clientHeight
            let top = (window.innerHeight - height)/2
            this.$set(this,'autoTop', Math.max(0,(top*0.7).toFixed(0)))
        },
    },
    watch:{
        visible:{
            handler(after,before){
                if(after){
                    this.$nextTick(()=>{
                        // this.autoTopSync()
                    })
                }
            },
            // deep:true,
            immediate:true,
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-my-dialog{
     
}
</style>