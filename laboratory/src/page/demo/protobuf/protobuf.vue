<template>
    <div class="component-protobuf">
        protobuf <br>
        <a href="https://developers.google.com/protocol-buffers/">protocol-buffers</a> <br>
        <a href="https://github.com/protocolbuffers/protobuf/tree/master/js">github google-protobuf</a> <br>
        <a href="https://www.npmjs.com/package/google-protobuf">npm google-protobuf</a> <br>
        <a href="https://github.com/protocolbuffers/protobuf/releases">Protocol Compiler</a>
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