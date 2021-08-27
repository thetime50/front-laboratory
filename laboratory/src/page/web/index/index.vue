<template>
    <div class="component-web-index">
        <ul>
            <li>
                custom-element &nbsp;&nbsp;&nbsp; 
                <a href="https://thetime50.github.io/front-laboratory/html/custom-element">github.io</a>  &nbsp;&nbsp;&nbsp; 
                <a href="http://thetime50.com/front-laboratory/html/custom-element">thetime50.com</a> 
            </li>
            <li>
                shadow-dom &nbsp;&nbsp;&nbsp; 
                <router-link to="./shadow-dom"> shadow-dom </router-link> &nbsp;&nbsp;&nbsp; 
                <a href="https://thetime50.github.io/front-laboratory/html/shadow-dom">github.io</a>  &nbsp;&nbsp;&nbsp; 
                <a href="http://thetime50.com/front-laboratory/html/shadow-dom">thetime50.com</a> 
            </li>
            <li>
                web-components &nbsp;&nbsp;&nbsp; 
                <a href="https://thetime50.github.io/front-laboratory/html/web-components">github.io</a>  &nbsp;&nbsp;&nbsp; 
                <a href="http://thetime50.com/front-laboratory/html/web-components">thetime50.com</a>
            </li>
        </ul>
    </div>
</template>

<script>
    /* message */

    export default {
        name: "web-index",
        data () {
            return {
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-web-index{
        text-align: left;
        font-size: 20px;
        ul{
            margin-left: auto;
            margin-right: auto;
            width:600px;
        }
    }
</style>