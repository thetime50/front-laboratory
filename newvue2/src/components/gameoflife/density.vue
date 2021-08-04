<template>
<div class="component-density">

    <react-chart
        ref="cht"
        :data="data"
        :config="config"
        :data_format="dataFormat"
    />
</div>
</template>

<script>
/* message */
import reactChart from "@/components/common/reactChart.vue"
export default {
    name: "density",
    components:{
        reactChart,
    },
    props:{
        data:{type:Array,default:()=>[],},
    },
    data () {
        return {
            config:{
                tooltip: {},
                visualMap: {
                    max: 8,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                xAxis3D: {
                    type: 'category',
                    data: [],
                },
                yAxis3D: {
                    type: 'category',
                    data: [],
                },
                zAxis3D: {
                    type: 'value'
                },
                grid3D: {
                    boxWidth: 200,
                    boxDepth: 80,
                    light: {
                        main: {
                            intensity: 1.2
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    }
                },
                series: [{
                    type: 'bar3D',
                    data: [],
                    shading: 'color',

                    label: {
                        show: false,
                        textStyle: {
                            fontSize: 16,
                            borderWidth: 1
                        }
                    },
                    
                    itemStyle: {
                        opacity: 0.4
                    },

                    emphasis: {
                        label: {
                            textStyle: {
                                fontSize: 20,
                                color: '#900'
                            }
                        },
                        itemStyle: {
                            color: '#900'
                        }
                    }
                }]
            }
        };
    },
    methods:{
        dataFormat(config, data, rcmeth) {
            let objSelf = this;
            let sdata = []
            data.forEach((v1,i1)=>{
                v1.forEach((v2,i2)=>{
                    sdata.push([i1,i2,v2])
                })
            })
            config.series[0].data = sdata
            config.xAxis3D.data = data.map((v,i)=> i+'p')
            config.yAxis3D.data = data[0].map((v,i)=> i+'p')

            let w=data.length, h=data[0].length
            let proportion = Math.min(100/w,100/h)*1.8

            config.grid3D.boxHeight=30//50
            config.grid3D.boxWidth = w*proportion
            config.grid3D.boxDepth = h*proportion
            return //{clear: true};
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-density{
}
</style>