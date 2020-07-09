<template>
    <div class="component-excel-input">
        <div class="input-grid">
            <input type="file" multiple="false" accept="application/vnd.ms-excel" @change="onChange" /> <br>
            <span>{{'select:'+JSON.stringify(select)}}</span> <br>
            <span>{{'sheetName:'+sheetName+' elselect:'+JSON.stringify(elselect)}}</span>
        </div>
        <div class="tabs-grid">
            <el-tabs  v-if="sheetName" class="sheet-tabs" v-model="sheetName">
                <el-tab-pane v-for="(sheetName,idx) in wb.SheetNames" :label="sheetName" :name="sheetName" :key="'sheet' + idx">
                </el-tab-pane> <!-- 没有内容 只显示label -->
            </el-tabs>
        </div>
        <div class="excel-sheet-grid">
            <el-table
                v-if="tableColumn"
                ref="eltable"
                :data="activeData"
                size="mini"
                :span-method="arraySpanMethod"
                border
                height="100%"

                @cell-mouse-enter="cellMouseEnter"
                @cell-mouse-leave="cellMouseLeave"
                @cell-click="cellClick"
                @header-click="headerClick"
            >
                <!-- 行号 -->
                <el-table-column
                    type="index"
                    fixed="left"
                    :index="activeInfo.range.s.r+1"/> <!-- 起始行 -->
                <!-- 数据 -->
                <template v-for="(clab,cind) in tableColumn">
                    <el-table-column
                        :label="clab"
                        align="center"
                    ><!-- :prop="cind.toString()" -->
                        <template slot-scope="scoped">
                            <div :col_="cind">{{scoped.row[cind.toString()]}}</div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
/* message */
//   "name": "element-ui",
//   "version": "2.10.1",
    import XLSX from 'xlsx';
    import {arrAddClass, arrRemoveClass,eleParents,nodeList2Array} from "@/com/nativetool.js"

    export default {
        name: "excel-input",
        props:{
            edit:{type:Boolean ,default:false},
            value:{type:Object},//{sn,ri,ci}//sheetName async by select
            select_opt:{type:String,default:'r,c'},
            cellClass:{//类名全是绑定在cell上的
                type:Object,
                default:()=>{return {
                    cellHover:  'cell-hover-def',
                    cellSelted: 'cell-selted-def',
                    colHover:   'col-hover-def',
                    colSelted:  'col-selted-def',
                    rowHover:   'row-hover-def',
                    rowSelted:  'row-selted-def',
                }}
            }
        },
        data () {
            return {
                startRow: -1,
                wb:{},
                sheetName:"",
                transData:[],

                elhover:{},//在数据区域的位置 不包括表头和索引
                elselect:{},//相对于eltable的序列号

                select:{},//相对于excel的序列号
            };
        },
        methods:{
            onChange: function(evt) {
                var file;
                var files = evt.target.files;

                if (!files || files.length == 0) return;

                file = files[0];

                var reader = new FileReader();
                reader.onload = (e) => {
                    // pre-process data
                    var binary = "";
                    var bytes = new Uint8Array(e.target.result);//拆成u8数组
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);//ascii码转字符
                    }

                    /* read workbook */
                    var wb = XLSX.read(binary, {type: 'binary'});

                    /* grab first sheet */
                    // var wsname = wb.SheetNames[0];
                    // var ws = wb.Sheets[wsname];
                    /* generate HTML */
                    // <div v-html="contentHtml"></div>
                    // this.contentHtml =  XLSX.utils.sheet_to_html(ws,{editable:true});
                    /*********** */
                    // console.log(wb)
                    this.wb=wb
                    this.sheetName =  wb.SheetNames[0];
                    // this.transData
                };

                reader.readAsArrayBuffer(file);
            },
            getSheetData(sheet,conf={header:1}){
                return XLSX.utils.sheet_to_json(sheet, conf);
            },
            getMargesMap(sheet){
                if(!sheet["!ref"]){
                    return null;
                }
                let range=XLSX.utils.decode_range(sheet["!ref"])
                let merges=sheet["!merges"]//绝对位置 从0开始
                let margesMap=[]//对应getSheetData数据 从有效区域开始的索引
                let absolute2relative=(s,p)=>{
                    return {
                        c:p.c-s.c,
                        r:p.r-s.r,
                    }
                }
                merges.forEach((mg,mind,marr) => {
                    let rmg={
                        s:absolute2relative(range.s,mg.s),
                        e:absolute2relative(range.s,mg.e),
                    }
                    for(let row=rmg.s.r;row<=rmg.e.r;row++){
                        if(!margesMap[row]){
                            margesMap[row]=[];
                        }
                        for(let col=rmg.s.c;col<=rmg.e.c;col++){
                            margesMap[row][col]={
                                rowspan: 0,
                                colspan: 0,
                            }
                        }
                    }
                    margesMap[rmg.s.r][rmg.s.c]={
                        rowspan: rmg.e.r-rmg.s.r+1,
                        colspan: rmg.e.c-rmg.s.c+1,
                    }
                });
                return margesMap;
            },
            getSheetImfo(sheet){
                if(!sheet["!ref"]){
                    return null;
                }
                let range=XLSX.utils.decode_range(sheet["!ref"])
                return {
                    range,
                    merges:this.getMargesMap(sheet)
                }
            },
            itemArr(length,cb=(v, k) => k){
                return Array.from({length}).map(cb)
            },

            indexMethod(){
                return 
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }){
                if(columnIndex>0){
                    let mr=this.activeInfo.merges[rowIndex]
                    return mr&&mr[columnIndex-1]//第一列序号
                }
            },
            // tableCellClass({row, column, rowIndex, columnIndex}){
            //     let cstr="";
            //     switch (this.selectType) {
            //         case selectOpt.cell:
            //             if(rowIndex==this.elhover.rowInd && columnIndex==this.elhover.colInd)
            //                 cstr+=this.cellClass.cellHover+" "
            //             if(rowIndex==this.elselect.rowInd && columnIndex==this.elselect.colInd)
            //                 cstr+=this.cellClass.cellSelted+" "
            //             break;
            //         case selectOpt.row:
            //             if(rowIndex==this.elhover.rowInd)
            //                 cstr+=this.cellClass.rowHover+" "
            //             if(rowIndex==this.elselect.rowInd)
            //                 cstr+=this.cellClass.rowSelted+" "
            //             break;
            //         case selectOpt.col:
            //             if(columnIndex==this.elhover.colInd)
            //                 cstr+=this.cellClass.colHover+" "
            //             if(columnIndex==this.elselect.colInd)
            //                 cstr+=this.cellClass.colSelted+" "
            //             break;
            //         default:
            //             break;
            //     }
            //     return cstr;
            // },

            //elselect
            getCol_(celdom){
                return celdom.children[0].children[0].getAttribute('col_')
            },
            cellMouseEnter(row, column, cell, event){
                let r=this.activeData.indexOf(row)
                let c=this.getCol_(cell)
                if(c===null)
                    c=-1
                this.setHover(r,c)
            },
            cellMouseLeave(row, column, cell, event){
                this.setHover(-1,-1)
            },
            cellClick(row, column, cell, event){
                if(!this.edit){
                    return
                }
                let r=this.activeData.indexOf(row)
                let c=this.getCol_(cell)
                if(c===null)
                    c=-1
                this.setSelect(r,c)
            },
            headerClick(column, event){
                if(!this.edit){
                    return
                }
                let par=eleParents(event.target,this.$refs.eltable.$el)
                let cell=par.find((v,i,a)=>{
                    return /\bel-table_\d+_column_\d+\b/.test(v.className)
                })
                let c=Array.from(cell.parentElement.children).indexOf(cell)
                if(c>=0){
                    c-=1
                }
                let r=-1
                this.setSelect(r,c)
            },

            setHover(row,col){
                // console.log('h',row,col)
                this.elhover={
                    rowInd:Number(row),
                    colInd:Number(col),
                }
            },
            setSelect(row,col){
                // console.log('s',row,col)
                this.elselect={
                    rowInd:Number(row),
                    colInd:Number(col),
                }
            },

            //////
            el2ex(cell){
                if(!this.activeInfo){
                    return {}
                }
                let r=cell.rowInd<0?-1:this.activeInfo.range.s.r+cell.rowInd
                let c=cell.colInd<0?-1:this.activeInfo.range.s.c+cell.colInd
                return {
                    ri:r,
                    ci:c,
                }
            },
            ex2el(cell){
                if(!this.activeInfo){
                    return {}
                }
                let r=cell.ri<0?-1:cell.ri-this.activeInfo.range.s.r
                let c=cell.ci<0?-1:cell.ci-this.activeInfo.range.s.c
                return {
                    rowInd:r,
                    colInd:c,
                }
            },
            el2exUpdata(){//elselect to value
                // 没有匹配sheetName
                let ex={//转换为结果
                    sn:this.sheetName,
                    ...this.el2ex(this.elselect),
                }
                if(Object.keys(ex).length!=3){
                    return
                }
                if(//check like //和当前结果比较
                    !this.select||
                    ex.sn== this.select.sn&&
                    ex.ri== this.select.ri&&
                    ex.ci== this.select.ci
                ){
                    return
                }
                this.select=ex
            },
            ex2elUpdata(){//value to elselect
                // 没有匹配sheetName
                let el=this.ex2el(this.select)//转换为结果
                if(!Object.keys(el).length){
                    return
                }
                if(//check like //和当前结果比较
                    this.select.sn==this.sheetName &&
                    el.rowInd==this.elselect.rowInd &&
                    el.colInd==this.elselect.colInd
                ){
                    return
                }
                if(this.sopt.s){
                    this.sheetName=this.select.sn
                }
                this.elselect=el
            },

            elselectClassSync(after,before){
                let eltable=this.$refs.eltable.$el
                // let tbodyEls=eltable.querySelectorAll("table")
                
                //col mask sync
                let cmShow=this.sopt.c && this.sopt.s && this.sheetName==this.select.sn || 
                        this.sopt.c && !this.sopt.s
                //row mask sync
                let rmShow=this.sopt.r && this.sopt.s && this.sheetName==this.select.sn || 
                        this.sopt.r && !this.sopt.s
                //cel mask sync
                let celmShow=this.sopt.r&&this.sopt.c && this.sopt.s && this.sheetName==this.select.sn || 
                        this.sopt.r&&this.sopt.c && !this.sopt.s
                let getColCellList=function(tab,colInd){//获取第几列
                    if(colInd<0){
                        return []
                    }
                    let th=nodeList2Array(tab.querySelectorAll("thead>tr"))
                    let tb=nodeList2Array(tab.querySelectorAll("tbody>tr"))
                    let colList=Array.prototype.concat(
                        th.map((v,i,a)=>v.childNodes[colInd+1]),
                        tb.map((v,i,a)=>v.childNodes[colInd+1])
                    )
                    colList=colList.filter((v,i,a)=>{
                        return v
                    })
                    return colList
                }
                let getRowCellList=function(tab,rowInd){//获取第几行
                    if(rowInd<0){
                        return []
                    }
                    let tb=nodeList2Array(tab.querySelectorAll("tbody"))//获取td
                        .filter((v,i,a)=>{return v.childNodes[rowInd]})//长度足够 有对应的行
                    let tr=tb.map((v,i,a)=>{return v.childNodes[rowInd].childNodes})//tr
                    let rowList= tr.reduce((t, v) => { return t.concat(nodeList2Array(v))}, []);
                    return rowList
                }

                console.log(getColCellList(eltable,after.colInd),getRowCellList(eltable,after.rowInd))
                
            },
        },
        computed: {
            sopt(){
                return {
                    c:/c/.test(this.select_opt),
                    r:/r/.test(this.select_opt),
                    s:/s/.test(this.select_opt),
                }
            },
            activeSheet(){
                return this.wb.Sheets&&this.sheetName ? this.wb.Sheets[this.sheetName] : null;
            },
            activeData(){
                return this.activeSheet?this.getSheetData(this.activeSheet):null;
            },
            activeInfo(){
                return this.activeSheet?this.getSheetImfo(this.activeSheet):null;
            },
            tableColumn(){
                if(!this.activeInfo){
                    return null
                }
                return this.itemArr(
                    (this.activeInfo.range.e.c-this.activeInfo.range.s.c+1),
                    (v,k,arr)=>{
                        return XLSX.utils.encode_col(k+this.activeInfo.range.s.c)
                    }
                )
            },
        },
        watch:{
            /*
            数据同步逻辑
                value to select
                select to value

                select to elselect
                elselect to select

                value <=> select <=> elselect
            */
            value:{
                handler(after,before){
                    this.select=after
                },
                deep:true,
                immediate:true,
            },
            elselect(after,before){
                this.el2exUpdata()
                this.elselectClassSync(after,before)
            },
            select(after,before){
                this.$emit("input",after)
                this.ex2elUpdata()
            },
            activeData(after,before){
                this.$nextTick(()=>{
                    this.$refs.eltable&&this.$refs.eltable.doLayout()
                })
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-excel-input{
    width: 100%;
    height: 100%;
    
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;//.class1 .class2
    >*{
        min-width: 0;
        min-height: 0;
    }
    .input-grid{
        
    }
    .tabs-grid{
        >.sheet-tabs /deep/{
            .el-tabs__header{
                margin-bottom: 2px;
            }
        }
    }
    .excel-sheet-grid{
        overflow: hidden;
        .el-table /deep/{
            // tr:hover>td{
            //     background-color:#fff;//#f5f7fa;
            // }
            td{
                padding: 0;
                .cell{
                    padding: 0 5px;
                }
            }
            .cell-hover-def{
                background-color:#f0f0f0;
            }
            .cell-selted-de{
                background-color:#f0f0f0;
                font-weight:bolder;//bold
                border: #222 2 solid;
            }
            .col-hover-def{
                background-color:#f5f7fa;
            }

            $selted-def:#222 2 solid;
            .col-selted-def{
                background-color:#f5f7fa;
                font-weight:bolder;//bold
                border-left: $selted-def;
                border-right: $selted-def;
                
            }
            tr:first-child .col-selted-def{
                border-top: $selted-def;
            }
            tr:last-child .col-selted-def{
                border-bottom: $selted-def;
            }

            .row-hover-def{
                background-color:#f5f7fa;
            }
            .row-selted-def{
                background-color:#f5f7fa;
                font-weight:bolder;//bold
                border-top: $selted-def;
                border-bottom: $selted-def;
                :first-child{
                    border-left: $selted-def;
                }
                :last-child{
                    border-right: $selted-def;
                }

            }
        }
    }
}
</style>