<template>
<transition name="show" @enter="handleEnter" @after-enter="handleAfterEnter">
    <div class="component-feed-detail"
        v-if="selected"
        :class="{'feed-detail__stat': isShowStat}"
    >
        <!-- <feed-magic /> -->
        <feed ref="feed" :feed="selected.feed"/>
        <post-list :posts="selected.feed.posts"/>
        feed-detail
    </div>
</transition>
</template>

<script>
/* message */
import {mapState} from 'vuex'
import feedMagic from "./feedMagic.vue"
import feed from "./feed.vue"
import postList from "./postList.vue"

export default {
    name: "feed-detail",
    components:{
        feedMagic,
        feed,
        postList,
        // 
    },
    data () {
        return {
            isShowStat:false
        };
    },
    computed:{
        ...mapState(['selected'])
    },
    methods:{
        handleEnter(){

        },
        handleAfterEnter(){

        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-feed-detail{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 88px;
    // .feed{}
}
</style>