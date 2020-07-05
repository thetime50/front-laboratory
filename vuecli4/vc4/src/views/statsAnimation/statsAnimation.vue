<template>
<div class="component-stats-animation">
    stats-animation
    <action-button/>
</div>
</template>

<script>
/* message */
import actionButton from "@/components/statsAnimation/actionButton.vue"

export default {
    name: "stats-animation",
    components:{
        actionButton,
    },
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-stats-animation{
    height: 100%;
    background-color: #f1f2fb;
}
</style>