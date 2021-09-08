<template>
    <div class="component-adjacency-matrix">
        <h3>纯邻接矩阵解法</h3>
        <!-- <category-form  :category="category" :validArr="validArr" @change="updataValid"/> -->
        <el-form>
            <el-form-item label="">
                <el-select v-model="validType" @change="updataValid">
                    <el-option value="all-sel" label="由所有的已选数据决定可选项"></el-option>
                    <el-option value="other-sel" label="由其他选项的已选数据决定可选项"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div>
            {{validArr}}
        </div>
        <div>
            应该是有问题的 如果所有品类里只有一个品类没货，选则这个品类其中两个标签，第三个选项中应该要有置灰的。<br>
            原因应该是生成矩阵时相当于用了或运算 <a href="https://codesandbox.io/s/sku-algorithm-forked-bdt6g?file=/src/redux/reducer/spec-reducer.ts">codesandbox.io</a>
        </div>
        <el-form class="category" size="mini">
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

                validType:'all-sel',
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
                let updateMap = {
                    "all-sel": this.updataValidFromAllSelected,
                    "other-sel": this.updataValidFromOtherSelected,
                }
                updateMap[this.validType]()
            },
            updataValidFromAllSelected(){
                const sel = this.sel
                console.log(`sel`, [...sel])
                //updataValid
                let res = Array.from({length:this.amLength},()=> true) 
                sel.forEach((sv,si)=>{
                    if(typeof(sv) == 'number'){
                        let matrixIndex = sv+this.mxOffset[si]
                        let currentMap = this.adjacencyMatrix[matrixIndex]
                        res = res.map((rv,ri,ra)=>{
                            return rv && currentMap[ri]
                        })
                    }
                })
                this.validArr = res
                console.log('FromAllSelected validArr',this.validArr)
            },
            updataValidFromOtherSelected(){
                const sel = this.sel
                //updataValid
                
                const arrOr = (arrs)=>{
                    if(arrs.length <=1){
                        return arrs[0]||[]
                    }
                    let len = arrs[0].length
                    let orRes = Array.from({length:len},()=> false) 
                    arrs.forEach((av,ai,aa)=>{
                        for(let i = 0;i<len; i++){
                            orRes[i] = orRes[i] || av[i]
                        }
                    })
                    return orRes
                }
                const arrAnd = (arrs)=>{
                    if(arrs.length <=1){
                        return arrs[0]||[]
                    }
                    let len = arrs[0].length
                    let andRes = Array.from({length:len},()=> true) 
                    arrs.forEach((av,ai,aa)=>{
                        for(let i = 0;i<len; i++){
                            andRes[i] = andRes[i] && av[i]
                        }
                    })
                    return andRes
                }
                const getCateValidArr = (cv,ci) => {
                    let gret = []
                    this.sel.forEach((sv,si,sa)=>{ // 矩阵x轴
                        if(ci != si){
                            let start = this.mxOffset[ci]
                            let end = this.mxOffset[ci]+cv.opt.length
                            if(typeof(sv) == 'number'){ // 如果选择过就只要拷贝一列
                                let matrixIndex = sv+this.mxOffset[si]
                                let currentMap = this.adjacencyMatrix[matrixIndex]
                                currentMap = currentMap.slice(start,end)
                                gret.push( [currentMap] )
                                        
                            }else{ // 否则就要拷贝整个cate的范围
                                let matrixIndexArr =  this.adjacencyMatrix.slice(
                                    this.mxOffset[si],this.mxOffset[si]+this.category[si].opt.length
                                )
                                matrixIndexArr = matrixIndexArr.map((av,ai,aa)=>{
                                    return av.slice(start,end)
                                })
                                gret.push( matrixIndexArr )
                            }
                        }
                    })
                    return gret
                }
                const mergeCateValidArr = (filtArr) => {
                    let cate = filtArr.map((fv,fi,fa)=>{
                        return arrOr(fv)
                    })
                    
                    return arrAnd(cate)
                }
                let res = this.category.map((cv,ci,ca)=>{ // 第m个选项的可选列表
                    let filtArr = getCateValidArr(cv,ci)
                    // console.log(ci,filtArr)
                    let cateValicArr = mergeCateValidArr(filtArr)
                    return cateValicArr
                })

                // console.log('*',[...res])
                this.validArr = [].concat(...res)
                // console.log('FromOtherSelected validArr',this.validArr)
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-adjacency-matrix{
        
    }
    .el-select{
        width: 300px;
    }
    .el-form.category{
        
        text-align: left;
        margin: 0 80px;
    }
</style>