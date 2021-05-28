<template>
<div class="component-start">
    <p>
        JavaScript API GL版本对手机性能要求较高，当前版本不建议在移动端调用。若涉及移动端JS服务调用，请使用JavaScript API v3.0版本.<br>
        <router-link to="./gl/glstart">页面—></router-link>
        <router-link to="https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/usage">文档-></router-link>
    </p>
    <p>
        JavaScript API v3.0支持PC端和移动端基于浏览器的地图应用开发，且支持HTML5特性的地图开发。<br>
        <router-link to="./gl/glstart">页面—></router-link>
        <router-link to="https://lbsyun.baidu.com/index.php?title=jspopular3.0">文档-></router-link>
    </p>
    <p>
        JavaScript API Lit 和JavaScript API标准版相比，Lite版专门针对移动端H5页面的使用场景，代码体积小，性能更好。 Lite版不支持PC浏览器。<br>
        <router-link to="./gl/glstart">页面—></router-link>
        <router-link to="https://lbsyun.baidu.com/index.php?title=jspopularLiteV1">文档-></router-link>
    </p>
</div>
</template>

<script>
/* message */

export default {
    name: "start",
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-start{
    
}
</style>