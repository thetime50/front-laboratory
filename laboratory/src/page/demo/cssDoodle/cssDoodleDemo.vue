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
            <css-doodle click-to-update>
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
            <h2>属性 Attributes</h2>
            <h3 id="attr-grid">grid属性</h3>
            <pre>{{preStr.grid}}</pre>
            <div class="flex-layout frow justify-around">
                <css-doodle grid="5">
                    :doodle {
                        grid-gap: 1px;
                        width: 8em; height: 8em;
                    }
                    background: #60569e;
                </css-doodle>
                <!-- 混合使用 属性 style测试 -->
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
                <css-doodle>
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
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        overflow: hidden;
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
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        overflow: hidden;
                        @grid: 5;
                        @size: 8em;
                        background: #9e6056;
                    }
                    :container {
                        grid-gap: 1px;
                        transform: rotate(45deg)  scale(2);
                    }
                </css-doodle>
                <css-doodle>
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        @size: 8em;
                        grid-gap: 1px;
                        background: #9e6056;
                    }
                </css-doodle>
            </div>
            <div class="flex-layout frow justify-around" style="margin-top:100px;" 
                ref="container"
                @mouseenter="containerMouseenter"
                @mouseleave="containerMouseleave">
                <css-doodle class="cr45" use="var(--cr45)">
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        background: #9e6056;
                    }
                    :container {
                        @size: 8em;
                        grid-gap: 1px;
                        <!-- transform: rotate(45deg)  scale(2); -->
                    }
                </css-doodle>
                
                <css-doodle class="cr45" use="var(--cr45)">
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        @size: 8em;
                        background: #9e6056;
                    }
                    :container {
                        grid-gap: 1px;
                        <!-- transform: rotate(45deg)  scale(2); -->
                    }
                </css-doodle>
                <css-doodle>
                    background: rgba(96, 86, 158,0.6);
                    :doodle {
                        <!-- overflow: hidden; -->
                        @grid: 5;
                        @size: 8em;
                        grid-gap: 1px;
                        background: #9e6056;
                    }
                </css-doodle>
            </div>
            <h3 class="nth">@nth</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" use="var(--grid5g)"
                    click-to-update
                    v-html="preStr['@nth']">
                </css-doodle>
                
            </div>
            <h3>@even</h3>
            <div class="flex-layout frow justify-around">
                <!-- 可以更新 -->
                <css-doodle class="dgrid" use="var(--grid5g)" 
                    click-to-update
                    v-html="preStr['@even']">
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid4g)" 
                    click-to-update
                    v-html="preStr['@even(cross)']">
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid4g)" 
                    click-to-update
                    v-html="preStr['@nth(even)']">
                </css-doodle>
            </div>
            <h3>@odd</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @odd {
                        :after {
                            content: @index;
                            color: #fff;
                        }
                        background: #60569e;
                    }
                </css-doodle>
            </div>
            <h3>@at</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid square200" use="var(--grid5g)">
                    @at(2,3) {
                        :after {
                            content: @index;
                            color: #fff;
                        }
                        background: #60569e;
                    }
                    @at(4,5) {
                        :after {
                            content: @col, @row;
                            color: #fff;
                        }
                        background: #60569e;
                    }
                </css-doodle>
            </div>
            <h3>@random</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" use="var(--grid5g)" click-to-update>
                    @random {
                        background: #60569e;
                    }
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid5g)" click-to-update>
                    @random(0.2) {
                        background: #60569e;
                    }
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid5g)" click-to-update>
                    :doodle { <!-- 刷优先级-->
                        grid-gap: 0px;
                    }
                    @random { border-top: 1px solid #60569e; }
                    @random { border-left: 1px solid #60569e; }
                    @random(.2) {
                        :after {
                            content: '';
                            background: hsl(@rand(360), 60%, 70%); <!-- 色相 饱和度 明度 -->
                            @size: @rand(8px);
                        }
                    }
                </css-doodle>
            </div>
            <h3>@row</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @row(3) {
                        background: #60569e;
                    }
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @row(even) {
                        background: #60569e;
                    }
                </css-doodle>
            </div>
            <h3>@col</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @col(3) {
                        background: #60569e;
                    }
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @col(odd) {
                        background: #60569e;
                    }
                </css-doodle>
                <css-doodle class="dgrid" use="var(--grid5g)">
                    @col(3n-2) {
                        background: #60569e;
                    }
                </css-doodle>
            </div>


            <h2>属性 Properties</h2>
            <h3>@grid</h3>
            <div>
                <a href="#attr-grid">Attributes grid属性</a>
            </div>
            <h3>@use</h3>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid" >
                    @use: var(--grid5);
                </css-doodle>
                <css-doodle class="dgrid" >
                    @use: var(--rule-a), var(--rule-b);
                    /* or */
                    <!-- @use: var(--rule-a);
                    @use: var(--rule-b); -->

                    /* more rules */
                    background-color: #60569e;
                </css-doodle>
            </div>
            <h3>@size</h3>
            <div>
                @size, @min-size, @max-size
            </div>
            <h3>@place-cell</h3>
            <div>
                相对定位 相当于absolute
            </div>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid"> <!--  use="var(--grid5g)" -->
                    @use: var(--grid5g);
                    opacity: 0.5;
                    <!-- 不知道这边的层叠顺序是怎么定的 -->
                    @nth(1) { @place-cell: 0 top; @use: var(--cell-sel);}
                    @nth(2) { @place-cell: right 25%; @use: var(--cell-sel);}
                    @nth(3) { @place-cell: center; @use: var(--cell-sel);}
                    @nth(4) { @place-cell: .8em calc(100% - .8em); @use: var(--cell-sel);}
                    @nth(5) { @place-cell: 75% 80%; @use: var(--cell-sel);}
                </css-doodle>
            </div>
            <h3>@shape</h3>
            <div>
                有一些内置的图形
            </div>
            <div class="flex-layout frow justify-around">
                <css-doodle class="dgrid">
                    :doodle {
                        @grid: 7 / 8em;
                        @shape: circle;
                    }
                    @even {
                        @shape: hypocycloid 4;
                        background: #60569e;
                        transform: scale(2) rotate(-60deg);
                    }
                </css-doodle>
            </div>

            <div>
                todo<br>  
                <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions">css函数</a><br>  
                <a href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/filter">svg filter</a><br>  

            </div>
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
        methods: {
            containerMouseenter(e){
                console.log('container update')
                this.$nextTick(async()=>{
                    let children = Array.from( this.$refs.container.children)
                    children.forEach((ch)=>{
                        ch.update()
                    })


                    // let result = await children[0].export({
                    //     scale: 6,
                    //     download: true
                    // });
                    // /* open Dev tools to see the result */
                    // console.log(result);
                })
            },
             containerMouseleave(e){
                console.log('container update')
                this.$nextTick(async ()=>{
                    let children = Array.from( this.$refs.container.children)
                    children.forEach((ch)=>{
                        ch.update()
                        console.dir(ch)
                    })


                    // let result = await children[0].export({
                    //     scale: 6,
                    //     download: true
                    // });
                    // /* open Dev tools to see the result */
                    // console.log(result);
                })
                
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /**
     * cssdoodle样式不支持 @intervolga\optimize-cssnano-plugin 插件 build会报错
     * 所以doodle样式配置通过 index.html link 引入
     * public\css\cssDoodleDemo.css
     */
    
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
        css-doodle {
            width: 100px;
            height: 100px;
        }
        .square200 {
            width: 200px;
            height: 200px;
        }
    }
    h3.nth{
        margin-top: 180px;
    }
</style>
