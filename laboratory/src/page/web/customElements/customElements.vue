<template>
    <div class="component-custom-elements">
        custom-elements <br>
        <a href="../html/custom-element.html">custom-element demo</a> <br>
        todo https://gitee.com/jimixy/vue-custom-element ??

        <div>
            <h3>demo</h3>
            <label for="cvc">Enter your CVC <popup-info :img="require('@/assets/alt.png')"
                    data-text="Your card validation code (CVC) is an extra security feature — it is the last 3 or 4 numbers on the back of your card."
                    a="1" b="2">
                </popup-info></label>
        </div>
        
    </div>
</template>

<script>
    /* message */
    // MDN 使用 custom elements https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements
    export default {
        name: "custom-elements",
        data () {
            return {
            };
        },
        created () {
            console.log('created')
            this.checkAndDefine()
        },
        methods: {
            async checkAndDefine(){
                if(customElements.get('popup-info')){
                    console.log(1,customElements,2,customElements.get('popup-info'),3,await customElements.whenDefined('popup-info'))
                    return
                }

                // Create a class for the element
                class PopUpInfo extends HTMLElement {
                    // Specify observed attributes so that
                    // attributeChangedCallback will work
                    static get observedAttributes() {
                        return ['a', 'b'];
                    }
                    constructor() {
                        // Always call super first in constructor
                        super();

                        // Create a shadow root
                        const shadow = this.attachShadow({ mode: 'open' });

                        const text = this.getAttribute('data-text');
                        console.log('text',text,this.getAttributeNames()) // 为什么这里的text是null
                        let imgUrl;
                        if (this.hasAttribute('img')) {
                            imgUrl = this.getAttribute('img');
                        } else {
                            imgUrl = require('@/assets/default.png');
                        }
                        shadow.innerHTML =
                            `
    <style>
        .wrapper {
        position: relative;
        }
        .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
        }
        img {
        width: 1.2rem;
        }
        .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
        }
    </style>
    <span class="wrapper">
        <span class="icon">
            <img src=${imgUrl} />
        </span>
        <span class="info">${text}</span>
    </span>
        `
                    }

                    /**
                     * - connectedCallback：当 custom element首次被插入文档DOM时，被调用。
                     * - disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
                     * - adoptedCallback：当 custom element被移动到新的文档时，被调用。
                     * - attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
                     * 
                     * 
                    */

                    connectedCallback() {
                        console.log(`connectedCallback`)
                    }
                    disconnectedCallback() {
                        console.log(`disconnectedCallback`)
                    }
                    adoptedCallback() {
                        console.log(`adoptedCallback`)
                    }
                    attributeChangedCallback(name, oldValue, newValue) {
                        console.log(`attributeChangedCallback`, 'name', name, 'oldValue', oldValue, 'newValue', newValue)
                    }
                }
                // Define the new element
                customElements.define('popup-info', PopUpInfo);
                console.log(1,customElements,2,customElements.get('popup-info'),3,await customElements.whenDefined('popup-info'))

            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-custom-elements{
        
    }
</style>