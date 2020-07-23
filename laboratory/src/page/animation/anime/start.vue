<template>
<div class="component-start">
    <div class="item-row" v-for="(item,index) in elList">
        <div class="item"
            :style="{left:item.val+'px'}">
            {{item.val}}
        </div>
    </div>
</div>
</template>

<script>
/* message */
import anime from "animejs"

export default {
    name: "start",
    data () {
        return {
            elList:[
                {val:40},
                {val:80},
                {val:120},
            ]
        };
    },
    mounted(){
        this.$nextTick(()=>{
            anime({
                targets: this.elList,//from
                // delay: anime.stagger(100),//gap
                val:250,//to
                round: 1,//数组
                easing: 'easeInOutBack',//'easeInOutSine',//'linear',
                duration:1500,
                delay:300,
                endDelay:300,
                direction: 'alternate',
                loop: true,
                // update: function() {
                //     logEl.innerHTML = JSON.stringify(battery);
                // }
            });
        })
    },
    beforedestory(){
        anime.remove(this.elList)
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-start{
    position: relative;
    .item-row{
        border-radius: 10px;
        background-color: #fcc;
        margin: 2px auto;
        padding: 2px;
        width: 320px;
    }
    .item{
        position: relative;
        width: 30px;
        // left: 0;
        border-radius: 10px;
        background-color: #faa;
        color: #f66;
    }
}
</style>