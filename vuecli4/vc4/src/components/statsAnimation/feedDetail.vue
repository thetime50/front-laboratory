<template>
<transition name="show" @enter="handleEnter" @after-enter="handleAfterEnter">
    <div class="component-feed-detail"
        v-if="selected"
        :class="{'feed-detail__stat': isShowStat}"
    >
        <!-- <feed-magic /> -->
        <feed ref="feed" :feed="selected.feed"/>
        <feed-meta :feed="selected.feed" @fullstat="handleFullStat"/>
        <post-list :posts="selected.feed.posts"/>
        <feed-stat v-if="isShowStat" :feed="selected.feed"/>
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
            isShowStat:false,
            isShowMagic: false,
            isMagicReady: false,
        };
    },
    computed:{
        ...mapState(['selected'])
    },
    methods:{
        handleEnter(){
            console.log('handleEnter')
        },
        handleAfterEnter(){
            console.log('handleAfterEnter')
        },
        handleFullStat(){
            console.log("handleFullStat")
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

    ::v-deep{
        .component-feed {
            padding: 16px 20px 0;
            transform: translate3d(0, 0, 0);
        }
        .feed_avatar {
            transform: translate3d(-20px, -275px, 0);
        }
        .feed_text {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    // .feed-detail__stat ::v-deep{
    //     background-color: #f1f2fb;
    //     .post-list > ul > li {
    //         perspective: 1900px;//透视
    //     }
    //     .post {
    //         transform: translate3d(0, -50px, 0) rotateX(90deg);
    //         transform-style: preserve-3d;
    //         transition: all 0.6s ease-in;
    //     }
    //     .post-list {
    //         opacity: 0;
    //         transition: all 0.6s ease-in;
    //     }
    //     .feed_cover {
    //         opacity: 0;
    //     }
    //     .feed-meta {
    //         opacity: 0;
    //     }
    // }
    //组件动画过程
    &.show-leave-to{
        transform: translate3d(0, 100% 0);
    }
    //https://segmentfault.com/q/1010000020658004/
    &.show-enter ::v-deep{
        .component-feed{
            padding: 16px 8px 0;
            transform: translate3d(0, 53px, 0);
        }
        .feed_avatar{
            transform: translate3d(-82vw, -2vw, 0);
        }
        .feed_text {
            transform: translate3d(100%, 0, 0);
            opacity: 0;
        }
    }
    &.show-enter-active ::v-deep,
    &.show-leave-active ::v-deep{
        transition: all 0.6s ease;
        .component-feed,
        .feed_avatar,
        .feed_text{
            transition: all 0.6s ease;
        }
    }
}
</style>