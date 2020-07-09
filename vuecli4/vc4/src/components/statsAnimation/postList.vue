<template>
<div class="component-post-list">
    <ul>
        <li v-for="(post,i) in posts"
            :key="post.id"
            :style="{ animationDelay: `${i*100 + 500}ms` }">
            
            <post :post="post" />
        </li>
    </ul>
</div>
</template>

<script>
/* message */
import post from "./post.vue"

export default {
    name: "post-list",
    components:{
        post,
    },
    props:{
        posts:{type:Array,required:true,},
    },
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-post-list{
    > ul > li {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
        animation: rise 0.6s ease;
        animation-fill-mode: forwards;
    }
}
</style>