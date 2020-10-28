<template>
<div class="component-dicom2d-layout" :style="compStyle">
    <template v-for="r in range(row)">
        <template v-for="c in range(col)">
            <div :class="`r${r}_c${c}`">
                <slot :name="`r${r}_c${c}`"/>
            </div>
        </template>
    </template>
</div>
</template>

<script>
/* message */

export default {
    name: "dicom2d-layout",
    props:{
        row:{type:Number,default:1,},
        col:{type:Number,default:2,},
    },
    data () {
        return {
        };
    },
    computed:{
        compStyle(){
            return this.gridStyle(this.col,this.row)
        },
    },
    methods:{
        gridStyle(col,row){
            return {
                display: 'grid',
                'grid-template-columns':' 1fr'.repeat(col),
                'grid-template-rows':' 1fr'.repeat(row),//.class1 .class2
            }
        },
        range(n){
            return Array.from({length:n},(v,i)=>i)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dicom2d-layout{
    >*{
        min-width: 0;
        min-height: 0;
    }
}
</style>