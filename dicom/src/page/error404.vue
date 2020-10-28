<template>
<div class="component-error404 vertical-center">
    error404<br>
    找不到路径{{$route.fullPath}}<br>
    <el-button type="danger" plain @click="$router.go(-1)">返回</el-button>
</div>
</template>

<script>
/* message */

export default {
    name: "error404",
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-error404{
    margin: auto;
    padding: 20px;
    color:#f55;
    background-color: #fee;
    border: 1px solid #f88;
    border-radius: 15px;
    width: 400px;
    text-align: center;
    top:40%;
}
</style>