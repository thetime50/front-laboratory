<!--
<template>

</template>
-->

<script>
    import Common from '@/com/common.js'
    import selectDetailCommon from "./selectDetailCommon.vue"
    import Consts from '@/com/consts.js';
    export default {
        name: "select-detail",
        extends: selectDetailCommon,
        components: {
            
        },
        render(createElement, context){
            let _this=this
            // console.log(selectDetailCommon)
            return (
                <div class="component-select-detail">
                    {_this.visible && <div class="edit-wrap" > {/* v-if="editting && editting._id" */}
                        {selectDetailCommon.render.call(_this)} {/* 把其他组件的render放到当前组件里渲染 */}
                    </div>}
                    <div class="footer" > {/* slot="footer" */}
                        <el-button type="primary" on-click={_this.confirm}>保存</el-button>
                        {_this.editting._id && (<el-button type="danger" on-click={_this.del}  class="danger-button">删除</el-button>)}
                        <el-button on-click={_this.cancel}>取消</el-button> {/* @click="visible = false"*/}
                    </div>
                </div>
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
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
    .component-select-detail{
        height: 100%;
        overflow: hidden;

        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;//.class1 .class2
        >*{
            min-width: 0;
            min-height: 0;
        }
        .edit-wrap{
            overflow-y:auto;
            .mpping-form{
                width: 100%;
            }
        }
        .footer{
            margin-top: 10px;
        }
    }
</style>
