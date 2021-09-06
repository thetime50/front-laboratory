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
                <template v-for="(item, index) in list">
                    <!-- <div class="item-wrap" v-onscroll.repeat="{down: 'animated zoomInRight', up: 'animated zoomOutRight' }"> -->
                    <div class="item-wrap" v-onelscroll.repeat="'animated zoomRight'">
                        <div class="title-row flex-layout frow justify-start">
                            <div class="time-tag">1分钟前</div>
                            <div class="time-dot"></div>
                            <div class="item"></div>
                            <div class="title">评级上升</div>
                        </div>
                        <div class="block flex-layout frow">
                            <div class="product flex-layout frow">
                                <a
                                    data-v-37890986=""
                                    href="/productDetails/productOverview?id=3499967438638948546"
                                    class=""
                                    target="_blank"
                                >
                                    <div class="el-image">
                                    <img
                                        src="//cdn1.kaogujia.com/obj/temai/394809ee226006cde8f3a606487b72f8www800-800"
                                        class="el-image__inner"
                                        style="object-fit: cover"
                                    /><!---->
                                    </div>
                                </a>
                                <div class="info">
                                    <div class="title-tag">
                                        <a
                                            data-v-37890986=""
                                            href="/productDetails/productOverview?id=3499967438638948546"
                                            class="title multi-ellipsis--l2"
                                            target="_blank"
                                        >
                                            {{index + 1}} 武老三襄阳休闲零食花椒锅巴108g*3袋
                                        </a>
                                        <div class="tag-row">
                                            <span data-v-37890986="">食品饮料</span>
                                        </div>
                                    </div>
                                    <div class="data1">
                                        <span class="price1"
                                            >￥<span data-v-37890986="">9.90</span></span
                                        >
                                        <span class="price2">￥19.80</span>
                                        <span class="com-label">佣金</span>
                                        <span class="com-val">15.05%</span>
                                        <span class="volume-label">今日销量</span>
                                        <span class="volume-val"> 3302</span>
                                    </div>
                                    <div class="data2 flex-layout frow">
                                        <div class="item flex-mean">
                                            <div class="val">2653</div>
                                            <div class="label">销量(近2小时)</div>
                                        </div>
                                        <div class="item flex-mean">
                                            <div class="val">9505</div>
                                            <div class="label">浏览量(近2小时)</div>
                                        </div>
                                        <div class="item flex-mean">
                                            <div class="val">27.91%</div>
                                            <div class="label">转化率(近2小时)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template> 
            </div>
        </div>
    </div>
</template>

<script>
/* message */

export default {
    name: "scroll-animate",
    data() {
        return {
            list: Array(50),
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
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }
    @keyframes zoomOutRight {
        40% {
            opacity: 1;
            -webkit-transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0);
            transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0)
        }

        to {
            opacity: 0;
            -webkit-transform: scale(.1) translate3d(2000px, 0, 0);
            transform: scale(.1) translate3d(2000px, 0, 0);
            -webkit-transform-origin: right center;
            transform-origin: right center
        }
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
        position: relative;
        // width:1293px + 115px;
        z-index: 5;
        margin:auto;
        margin-top: 16px;
        >.line{
            z-index: -1;
            position: absolute;
            left:97px;
            width: 1px;
            background-image: linear-gradient(#FEE2BE 0%,#E7C481 100%);
            top:17px;
            bottom: 0;
        }
    }
    .item-wrap{
        // height: 244px;
        margin-top: 20px;
        // margin-left: 97.5px;
        // border-left: rgba( #FEE2BE, 0.6) 1px solid;
        &:first-child{
            padding-top: 0;
        }
    }
    .title-row{
        padding-top: 10px;
        padding-bottom: 12px;
        .time-tag{
            width: 80px;
            padding:6px 0px;
            margin-right: 12px;
            color: #FFFFFF;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            text-align: center;

            font-weight: 500;
            font-size: 12px;
            line-height: 12px;

        }
        .time-dot{
            height: 11px;
            width: 11px;
            margin-right: 34px;
            background: linear-gradient(90deg, #FEE2BE 0%, #E7C481 100%);
            box-shadow: 0px 0px 4px rgba(243, 212, 161, 0.5);
            border-radius: 50%;
        }
        .item{
            width: 3px; 
            height: 1em;
            margin-right: 8px;

            background: linear-gradient(90deg, #FEE2BE 0%, #FCCC7E 38.54%, #E7C481 100%);
            box-shadow: 0px 0px 4px rgba(243, 212, 161, 0.5);
            border-radius: 4px;
            
        }
        .title{
            font-weight: 600;
            font-size: 16px;
            line-height: 18px;

        }
    }
    .block{
        margin: 0 115px;
        // height: 204px;
        padding:20px;
        
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
    
    .product {
        .el-image{
            // cursor: pointer;
            width: 164px;
            height: 164px;
            border-radius: 8px;
        }
        .info{
            margin-left:20px;
            width: 327px;
        }
        .title-tag{
            height: 66px;
        }
        .title {
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            // height: 40px;
        }
        .tag-row {
            padding-top:6px;
            span {
                display: inline-block;
                padding: 4px 8px;
                font-size: 12px;
                line-height: 12px;
                background: #666666;
                border-radius: 2px;
            }
        }
        .data1 {
            padding-top:12px;
            font-size: 12px;
            line-height: 20px;
            color: #999999;
            .price1 {
                font-weight: 600;
                font-size: 12px;
                line-height: 20px;
                color: #E84A58;
                span{
                    font-size: 16px;
                }
            }
            .price2 {
                font-size: 12px;
                line-height: 20px;
                text-decoration-line: line-through;
                color: #999999;
                margin-right: 17px;
            }
            .com-label {
            }
            .com-val {
                margin-left: 4px;
                font-weight: 600;
                color: #E84A58;
                margin-right: 17px;
            }
            .volume-label {
            }
            .volume-val {
                font-weight: 500;
            }
        }
        .data2 {
            margin-top: 23px;
            .item{

            }
            .val{
                font-weight: bold;
                font-size: 21px;
                line-height: 21px;
            }
            .label{
                margin-top: 6px;
                font-weight: normal;
                font-size: 12px;
                line-height: 12px;
                color: #999999;
            }
        }
        
    }
</style>