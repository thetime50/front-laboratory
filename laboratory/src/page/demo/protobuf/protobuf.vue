<template>
    <div class="component-protobuf">
        <h2>protobuf</h2>
        <div>
            <a href="https://developers.google.com/protocol-buffers/">protocol-buffers</a> <br>
            <a href="https://github.com/protocolbuffers/protobuf/tree/master/js">github google-protobuf</a> <br>
            <a href="https://www.npmjs.com/package/google-protobuf">npm google-protobuf</a> <br>
            <a href="https://github.com/protocolbuffers/protobuf/releases">Protocol Compiler</a>
        </div>
        <div>
            <a href="https://segmentfault.com/a/1190000021052292">如何在前端中使用protobuf（vue篇）</a>
        </div>
    </div>
</template>

<script>
    /* message */
    import protobuf from 'google-protobuf'

    export default {
        name: "protobuf",
        data () {
            return {
            };
        },
        mounted () {
            console.log(protobuf,protobuf.provide)
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-protobuf{
        
    }
</style>