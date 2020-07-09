<template>
<div class="component-feed-magic">
    feed-magic
</div>
</template>

<script>
/* message */

export default {
    name: "feed-magic",
    data () {
        return {
        };
    },
    created(){
        this.$emit('ready')
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-feed-magic{
    
}
</style>