<template>
    <div class="component-item">
        <div class="item-wrap">
            <div class="title-row flex-layout frow justify-start align-center">
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
                            :src="require('@/assets/img/animation/guoba.jpg')"
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
    </div>
</template>

<script>
    /* message */

    export default {
        name: "item",
        props:{
            index:{type:Number,default:0,},
        },
        data () {
            return {
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-item{
        
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