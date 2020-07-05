<template>
<div class="component-action-button">
    <i class="el-icon-search" />
</div>
</template>

<script>
/* message */

export default {
    name: "action-button",
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-action-button{
    position: fixed;
    left: 30px;
    top: 32px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-color: $theme-primary;
    color: #fff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

    font-size: 20px;
}
</style>