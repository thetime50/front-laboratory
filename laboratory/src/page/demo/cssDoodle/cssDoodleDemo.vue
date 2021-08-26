<template>
    <div class="component-css-doodle-demo">
        <h2>css-doodle</h2>
        <div class="info">
            <a href="https://css-doodle.com/">css-doodle</a>
            使用 CSS 绘制图案的 Web 组件 <br>
            &lt;css-doodle /&gt; 基于 
            <a href="https://developers.google.com/web/fundamentals/web-components/shadowdom">Shadow DOM v1</a>
            和 
            <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements">Custom Elements v1</a>
            <br>

            <a href="https://marketplace.visualstudio.com/items?itemName=kummy.vscode-css-doodle">vscode-css-doodle</a>
        </div>

        <div class="demo-wrap flex-layout">
            <css-doodle>
                @grid: 14 / 80%; /* 可以注释吗 */

                @random {
                border-left: 1px solid #5d81bc;
                }
                @random {
                border-top: 1px solid #5d81bc;
                }
                @random(.25) {
                background: linear-gradient(
                    @p(#fff, tan, #5d81bc), @lp
                )
                50% / @r(60%) @lr
                no-repeat;
                }
                @random {
                filter: drop-shadow(0 0 10px #fff);
                }
            </css-doodle>
        </div>
        <div class="prop-wrap">
            <h2>属性</h2>
            <h3>grid属性</h3>
            <pre>{{preStr.grid}}</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle grid="5">
                    :doodle {
                        grid-gap: 1px;
                        width: 8em; height: 8em;
                    }
                    background: #60569e;
                </css-doodle>
                <!-- <css-doodle grid="1x5" class="a" use="var(--rule)">
                </css-doodle> -->
                <css-doodle grid="1x5">
                    :doodle {
                        grid-row-gap: 1px;
                        @size: 8em;
                    }
                    background: #60569e;
                    width: @rand(5%, 100%);
                </css-doodle>
                <!-- 注释放在里面会有问题 样式解析支持注释 模板解析不支持注释 -->
                <!-- 好像可以用html注释 -->
                <!-- @size: 8em; /* width: 8em; height: 8em; */ -->
                <!-- width: @rand(5%, 100%); /* from 5% to 100% by random */ -->
            </div>
            <h3>use</h3>
            <pre>{{preStr.use}}</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle class="use" use="var(--rule)"></css-doodle>
            </div>
            <h3>seed</h3>
            <pre>seed不支持在样式模板中定义</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle seed="2020" click-to-update>
                    :doodle {
                        @grid: 5 / 8em;
                    }
                    background: #60569e;
                    transform: scale(@rand(.2, .9));
                </css-doodle>
                <css-doodle  click-to-update>
                    :doodle {
                        @seed:2020;
                        @grid: 5 / 8em;
                    }
                    background: #60569e;
                    transform: scale(@rand(.2, .9));
                </css-doodle>
            </div>

            <!-- Selectors 选择器 -->
            <h2>Selectors 选择器</h2>
            <h3>:doodle</h3>
            <pre>选择shdow dom 根元素 hover this ↓</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle class="-doodle">
                    :doodle {
                        @grid:4;
                        grid-gap: 1px;
                        width: 8em; height: 8em;
                    }
                    background: #60569e;
                    
                    :doodle { --s: 0 }
                    :doodle(:hover) { --s: 1 }

                    transition: .5s cubic-bezier(.175, .885, .32, 1.275);
                    transition-delay: @rand(500ms);
                    transform: translateY(calc(var(--s) * 100%));
                </css-doodle>
                <!-- 
                     :doodle { --s: 0 } /* 在根元素中插入定义 */
                    :doodle(:hover) { --s: 1 } /* 在根元素中插入定义 */
                 -->
            </div>

            <h3>:container</h3>
            <pre>容器属性 感觉像对当前容器的一个拷贝额加工 会继承所属元素的属性</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle>
                    background: rgba(96, 86, 158,0.3);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        background: #9e6056;
                    }
                    :container {
                        @size: 8em;
                        grid-gap: 1px;
                        transform: rotate(45deg)  scale(2);
                    }
                </css-doodle>
                
                <css-doodle>
                    background: rgba(96, 86, 158,0.3);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        @size: 8em;
                        background: #9e6056;
                    }
                    :container {
                        grid-gap: 1px;
                        transform: rotate(45deg)  scale(2);
                    }
                </css-doodle>
            </div>
            <h3>@nth</h3>
            <h3>@even</h3>
            <h3>@odd</h3>
            <h3>@at</h3>
            <h3>@random</h3>
            <h3>@row</h3>
            <h3>@col</h3>
        </div>
    </div>
</template>

<script>
    /* message */
    import {preStr} from './cssDoodleDemo.js'

    export default {
        name: "css-doodle-demo", // 这里不能重名
        data () {
            return {
                preStr,
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-css-doodle-demo{

    }
    h2{
        margin-top: 80px;
    }
    h3{
        margin-top: 35px;
    }
    css-doodle{
        width: 300px;
        height: 300px;
        margin:auto;
    }
    pre{
        text-align: left;
        width: 1000px;
        margin:auto;
    }
    .prop-wrap{
        css-doodle{
            width: 100px;
            height: 100px;
        }
    }
</style>
<style lang="css" scoped>
        /*不能在scss中使用*/
        css-doodle.use /deep/ {  
            --rule: (
                @grid: 5 / 8em;
                --d: @p(45deg, -45deg, 135deg, -135deg);/* 注释测试 */
                --lg: linear-gradient(@var(--d),#60569e 50%,transparent 0); /* 注释测试 */
                background:
                    @var(--lg) 0 0 / 100% 100%,
                    @var(--lg) 0 0 / 50% 50%;
            );
        }
        .a /deep/{
            --rule: (
                :doodle {
                    grid-row-gap: 1px;
                    @size: 8em; /* width: 8em; height: 8em; */
                }
                background: #60569e;
                width: @rand(5%, 100%); /* from 5% to 100% by random */
            )
        }


</style>