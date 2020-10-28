<template>
<div class="component-dicom2d">
    <dicom2dLayout
        :row="row"
        :col="col">
        <template v-for="r in range(row)">
            <template v-for="c in range(col)">
                <template :slot="`r${r}_c${c}`">
                    <dummyCell>
                        {{`r${r}_c${c}`}}
                    </dummyCell>
                </template>
            </template>
        </template>
    </dicom2dLayout>
    <div class="bottom-bar">
        <!--  -->
    </div>
</div>
</template>

<script>
/* message */
import dicom2dLayout from "./dicom2dLayout.vue"
import dummyCell from "./dummyCell.vue"

export default {
    name: "dicom2d",
    components:{
        dicom2dLayout,
        dummyCell,
    },
    data () {
        return {
            row:2,
            col:3,
        };
    },
    methods:{
        range(n){
            return Array.from({length:n},(v,i)=>i)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$back:#424242;
.component-dicom2d{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;//.class1 .class2
    >*{
        min-width: 0;
        min-height: 0;
    }
    .bottom-bar{
        height: 120px;
        background-color: $back;
    }
}
</style>