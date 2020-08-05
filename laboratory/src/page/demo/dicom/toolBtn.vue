<template>
<div class="component-tool-btn" @click="value_ = ! value_">
    <i class="el-icon-arrow-up dummy"></i>
    <div class="move flex-auto pabsolute" :class="{'is-up':value_}">
        <div class="icon el-icon-arrow-down"></div>
        <div class="icon el-icon-arrow-up"></div>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "tool-btn",
    props:{
        value:{type:Boolean,}
    },
    data () {
        return {
        };
    },
    computed:{
        value_:{
            get(){
                return this.value
            },
            set(val){
                this.$emit("input",val)
            },
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-tool-btn{
    $padding: 5px;
    display: inline-block;
    overflow: hidden;
    font-size: 30px;
    line-height: 1;
    padding: $padding;
    border-radius: 5px;
    border: solid 1px #888;
    background-color: rgba(#fff,0.6);
    .dummy{
        visibility: hidden;
    }
    .move{
        left: 0;
        bottom: calc(0% + 1px);
        transition: all 0.6s;
        &.is-up{
            bottom: calc(-100% - 0px);
        }
    }
    .icon{
        padding: $padding;
        &:first-child::after{
                content: '';
                background: #888;
                position:absolute;
                bottom: 50%;
                left: 15%;
                right: 15%;
                height: 1px;
        }
    }
}
</style>