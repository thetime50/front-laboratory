 <template>
  <!-- 弹窗 -->
  <div class="goods-detail">
    <el-dialog :title="typeStatus==0?'新建商品':'编辑商品'"  width="1180px" :visible.sync="dialoggoodsDetailVisible"  :show-close="false" :close-on-click-modal='false'>
        <div>
            <div>
                <i class="iconfont iconbiaotijuxing" style="color:#1296db;"></i>
                <span>基本信息</span>
            </div>
            <el-form :model="form"  ref="form" label-width="135px" :inline="true" label-position="right" >
                <el-form-item  prop="name" label="商品名称：">
                    <el-input type="text" v-model="form.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="商品分类：">
                    <el-select v-model="form.store" placeholder="全部">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item prop="phone" label="货号：">
                    <el-input type="text" v-model="form.phone" placeholder="如无货号，系统将自动生成"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="商品条码：">
                    <el-input type="text" v-model="form.account" placeholder="如无条码，系统将自动生成"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="商品单位：">
                     <el-select v-model="form.store" placeholder="全部">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account" label="商品单位：">
                     <el-select v-model="form.store" placeholder="全部">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item prop="account" label="商品图片：">
                   <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item prop="account" label="一品多码：">
                    <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#D6DBE2">
                    </el-switch>
                </el-form-item>
               
            </el-form>
            <div class="line-style"></div>
            <div style="margin-bottom:20px;">
                <i class="iconfont iconbiaotijuxing" style="color:#1296db;"></i>
                <span>规格与包装</span>
            </div>
            <div style="margin-bottom:20px;">
                <el-radio v-model="form.radio" label="1">多规格</el-radio>
                <el-radio v-model="form.radio" label="2">大小包装</el-radio>
            </div>
           <el-form :model="form"  ref="form" label-width="135px" :inline="true" label-position="right" >
                 <el-form-item prop="account" label="商品零售价：" style="color:#333333;">
                    <el-input type="number" v-model="form.shopPrice" class="input-number-style"></el-input> 
                    <span class="unit-style">元</span>
                </el-form-item>
           </el-form>
            <el-form :model="form"  ref="form" label-width="135px" :inline="true" label-position="right" v-for="(item,index) in form.packagingArr" :key="index" >
                <div class="line-style" v-if="index>=1"></div>
                <el-form-item prop="account" :label="'包装'+parseInt(index+1)+':'"  style="color:#333333;">
                   <el-button class="del-btn-style" size="medium" plain @click="delFormPackaging(index)">删除</el-button>
                </el-form-item>
                <el-form-item prop="account" label="名称：">
                    <el-input type="text" v-model="item.shopName" placeholder=""></el-input>
                    <div style="color:#999999;font-size:12px;margin-bottom: -22px;">系统将根据商品名称、数量、单位自动生成</div>
                </el-form-item>
                <el-form-item prop="account" label="数量：">
                    <el-input type="number" v-model="item.shopNumber" class="input-number-style"></el-input>
                    <span class="unit-style">元</span>
                </el-form-item>
                <el-form-item prop="account" label="包装条码：">
                    <el-input type="text" v-model="item.shopCode" placeholder="如无条码，系统将自动生成"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="包装单位：">
                     <el-select v-model="item.shopUnit" placeholder="全部">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account" label="零售价：">
                    <el-input type="number" v-model="item.price" class="input-number-style"></el-input>
                    <span class="unit-style">元</span>
                </el-form-item>
                  <el-form-item prop="account" label="配销价：">
                    <el-input type="number" v-model="form.distribution" class="input-number-style"></el-input>
                    <span class="unit-style">元</span>
                </el-form-item>
                 <el-form-item prop="account" label="商品图片：">
                   <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
           </el-form>
            <div class="add-btn-box">
                <el-button class="add-btn-style" icon="el-icon-plus" size="medium" @click="addFormPackaging">新增大小包装</el-button>
            </div>
            <el-form :model="form"  ref="form" label-width="135px" label-position="right">
                <el-form-item prop="account" label="规格设置：" v-for="(item,index) in form.pecificationsArr" :key="index">
                    <div >
                        <el-select v-model="item.pecificationsValue" placeholder="请选择" @change="changeValue">
                              <el-option
                                v-for="itemP in pecificationsOptions"
                                :key="itemP.value"
                                :label="itemP.label"
                                :value="itemP.value"
                                :disabled="itemP.disabled">
                            </el-option>
                        </el-select>
                        <el-button class="del-btn-style" size="medium" plain @click="delpecifications(item,index)" style="margin-left: 20px;">删除</el-button>
                    </div>
                    <div class="pecifications-value-style" style="margin-top:5px;">
                        <span class="value-color" v-for="(itemC,indexC) in item.chooseValueArr" :key="indexC">{{itemC.label}}<i class="el-icon-close" @click="delValueBtn(item,indexC)"></i></span>
                        <el-popover
                            placement="right"
                            width="240"
                            trigger="click"
                            v-model="item.popoverShow"
                            >
                            <div class="popever-checkbox">
                                <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll"  @change="checked=>handleCheckAllChange(checked, item)">规格值名称</el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <div class="choose-style">
                                    <div v-for="(items,indexs) in item.checkArr" :key="indexs" class="check-box">
                                        <el-checkbox-group v-model="item.checkedValue"   @change="checked=>handleCheckedCitiesChange(checked, item)">
                                            <el-checkbox :label="items" >{{items.label}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div> 
                            </div>
                            <div class="button-popover-bottom" >
                                <el-button class="popover-save-btn" @click="popoverSaveBtn(item)">保存</el-button>
                                <el-button @click="item.popoverShow = false">取消</el-button>
                            </div>
                        </el-popover>
                        <span @click="choosePopoverBtn(item)" style="cursor: pointer;" v-if="item.choosePopoerShow">选择规格值</span>
                    </div>
                </el-form-item> 
            </el-form>
            <div class="add-btn-box">
                <el-button class="add-btn-style" icon="el-icon-plus" size="medium" @click="addSpecifications()">添加规格项</el-button>
            </div>
            <div>
                <el-table :data="list"   border :span-method="arraySpanMethod" ref="table">
                    <!-- <el-table-column label="颜色" prop="color" ></el-table-column>
                    <el-table-column label="大小" prop="size"></el-table-column>
                    <el-table-column label="材质" prop="texture"></el-table-column> -->

                    <!-- 分类合并列 -->
                    <template v-for="(pritem,prindex) in form.pecificationsArr">
                        <el-table-column 
                        v-if="columnMap[pritem.pecificationsValue]"
                        :label="columnMap[pritem.pecificationsValue].label" 
                        :prop="columnMap[pritem.pecificationsValue].prop"></el-table-column>
                        
                    </template>

                    <el-table-column label="info" prop="info"></el-table-column>
                </el-table>
            </div>
           
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialoggoodsDetailVisible = false" class="exit-btn-style" size="medium" >取消</el-button>
                <el-button class="save-btn-style" @click="addDetail()" size="medium" >保存</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: "goods-detail",
    components: {
  
    },
    props:{},
    data() {
        return {
            dialoggoodsDetailVisible: true,
            typeStatus:"",
            columnMap:{
                1:{label:'颜色',prop:'color',},
                2:{label:'大小',prop:'size',},
                3:{label:'材质',prop:'texture',},
            },
            form: {
                name:"",
                phone:"",
                code:'',
                phone:'',
                account:'',
                radio: '1',
                shopPrice:"",
                packagingArr:[
                    {
                        shopNumber:"",
                        shopName:"",
                        shopCode:"",
                        shopUnit:"",
                        price:"",
                        distribution:"",
                        uploadItem:"",

                    }
                ],
                pecificationsArr:[
                    {
                        pecificationsValue:"",
                        popoverShow:false,
                        checkAll: [],
                        isIndeterminate: true,
                        checkAllValue:[],
                        checkedValue:[],
                        checkArr:[
                            {
                                label:'蓝色',
                                value:1,
                            },
                            {
                                label:'黄色',
                                value:2,
                            },
                            {
                                label:'紫色',
                                value:3,
                            },
                            {
                                label:'红色',
                                value:4,
                            },
                            {
                                label:'青色',
                                value:5,
                            }
                        ],
                        chooseValueArr:[],
                        choosePopoerShow:false,
                    }
                ]
            },
            pecificationsOptions:[
                {
                    value:1,
                    label:"颜色"
                },
                {
                    value:2,
                    label:"大小"
                },
                {
                    value:3,
                    label:"材质"
                },
            ],
            rules: {
                name: [
                    { required: true, message: '请输入员工姓名', trigger: 'blur' },
                    { min: 1, max: 10, message: '仅限10个字符，不包含空格', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入员工手机号', trigger: 'blur' },
                    { min: 1, max: 11, message: '仅限11位纯数字的手机号码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入员工编号', trigger: 'blur' },
                    { min: 1, max: 6, type: 'number', message: '仅限6位纯数字编号'}
                ],
                account: [
                    { required: true, message: '请输入员工账号', trigger: 'blur' }
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            value: false,
            pecificationsDialogVisible:false,
            list:[],
            // list:[
                
            //     {color:'黄色',size:'小小',texture:"丝绸",info:"xxxx 1"},
            //     {color:'黄色',size:'小小',texture:"毛绒",info:"xxxx 1"},
            //     {color:'青色',size:'大大',texture:"丝绸",info:"xxxx 3"},
            //     {color:'青色',size:'大大',texture:"毛绒",info:"xxxx 3"},
            //     {color:'青色',size:'小小',texture:"毛绒",info:"xxxx 4"},
            //     {color:'青色',size:'小小',texture:"丝绸",info:"xxxx 4"},
            //     {color:'红色',size:'大大',texture:"丝绸",info:"xxxx 6"},
            //     {color:'红色',size:'大大',texture:"毛绒",info:"xxxx 6"},
            //     {color:'红色',size:'小小',texture:"毛绒",info:"xxxx 7"},
            //     {color:'红色',size:'小小',texture:"丝绸",info:"xxxx 7"},
            // ],
            listHeader:[],
            headerArr:[],
            dataArr:[],
        };
    },
    computed: {},
    created() {},
    mounted () {
        this.$nextTick(()=>{
            this.dialoggoodsDetailVisible = true
        })
    },
    methods: {
        test(){
            let arr1=[
                {
                    value:1,
                    label:'测试1'
                },
                {
                    value:2,
                    label:'测试2'
                },
                {
                    value:3,
                    label:'测试3'
                },
            ];
            let arr2=[
                 {
                    value:1,
                    label:'测试1'
                },
                {
                    value:3,
                    label:'测试3'
                },
            ];
            let data = []
            for (var i = 0; i < arr1.length; i++) {
                var obj = arr1[i]
                var num = obj.value
                var isExist = false
                for (var j = 0; j < arr2.length; j++) {
                    var aj = arr2[j]
                    var n = aj.value
                    if (n == num) {
                        isExist = true
                        break
                    }
                }
                if (!isExist) {
                    data.push(obj)
                }
            }
            console.log(data)
            function arrSubtraction(l1,l2,cb){
                let result = l1.filter((v1,i1,a1)=>{
                    return !l2.some((v2,i2,a2)=>{
                        return cb(v1,v2)
                    })
                })
                return result
            }
            console.log(arrSubtraction(arr1,arr2,(v1,v2)=>{ //arr1-arr2
                return v1.value == v2.value
            }))
         
        },
        show(type){
            this.dialoggoodsDetailVisible=true;
            this.typeStatus=type;
            this.test()
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
            
        },
        //新增包装
        addFormPackaging(){
            const that = this;
	        that.form.packagingArr.push({});
        },
        //删除包装
        delFormPackaging(index){
            if (index >= 0) {
                this.form.packagingArr.splice(index, 1);
            }
        },
        //添加规格项
        addSpecifications(){
            const that=this;
            let str=that.form.pecificationsArr.length;
            if(str<3){
                that.form.pecificationsArr.push(
                    {
                        pecificationsValue:"",
                        popoverShow:false,
                        checkAll: [],
                        isIndeterminate: true,
                        checkAllValue:[],
                        checkedValue:[],
                        checkArr:[
                            {
                                label:'蓝色',
                                value:1,
                            },
                            {
                                label:'黄色',
                                value:2,
                            },
                            {
                                label:'紫色',
                                value:3,
                            },
                            {
                                label:'红色',
                                value:4,
                            },
                            {
                                label:'青色',
                                value:5,
                            }
                        ],
                        chooseValueArr:[],
                    }
                );
            }else{
                this.$message.error("可选择的规格设置不能超过三个");
            }
           
            
        },
        //删除规格项
        delpecifications(value,index){
            if (index >= 0) {
                this.form.pecificationsArr.splice(index, 1);
                this.pecificationsOptions.forEach((item,index)=>{
                     if(value.pecificationsValue==item.value){
                        this.$set(item,'disabled',false)
                     }
                })
            }
        },
        //全选
        handleCheckAllChange(val,value) {
            value.checkedValue = val ? value.checkArr : [];
            value.isIndeterminate = false;
        },
        handleCheckedCitiesChange(val,value) {
            let checkedCount = val.length;
            value.checkAll = checkedCount === value.checkArr.length;
            value.isIndeterminate = checkedCount > 0 && checkedCount < value.checkArr.length;
        },
        //保存按钮
        popoverSaveBtn(value){
            console.log(value)
            value.popoverShow=false;
            value.chooseValueArr=value.checkedValue;
            this.dataArr.push()
            this.pecificationsOptions.forEach((item,index)=>{
                if(value.pecificationsValue==item.value){
                    this.listHeader.push({
                        label:item.label,
                     
                    })
                }
            })
            this.headerArr=this.unique(this.listHeader);
            value.checkedValue.forEach((item,index)=>{
               this.$set(item,'parentId',value.pecificationsValue)
               this.dataArr.push(item)
            })
           
             
            let arr=this.unique(this.dataArr);
            console.log(arr)
      
            arr.forEach((item,index)=>{
                this.list.push({
                    color:item.label
                });
            })

        
            console.log(this.list)
            let arrs=[
                [
                    {
                        label: "蓝色",
                        parentId: 1,
                        value: 1 ,
                    },
                    {
                        label: "红色",
                        parentId: 1,
                        value: 2 ,
                    },
                ],
                [
                    {
                        label: "小小",
                        parentId: 2,
                        value: 1 , 
                    },
                    {
                        label: "大大",
                        parentId: 2,
                        value: 2 , 
                    }
                ]
              
            ]



            //////////////////////////////////////
            let getPrototype = () => {return {color:'',size:'',texture:"",info:"xxxx 1"}}
            let pf = this.form.pecificationsArr
            let pfr = ([].concat(pf)).reverse()
            let pfLens = pf.map((pv,pi,pa)=>{
                return pv.chooseValueArr.length
            })
            let len = pfLens.reduce((pt,pv,pi,pa)=>{
                return pt * pv
            },1)
            let list = Array.from({length:len},getPrototype)

            list.forEach((lv,li,la)=>{
                let step = 1
                pfr.forEach((pv,pi,pa)=>{//keys
                    let clen = pv.chooseValueArr.length
                    let key = this.columnMap[pv.pecificationsValue].prop
                    
                    lv[key] = pv.chooseValueArr[Math.floor(li/step)%clen].label
                    step = step * clen
                })
            })
            
            // console.log({
            //     pfLens,len,list
            // })
            
            this.list = list
            //////////////////////////////////////

            // let list=[
            //     {color:'蓝色',size:'小小'},
            //     {color:'蓝色',size:'大大'},
            //     {color:'红色',size:'小小'},
            //     {color:'红色',size:'大大'},
                
            // ]
        },
        //去重
        unique(arr) {
            return arr.filter(function(item, index, arr) {
            //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                return arr.indexOf(item, 0) === index;
            });
        },
        //删除选中项
        delValueBtn(value,index){
           
            if (index >= 0) {
                value.chooseValueArr.splice(index, 1);
            }
            
        },
        //选择规格值
        choosePopoverBtn(value){
            value.popoverShow=true;
            console.log(value)
           
        },
        //选择规格设置
        changeValue(value){
            let arr=[];
            this.pecificationsOptions.forEach((items,indexs)=>{
                if(value==items.value){
                    this.$set(items,'disabled',true)
                }
            })
            this.pecificationsOptions.forEach((items,indexs)=>{
                this.form.pecificationsArr.forEach((itemT,indexT)=>{
                    if(items.value==itemT.pecificationsValue){
                            // items.disabled=false
                        arr.push(items)
                    }
                 })
            })
            function arrSubtraction(arr1,arr2,cb){
                let result = arr1.filter((v1,i1,a1)=>{
                    return !arr2.some((v2,i2,a2)=>{
                        return cb(v1,v2)
                    })
                })
                return result
            }
            arr=arrSubtraction(this.pecificationsOptions,this.form.pecificationsArr,(v1,v2)=>{ //arr1-arr2
                return v1.value == v2.pecificationsValue
            })
            arr.forEach((item,index)=>{
                item.disabled=false;
            })
          
            this.form.pecificationsArr.forEach((item,index)=>{
                if(item.pecificationsValue!=""){
                    item.choosePopoerShow=true;
                    if(item.pecificationsValue==1){
                        item.checkArr=[
                            {
                                label:'蓝色',
                                value:1,
                            },
                            {
                                label:'黄色',
                                value:2,
                            },
                            {
                                label:'紫色',
                                value:3,
                            },
                            {
                                label:'红色',
                                value:4,
                            },
                            {
                                label:'青色',
                                value:5,
                            }
                        ]
                    }else if(item.pecificationsValue==2){
                        item.checkArr=[
                            {
                                label:'大大',
                                value:1,
                            },
                            {
                                label:'小小',
                                value:2,
                            },
                        ]
                    }else if(item.pecificationsValue==3){
                        item.checkArr=[
                            {
                                label:'丝绸',
                                value:1,
                            },
                            {
                                label:'毛绒',
                                value:2,
                            },
                        ]
                    } 
                   
                }
            });
            this.$nextTick(()=>{//表头不刷新问题
                    this.$refs.table&&this.$refs.table.doLayout()
                    this.$refs.table.$refs.tableHeader.$forceUpdate()
                    // this.$refs.table.$refs.fixedTableHeader.$forceUpdate()
            })

        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            let cnt = 1
            // let testItem = null
            // if(columnIndex == 0){//第1列
            //     testItem = (index1,index2)=>{
            //         return this.list[index1].color !=this.list[index2].color
            //     }
            // }else if(columnIndex == 1){//第2列
            //     testItem = (index1,index2)=>{
            //         return this.list[index1].color !=this.list[index2].color ||
            //         this.list[index1].size != this.list[index2].size
            //     }
            // }

            // if(testItem){
            //     if(rowIndex==0 || testItem(rowIndex,rowIndex-1)){
            //         for(;rowIndex+cnt < this.list.length;cnt++){
            //             if(testItem(rowIndex,rowIndex+cnt)){
            //                 break
            //             }
            //         }
            //     }else{
            //         cnt=0
            //     }
            // }
            // if(columnIndex < this.form.pecificationsArr.length){
            //     let spanClassCnt = this.form.pecificationsArr.length
                
            //     let delta = spanClassCnt - columnIndex - 1
            //     if(delta<0){
            //         delta = 0
            //     }

            //     let span = 2**delta
            //     if(span == 1){
            //         cnt = 1
            //     }else if(rowIndex%span == 0){
            //         cnt = span
            //     }else{
            //         cnt = 0
            //     }
            //     // console.table([{rowIndex, columnIndex,spanClassCnt,delta,span,mod:rowIndex%span,cnt}])
            // }

            if(columnIndex < this.form.pecificationsArr.length-1){
                let pf = this.form.pecificationsArr
                let pfr = ([].concat(pf)).reverse()
                let stepAdd = 1
                let steps = pfr.map((pv,pi,pa)=>{
                    let n = stepAdd
                    stepAdd = stepAdd * pv.chooseValueArr.length
                    return n
                })
                steps.reverse()
                let step = steps[columnIndex]
                let mod = rowIndex % step
                if(step!=1){
                    if(!mod){
                        cnt = step
                    }else{
                        cnt = 0
                    }
                }
                // console.log(columnIndex,rowIndex,steps,step,mod,cnt)
            }

            return {
                rowspan: cnt,
                colspan: 1
            }
        },
    },
    watch:{},
};
</script>


<style scoped lang='scss'>
.goods-detail{
    /deep/.el-form{
        .el-form-item{
            display: flex;
        }
        .el-input{
            .el-input__inner{
                width: 300px;
                height: 40px;
                border-radius: 8px;
            }
        }
        .warin-font{
            color:#999999;
            font-size: 14px;
        }
        .el-upload--picture-card{
            width: 80px!important;
            height: 80px!important;
            line-height: 89px!important;
        }
        .el-icon-plus{
            font-size: 21px!important;
        }
        
    }
    /deep/.el-select{
        .el-input{
            .el-input__inner{
                width: 150px;
                height: 40px;
            }
        }
    }
    .input-number-style{
        /deep/ .el-input__inner{
                width: 80px!important;
            }
        
    }
    .unit-style{
        position: absolute;
        margin-left: 8px;
    }
    .line-style{
        width: 100%;
        height: 2px;
        background: #ECF1F9;
        margin-bottom:20px;
    }
    .pecifications-value-style{
        color:#3181FF;
        .value-color{
            width: 60px;
            height: 24px;
            background: #ECF1F9;
            border-radius: 4px;
            font-size: 12px;
            display: inline-block;
            line-height: 2;
            text-align: center;
            margin-right: 14px;
            i{
                margin-left: 5px;
                font-weight: bold;
                cursor: pointer;
            }
            
        }
        
    }
    /deep/.el-table {
        td{
            text-align: center;
        }
        th{
           text-align: center; 
        }
    }

}
</style>
