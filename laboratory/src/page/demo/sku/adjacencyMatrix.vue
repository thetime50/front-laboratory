<template>
    <div class="component-adjacency-matrix">
        <h3>纯邻接矩阵解法</h3>
        <!-- <category-form  :category="category" :validArr="validArr" @change="updataValid"/> -->
        <div>
            {{validArr}}
        </div>
        <el-form size="mini">
            <template v-for="(citem,cindex) in category">
                <el-form-item :label="citem.title">
                    <el-radio-group :value="sel[cindex]">
                        <template v-for="(oitem,oindex) in citem.opt">
                            <el-radio-button :label="oindex"
                                :disabled="!(sel[cindex] == oindex) && !validArr[mxOffset[cindex] + oindex]"
                                @click.native="selClick(
                                    $event,
                                    cindex,
                                    oindex,
                                    !(sel[cindex] == oindex) && !validArr[mxOffset[cindex] + oindex]
                                )"
                            >
                                {{oitem.label}} 
                                <!-- {{mxOffset[cindex] + oindex}}
                                {{validArr[mxOffset[cindex] + oindex]}} -->
                            </el-radio-button>
                        </template>
                    </el-radio-group>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
    /* message */

    export default {
        name: "adjacency-matrix",
        props:{
            category:{type:Array,required:true,},
        },
        data () {
            
            let amLength = this.category.reduce((t,v,i,a)=>{
                    return t+v.opt.length
                },0)
            return {
                sel:this.category.map(v=>null),
                
                inveArr:[],
                adjacencyMatrix:[],
                validArr:Array.from({length:amLength},()=> true) ,
            };
        },
        computed: {
            mxOffset(){
                let sum = 0 
                return this.category.map((v)=>{
                    let res = sum
                    sum += v.opt.length
                    return res
                })
            },
            amLength(){
                return this.category.reduce((t,v,i,a)=>{
                    return t+v.opt.length
                },0)
            },
        },
        methods: {
            path2matrixIndex (ipath){ // 将多维数组索引转换为矩阵节点索引
                return ipath.map((v,i)=>{
                    return v + this.mxOffset[i]
                })
            },
            setInveArr(val){
                this.inveArr = val
                this.adjacencyMatrixInit()
                this.updataValid()
            },
            adjacencyMatrixInit(){
                // let lens = this.category.map((v,i,a)=>{
                //     return v.opt.length
                // })
                
                // const generateArr = (dimension,current=0,fill=0)=>{
                //     if(current == dimension.length-1 ){
                //         return Array(dimension[current]).fill(fill)
                //     }
                //     return Array.from({length:dimension[current]},v => generateArr(dimension,current+1,fill))
                // }

                // const adjacencyMatrix = generateArr(lens,)
                
                const adjacencyMatrix = Array.from({length:this.amLength},(v,i)=>{
                    return Array.from({length:this.amLength},v=> 0)
                })

                const getArrBoth = (arr) =>{
                    let res = []
                    if(arr.length<2){
                        return res
                    }
                    for(let i =0 ; i<arr.length-1; i++){
                        for(let j=i+1; j<arr.length; j++){
                            res.push([
                                arr[i],
                                arr[j],
                            ])
                        }
                    }
                    return res
                }

                this.inveArr.forEach((v,i,a)=>{
                    if(v.sel){
                        const mi = this.path2matrixIndex(v.ipath)
                        const both = getArrBoth(mi)
                        both.forEach(v=>{
                            adjacencyMatrix[v[0]][v[1]] = true
                            adjacencyMatrix[v[1]][v[0]] = true
                        })
                    }
                    
                })
                this.adjacencyMatrix = adjacencyMatrix
                console.log(`adjacencyMatrix`, adjacencyMatrix)
            },

            selClick($event,cate,opt,disabled){
                if($event.srcElement.localName !==  "input"){
                    return
                }
                if(disabled){
                    return
                }
                if(this.sel[cate] === opt){
                    this.sel[cate] = null
                }else{
                    this.sel[cate] = opt
                }
                $event.srcElement.value = opt
                // console.log(selClick,[...this.sel],cate,opt)
                this.updataValid()
            },

            updataValid(){
                const sel = this.sel
                console.log(`sel`, [...sel])
                //updataValid
                let res = Array.from({length:this.amLength},()=> true) 
                sel.forEach((v,i)=>{
                    if(typeof(v) == 'number'){
                        let matrixIndex = v+this.mxOffset[i]
                        let currentMap = this.adjacencyMatrix[matrixIndex]
                        res = res.map((v,i,a)=>{
                            return v && currentMap[i]
                        })
                    }
                })
                this.validArr = res
                console.log('validArr',this.validArr)
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-adjacency-matrix{
        
    }
    .el-form{
        
        text-align: left;
        margin: 0 80px;
    }
</style>