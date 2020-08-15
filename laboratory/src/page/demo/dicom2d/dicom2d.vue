<template>
<dicom2dLayout class="component-dicom2d"
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
.component-dicom2d{
    
}
</style>