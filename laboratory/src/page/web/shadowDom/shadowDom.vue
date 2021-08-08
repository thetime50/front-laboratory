<template>
    <div class="component-shadow-dom">
        shadow-dom
        <div ref="sw"></div>
    </div>
</template>

<script>
    /* message */

/** 
 * createShadowRoot // 不推荐使用此方法，而使用attachShadow()。 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/createShadowRoot
 * importNode // 拷贝节点 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/importNode
 * attachShadow
 * shadowRoot
 * 
*/

const elContent = `
<p>
<span class="red">hello</span> world
</p>
<p>
hello <span class="blue"> shadown dom </span>
</p>
`
const styleContent = `
.red{
    color:#f99;
}
`

    export default {
        name: "shadow-dom",
        data () {
            return {
            };
        },
        mounted () {
            this.$nextTick(()=>{
                this.init()
            })
        },
        methods: {
            init(){
                // this.CS_init_1()
                // this.CS_init_2()
                this.AS_init()
            },
            // 影子节点ShadowDOM https://juejin.cn/post/6844903506801852429
            CSR_init_1(){createShadowRoot
                const host = this.$refs.sw
                console.log(host.createShadowRoot )
                let root = host.createShadowRoot() // 已经不支持的api
                root.textContent = elContent
                // 
            },
            CSR_init_2(){createShadowRoot
                var host = this.$refs.sw;
                var root = host.createShadowRoot();
                var template = document.querySelector('.pokemon-template');
                root.appendChild(document.importNode(template.content, true)); 
            },
            // MDN Using_shadow_DOM https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM
            AS_init(){ // attachShadow
                var el = this.$refs.sw;
                let shadow = el.attachShadow({mode: 'open'}); // mode:open 外部可以通过js获取到ShadowDom 如el.shadowRoot
                let para = document.createElement('p');
                para.innerHTML='hello <span class="red">shadom dom<span>'
                shadow.appendChild(document.importNode(para,true) )
                shadow.appendChild(document.importNode(para,true))// 为 shadow DOM 添加一些 CSS 样式
                
                var style = document.createElement('style');
                style.textContent = styleContent
                shadow.appendChild(document.importNode(style,true) )

                // 引入外部样式
                // const linkElem = document.createElement('link');
                // linkElem.setAttribute('rel', 'stylesheet');
                // linkElem.setAttribute('href', 'style.css');

                // // 将所创建的元素添加到 Shadow DOM 上

                // shadow.appendChild(linkElem);
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-shadow-dom{
        
    }
</style>