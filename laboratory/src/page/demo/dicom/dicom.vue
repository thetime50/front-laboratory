<template>
<div class="component-dicom flex-layout">
  项目预览 <a href="https://thetime50.github.io/front-laboratory/dicom/dist/index.html#/demo/dicom" target="_blank" rel="noopener noreferrer">thetime50.github.io</a><br>
  国内 <a href="http://thetime50.com/front-laboratory/dicom/dist/index.html#/demo/dicom">thetime50.com</a> 
</div>
</template>

<script>
/* message */
export default {
    name: "dicom",
    data () {
        return {
            // 
        };
    },
    methods:{
        // 
    },
    watch:{
        // 
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dicom{
    position: relative;
    .three-wrap{
        z-index: 10;
        .three{
            overflow: hidden;
        }
        .opt-sw{
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
    
    .option-wrap{
        position: relative;
        margin: 5px;
        border-radius: 5px;
        border: solid 1px #888;
        height: 200px;

        overflow: auto;
    }
    .option-wrap-enter-active, .option-wrap-leave-active {
        transition: all 0.5s;
    }
    .option-wrap-enter, .option-wrap-leave-to /* .fade-leave-active below version 2.1.8 */ {
        // margin-top: 20px;
        height: 0px;//to
    }
    .option{
        max-width: calc(100% - 3rem);
        @media (min-width: 43rem){
          width:40rem;
        }
        /deep/ .el-slider__marks-text{
            width: 80px;
        }
        .el-input{
            width: 150px;
        }
    }
}
</style>