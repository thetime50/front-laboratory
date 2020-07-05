<template>
<div class="component-action-button">
    <i :class="selected?'el-icon-arrow-left':'el-icon-search'" @click="handleClick"/>
</div>
</template>

<script>
/* message */
import { mapState, mapMutations } from 'vuex'

export default {
    name: "action-button",
    data () {
        return {
        };
    },
    computed:{
        ...mapState(['selected'])
    },
    methods:{
        ...mapMutations(['unselectFeed']),
        handleClick(){
            if(this.selected){
                this.unselectFeed()
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-action-button{
    position: fixed;
    left: 30px;
    top: 32px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-color: $theme-primary;
    color: #fff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

    font-size: 20px;
}
</style>