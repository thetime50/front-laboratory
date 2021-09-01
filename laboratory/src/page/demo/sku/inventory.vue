<template>
    <div class="component-inventory flex-layout frow">
        <!-- <template v-for="(row,rindex) in categoryArr">
            <el-radio-group size="mini">
                <template v-for="(col,cindex) in categoryArr">
                    <el-radio-button :label="rindex-cindex"></el-radio-button>
                </template>
            </el-radio-group>
        </template> -->
        <div class="flex-auto flex-layout frow">
            <template v-for="c in col">
                <ul class="flex-mean">
                    <template v-for="item in inveArr.slice((c-1)*row , c*row)">
                        <li :title="item.unit | unitText">
                            <el-checkbox v-model="item.sel" @change="selChange">{{item.unit | unitShow}}</el-checkbox>
                        </li>
                    </template>
                </ul>
            </template>
        </div>
        <div class="selected flex-none flex-layout">
            <div class="info-row flex-none flex-layout frow align-center">
                <span class="flex-auto">
                    selected: {{selected.length}}
                    <template v-if="change">
                        * 
                    </template>
                </span>
                <div>
                    <el-button v-if="change" type="primary" @click="confirm" size="mini">确定</el-button>
                    <el-button v-if="selected.length < inveArr.length" type="primary" @click="selAll" size="mini">全选</el-button>
                    <el-button v-else type="primary" @click="selClean" size="mini">清空</el-button>
                </div>
            </div>
            <pre class="flex-auto scroll-all"><template v-for="s in selected">{{s.unit | unitText}}{{'\n'}}</template></pre>
        </div>
    </div>
</template>

<script>
    import {cloneDeep} from 'lodash'
    /* message */

    export default {
        name: "inventory",
        props:{
            category:{type:Array,required:true,}, // 默认拿第一维做表头
        },
        data () {
            return {
                inveArr:[],
                change:true,
            };
        },
        created () {
            const generateArr = (dimension,current=0,ipath=[],sel=[])=>{
                if(current == dimension.length-1 ){
                    return dimension[current].opt.reduce((t,v,i,a)=>{
                        let ripath = ipath.concat()
                        ripath.push(i)
                        let res = sel.concat()
                        // 添加末端路径
                        res.push({
                            title:dimension[current].title,
                            cate:dimension[current].cate,
                            ...v
                        })
                        // 产生的一块的数据
                        return t.concat({
                            ipath:ripath,
                            unit:res,
                            sel:true,
                        })
                    },[])
                }
                return dimension[current].opt.reduce((t,v,i,a)=>{
                    let ripath = ipath.concat()
                    ripath.push(i)
                    let res = sel.concat()
                    // 添加路径
                    res.push({
                        title:dimension[current].title,
                        cate:dimension[current].cate,
                        ...v
                    })
                    // 递归生成并且连接数据
                    return t.concat(
                        generateArr(dimension,current+1,ripath,res)
                    )
                },[])
            }
            this.inveArr = generateArr(this.category,0)

            // debug
            this.inveArr.slice(12*3,12*4).forEach(v=>{
                v.sel = false
            })
            this.$nextTick(()=>{
                this.confirm()
            })
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
            col(){
                return this.category[0].opt.length
            },
            row(){
                return this.inveArr.length/(this.col || 1)
            },
            selected(){
                return this.inveArr.filter(v=>v.sel)
            },
        },
        filters:{
            unitShow(unit){
                return unit.map(v=>{
                    return `${v.cate}:${v.value}`
                }).join(' ')
            },
            unitText(unit){
                return unit.map(v=>{
                    // return `${v.title}:${v.label}`
                    return `${v.cate}:${v.label}`
                }).join('  ')
            },
        },
        methods: {
            selChange(){
                this.change =true
            },
            confirm(){
                this.change = false
                this.$emit('confirm',cloneDeep(this.inveArr))
            },
            selAll(){
                this.change =true
                this.inveArr.forEach(v=>{
                    v.sel=true
                })
            },
            selClean(){
                this.change =true
                this.inveArr.forEach(v=>{
                    v.sel=false
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-inventory{
        margin-top: 20px;
        text-align: left;
        height: 221px;
        padding:0 20px;
    }
    ul{
        margin:0;
        padding-left: 10px;
    }
    li{
        list-style-type: none;
    }
    .selected{
        width:300px
    }
</style>