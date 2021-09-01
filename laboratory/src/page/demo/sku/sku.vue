<template>
    <div class="component-sku">
        <inventory :category="category"/>
    </div>
</template>

<script>
    /* message */
    /* 数据以index为准，展示时要转为label或value */
    import inventory from './inventory.vue'
    export default {
        name: "sku",
        components: {
            inventory,
        },
        data () {
            return {
                category:[
                    { 
                        title:"尺寸" ,
                        cate:'s',
                        opt:[
                            {label:'m',value:1},
                            {label:'l',value:2},
                            {label:'xl',value:3},
                            {label:'xxl',value:4},
                            {label:'xxxl',value:5},
                        ]
                    },
                    { 
                        title:"颜色" ,
                        cate:'c',
                        opt:[
                            {label:'风信蓝',value:1},
                            {label:'卡其色',value:2},
                            {label:'樱花粉',value:3},
                            // {label:'薄荷绿',value:4},
                            // {label:'柠檬黄',value:5},
                        ]
                    },
                    { 
                        title:"图案" ,
                        cate:'p', // pattern
                        opt:[
                            {label:'纯色',value:1},
                            {label:'皮卡丘',value:2},
                            {label:'水箭龟',value:3},
                            {label:'怪猎',value:4},
                        ]
                    }
                ],
            };
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-sku{
        
    }
</style>