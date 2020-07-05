<template>
<div class="component-stats-animation">
    <!-- stats-animation -->
    <action-button/>
    <feed-list />
</div>
</template>

<script>
/* message */
import actionButton from "@/components/statsAnimation/actionButton.vue"
import feedList from "@/components/statsAnimation/feedList.vue"

export default {
    name: "stats-animation",
    components:{
        actionButton,
        feedList,
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
<style lang="scss">

.heading {
  padding: 16px 30px;
  font-weight: 600;
  font-size: 18px;
}
</style>