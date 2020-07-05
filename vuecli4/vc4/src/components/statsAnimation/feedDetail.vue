<template>
<transition name="show" @enter="handleEnter" @after-enter="handleAfterEnter">
    <div class="component-feed-detail"
        v-if="selected"
        :class="{'feed-detail__stat': isShowStat}"
    >
        <!-- <feed-magic /> -->
        <feed ref="feed" :feed="selected.feed"/>
        <feed-meta />
        <post-list :posts="selected.feed.posts"/>
        <feed-stat />
    </div>
</transition>
</template>

<script>
/* message */
import {mapState} from 'vuex'
import feedMagic from "./feedMagic.vue"
import feed from "./feed.vue"
import feedMeta from "./feedMeta.vue"
import postList from "./postList.vue"
import feedStat from "./feedStat.vue"

export default {
    name: "feed-detail",
    components:{
        feedMagic,
        feed,
        feedMeta,
        postList,
        feedStat,
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