<template>
<div class="component-feed" :class="{feed__selected:selected }" @click="handleClick">
    <div class="feed_cover"
        :style="{backgroundImage: `url(${feed.coverUrl})`}"
    />
    <div class="feed_avatar">
        <p class="feed_text">
            <em><i class="fa fa-star"></i> {{feed.subscribers}}k</em>
            <span>subscribers</span>
        </p>
        <div class="feed_face"
            :style="{backgroundImage:`url(${feed.faceUrl})`}">

        </div>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "feed",
    props:{
        feed:{type:Object,required:true},
        selected:{type:Boolean,default:false},
    },
    data () {
        return {
        };
    },
    methods:{
        handleClick(){
            const appRect = document.querySelector('#app').getBoundingClientRect()
            const elRect = this.$el.getBoundingClientRect()
            const rect = { top: elRect.top - appRect.top }

            const feed = this.feed
            this.$emit('select', { rect, feed })
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-feed{
    position: relative;
    padding: 16px 8px 0;
    height: 240px;
    &.feed__selected{//选中后隐藏列表中当前项和之前的选项卡
        visibility: hidden;
    }
    .feed_cover{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
    }
    .feed_avatar{
        position:absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        transform: translate3D(-82vw, -2vw, 0);
        .feed_face{
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background-size: cover;
        }
        .feed_text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 12px;
            opacity: 0;
            transform: translate3d(100%, 0, 0);

            i {
                color: #ffbe00;
            }
            em {
                font-weight: 900;
                text-align: right;
                text-transform: uppercase;
                letter-spacing: -1px;
                color: #222;
            }
            span {
                font-size: 13px;
                color: #ccc;
            }
        }
    }
}
</style>