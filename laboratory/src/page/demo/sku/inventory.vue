<template>
    <div class="component-inventory">
        inventory
        <!-- <template v-for="(row,rindex) in categoryArr">
            <el-radio-group size="mini">
                <template v-for="(col,cindex) in categoryArr">
                    <el-radio-button :label="rindex-cindex"></el-radio-button>
                </template>
            </el-radio-group>
        </template> -->
    </div>
</template>

<script>
    /* message */

    export default {
        name: "inventory",
        props:{
            category:{type:Array,required:true,}, // 默认拿第一维做表头
        },
        data () {
            return {
                inveArr:[]
            };
        },
        created () {
            // let lens = this.category.map((v,i,a)=>{
            //     return v.opt.length
            // })
            
            // const generateArr = (dimension,current=0,fill=0)=>{
            //     if(current == dimension.length-1 ){
            //         return Array(dimension[current]).fill(fill)
            //     }
            //     return Array.from({length:dimension[current]},v => generateArr(dimension,current+1,fill))
            // }

            // this.inveArr = generateArr(lens,0,1)
            const generateArr = (dimension,current=0,sel=[])=>{
                if(current == dimension.length-1 ){
                    return dimension[current].opt.reduce((t,v,i,a)=>{
                        let res = sel.concat()
                        res.push({
                            title:dimension[current].title,
                            cate:dimension[current].cate,
                            ...v
                        })
                        return t.concat([res])
                    },[])
                }
                return dimension[current].opt.reduce((t,v,i,a)=>{
                    let res = sel.concat()
                    res.push({
                        title:dimension[current].title,
                        cate:dimension[current].cate,
                        ...v
                    })
                    return t.concat(
                        generateArr(dimension,current+1,res)
                    )
                },[])
            }
            this.inveArr = generateArr(this.category,0)
            console.log(this.inveArr)
        },
        computed: {
            // categoryArr(){
            //     return category.reduce((t,v,i,a)=>{
            //         return t.concat(v.opt.map((v,i,a)=>{
            //             return {
            //                 title:t.title,
            //                 cate:t.cate,
            //                 ...v,
            //             }
            //         }))
            //     },[])
            // },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-inventory{
        
    }
</style>