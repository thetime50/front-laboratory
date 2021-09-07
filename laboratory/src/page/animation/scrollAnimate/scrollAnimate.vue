<template>
    <div class="component-scroll-animate flex-layout">
        <h2 class="flex-none">scroll-animate</h2>
        <p class="flex-none">
            <a href="https://github.com/vycoder/vue-animate-onscroll"
                >vue-animate-onscroll</a
            >
            <br />
            <br />
            <a href="https://github.com/mike-prince/vue-animate-scroll"
                >vue-animate-scroll</a
            >
            <br />
            <br />
            <a href="https://github.com/thetime50/vue-animate-onelscroll"
                >vue-animate-onelscroll</a
            >
            <br />
            <br />
            这里使用 vue-animate-onelscroll <br>
            IntersectionObserver
        </p>
        <div class="scroll-wrap flex-auto scroll-all" ref="scrollWrap">
            <div class="content">
                <div class="line"></div>
                <!-- <template v-for="(item, index) in list.slice(0,5)">
                    <item :index="index"/>
                </template> 
                <item v-onelscroll.repeat.edge="{scrollEl:scrollEl,down: 'animated zoomInRight', up: 'animated flipInX' }" :index="list.slice(0,5).length"/>
                <template v-for="(item, index) in list.slice(0,5)">
                    <item :index="list.slice(0,5).length+index+1"/>
                </template>  -->

                <!-- 
                    第一次滚动会有动画 因为只判断方向
                    .repeat 好像没效果
                    .up 好像没效果
                 -->
                <template v-for="(item, index) in list">
                    <item :index="index"
                        v-onelscroll.repeat.edge="{
                            scrollEl:scrollEl, 
                            down: 'animated zoomInRight', 
                            up: 'animated flipInX' 
                        }"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
/* message */
import item from "./item.vue"

export default {
    name: "scroll-animate",
    components: {
        item,
    },
    data() {
        return {
            list: Array(20),
            scrollEl:null,
        };
    },
    mounted () {
        this.$nextTick(()=>{
            this.scrollEl = this.$refs.scrollWrap
        })
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-scroll-animate {
        // 
    }

    .animated {
        -webkit-animation-duration: 0.8s;
        animation-duration: 0.8s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }

    @keyframes flipInX {
        0% {
            -webkit-transform: perspective(400px) rotateX(90deg);
            transform: perspective(400px) rotateX(90deg);
            opacity: 0
        }

        0%,
        40% {
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in
        }

        40% {
            -webkit-transform: perspective(400px) rotateX(-20deg);
            transform: perspective(400px) rotateX(-20deg)
        }

        60% {
            -webkit-transform: perspective(400px) rotateX(10deg);
            transform: perspective(400px) rotateX(10deg);
            opacity: 1
        }

        80% {
            -webkit-transform: perspective(400px) rotateX(-5deg);
            transform: perspective(400px) rotateX(-5deg)
        }

        to {
            -webkit-transform: perspective(400px);
            transform: perspective(400px)
        }
    }

    .flipInX {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        -webkit-animation-name: flipInX;
        animation-name: flipInX
    }

    .zoomOutRight {
        -webkit-animation-name: zoomOutRight;
        animation-name: zoomOutRight
    }

    @keyframes zoomInRight {
        0% {
            opacity: 0;
            -webkit-transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
            transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0);
            -webkit-animation-timing-function: cubic-bezier(.55, .055, .675, .19);
            animation-timing-function: cubic-bezier(.55, .055, .675, .19)
        }

        60% {
            opacity: 1;
            -webkit-transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
            transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0);
            -webkit-animation-timing-function: cubic-bezier(.175, .885, .32, 1);
            animation-timing-function: cubic-bezier(.175, .885, .32, 1)
        }
    }

    .zoomInRight {
        -webkit-animation-name: zoomInRight;
        animation-name: zoomInRight
    }

    .scroll-wrap{
        color: #fff;
        padding:0 30px;
        background: #1C1C1C linear-gradient(156.64deg, #363636 -92.7px, #1C1C1C 343px) no-repeat;
        text-align: left;
        margin: 10px 20px;
        border-radius: 10px;
    }
    .content{
        width: 100%;
        overflow: hidden;
        position: relative;
        // width:1293px + 115px;
        z-index: 5;
        margin:auto;
        padding-top: 16px;
        >.line{
            z-index: -1;
            position: absolute;
            left:97px;
            width: 1px;
            background-image: linear-gradient(#FEE2BE 0%,#E7C481 100%);
            top:17px + 16px;
            bottom: 0;
        }
    }
</style>