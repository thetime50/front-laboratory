<!--
<template>
</template>
-->

<script>
    import Common from '@/com/common.js'
    import  selectDetailCommon from "./selectDetailCommon.vue"
    import Consts from '@/com/consts.js';
    export default {
        name: "select-detail-dialog",
        extends: selectDetailCommon,
        components: {},
        render(){
            let _this=this
            return(
                <mp-dialog class="component-select-detail-dialog" close-on-click-modal={false}
                    visible={_this.visible}   {...{on:{'update:visible': (v)=>{_this.visible =v }}}}
                    append-to-body={true} width="80%" title="编辑选择关系"> {/* visible.sync={_this.visible}  */}
                    
                    <div style="max-height:500px;overflow-y:scroll">
                        {selectDetailCommon.render.call(_this)} {/* 把其他组件的render放到当前组件里渲染 */}
                    </div>
                    <div slot="footer">
                        <el-button type="primary" on-click={_this.confirm}>保存</el-button>
                        {_this.editting._id && (<el-button type="danger" on-click={_this.del}  class="danger-button">删除</el-button>)}
                        
                        {/*<el-button on-click={_this.visible = false}>取消</el-button>*/}{/*估计这边的{_this.visible = false}代码会在构造模板的阶段就执行*/}
                        <el-button on-click={()=>{_this.visible = false}}>取消</el-button>
                    </div>
                </mp-dialog>
            )
        },
        props: {
            
        },
        data() {
            return {
            }
        },
        // render:{
        //    本来打算用render处理模板的 有点问题 先直接复制这个模板
        // },
        computed: {
        },
        watch: {
            // visible(v){
            //     console.log('watch',v)
            // }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .component-select-detail-dialog{
        .mpping-form{
            width: 100%;
        }
    }
</style>
