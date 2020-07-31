// import moment from 'moment'
// import Vue from 'vue'

////////////////////////////////////
// methods
const traverseTree=function(tree,getChildren,cb,beforeCb,afterCb,depth=0,path=[],path_i=[]){
    /* tree         tree数据
       getChildren  获取子节点数组的方法
       cb           统一的节点回调函数 通过第二个参数"before""after"区分
                    返回undefined 或
                    {
                        skip:跳过子节点遍历
                    }
       beforeCb     进入节点回调
       afterCb      退出节点回调
       depth        节点深度
       path         历史节点记录 长度为depth+1
       path_i       历史节点标识 根节点没有索引，长度为depth
    */
    let skip=false;
    path.push(tree);
    cb && ({skip} = (cb(tree,"before",depth,path,path_i)||{}));
    beforeCb && ({skip} = (beforeCb(tree,"before",depth,path,path_i)||{}));

    let chilArr
    if(!getChildren){
        chilArr=tree.children
    }else if(typeof(getChildren)=="string"||typeof(getChildren)=="number"){
        chilArr=tree[getChildren]
    }else if(typeof(getChildren)=="function"){
        chilArr=getChildren(tree,depth,path,path_i)
    }else{
        throw "unsupported types"
    }
    if(chilArr && Array.isArray(chilArr) && !skip){
        chilArr.forEach((item,index,arr)=>{
            path_i.push(index);
            traverseTree(item,getChildren,cb,beforeCb,afterCb,depth+1,path,path_i);
            // console.log(index,depth)
            path_i.pop();
        })
    }

    cb && cb(tree,"after",depth,path,path_i);
    afterCb && afterCb(tree,"after",depth,path,path_i);
    path.pop();
}

////////////////////////////////////
// exprot

let Common= {
    CloneDeep(obj) {
        let str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for(let i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },
    //能够复制function类型
    CloneDeepObj(obj,sort=false) {
        if(typeof obj !== 'object'){
            return;
        }else if(obj===null){
            return null;
        }else{
            let newobj = obj.constructor === Array ? [] : {};
            let getAttr=(obj,i,sort)=>{
                return typeof obj[i] === 'object' ?
                    this.CloneDeepObj(obj[i],sort) : obj[i]
            }
            if(!Array.isArray(obj)){
                let keys=Object.keys(obj).sort();
                if(sort){
                    keys=keys.sort();
                }
                keys.forEach((i)=>{
                    newobj[i] = getAttr(obj,i,sort);
                })
            }else{
                for(let i in obj){
                    newobj[i] =  getAttr(obj,i,sort);
                }
            }
        }
        return newobj;
    },
    objectPitch(obj,pitchs,pitching=true,deep=true){
        //obj {} 拷贝对象
        //pitchs [] 映射表
        //pitching bool true:pitchs is pitcher false:pitchs is unpitcher
        //deep CloneDeep
        let retObj={}
        for(let ind in obj){
            let point
            if(pitching){//pitchs是选中字段表
                if(pitchs.indexOf(ind)>=0){
                    point=obj[ind]
                }
            }else{//pitchs是要删除字段表
                if(pitchs.indexOf(ind)<0){
                    point=obj[ind]
                }
            }
            if(point){
                retObj[ind]=deep?this.CloneDeepObj(point):point
            }
        }
        return retObj
    },
    CloneDeepSort(obj) {
        if(typeof obj !== 'object'){
            return;
        }else if(obj===null){
            return null;
        }else{
            let newobj = obj.constructor === Array ? [] : {};
            if(typeof obj==='object'){
                let keys=Object.keys(obj).sort()
                keys.forEach((i)=>{
                    newobj[i] = typeof obj[i] === 'object' ?
                        this.CloneDeepSort(obj[i]) : obj[i];
                })
            }else{
                for(let i in obj){
                    (newobj[i] = typeof obj[i] === 'object') ?
                        this.CloneDeepSort(obj[i]) : obj[i];
                }
            }
        }
        return newobj;
    },

    traverseTree,

    getVm(){
        return document.querySelector("#app").__vue__
    },
    convertToChinaNum(num) {
        let arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        let arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
        if(!num || isNaN(num)){
            return "零";
        }
        let english = num.toString().split("")
        let result = "";
        for (let i = 0; i < english.length; i++) {
            let des_i = english.length - 1 - i;//倒序排列设值
            result = arr2[i] + result;
            let arr1_index = english[des_i];
            result = arr1[arr1_index] + result;
        }
        //将【零千、零百】换成【零】 【十零】换成【十】
        result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
        //合并中间多个零为一个零
        result = result.replace(/零+/g, '零');
        //将【零亿】换成【亿】【零万】换成【万】
        result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
        //将【亿万】换成【亿】
        result = result.replace(/亿万/g, '亿');
        //移除末尾的零
        result = result.replace(/零+$/, '')
        //将【零一十】换成【零十】
        //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
        //将【一十】换成【十】
        result = result.replace(/^一十/g, '十');
        return result;
    },
};
export default Common;
