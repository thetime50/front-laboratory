<template>
    <div class="component-vue-tilt">
        <div class="title-cube" v-tilt ></div>
        {{configList.length}}
        <el-table :data="configList">
          <el-table-column label="field" prop="field"></el-table-column>
          <el-table-column label="value">
            <template #default="scope">
              <template v-if="typeof scope.row == 'string'">
                  <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
              </template>
              <template v-else-if="typeof scope.row == 'boolean'">
                  <el-checkbox v-model="scope.row.value"></el-checkbox>
              </template>
              <template v-else-if="typeof scope.row == 'number'">
                  <el-input v-model="scope.row.value" type="number" placeholder="请输入"></el-input>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="annotation" prop="annotation"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    /* message */
const tcfg = 
`
{
    reverse:                false,  // reverse the tilt direction
    max:                    35,     // max tilt rotation (degrees)
    startX:                 0,      // the starting tilt on the X axis, in degrees.
    startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:                  1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:                  300,    // Speed of the enter/exit transition
    transition:             true,   // Set a transition on enter/exit.
    axis:                   null,   // What axis should be disabled. Can be X or Y.
    reset:                  true,   // If the tilt effect has to be reset on exit.
    easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:                  false,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    "mouse-event-element":  null,   // css-selector or link to HTML-element what will be listen mouse events
    gyroscope:              true,   // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX:     -45,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX:     45,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY:     -45,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY:     45,     // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
}
`
// const re = RegExp("^.*$","g");
// console.log('re.exec(str)', re.exec(tcfg))
    // function* rowGenerate(str) {
    //     let re = RegExp(/$/,'m');
    //     let old_ = re.exec(str);
    //     let ctn = 0
    //     while(true && ctn++<10) {
    //         let new_ = re.exec(str);
    //         console.log('new_', new_)
    //         if(new_){
    //             yield old_[0]
    //             old_ = new_;
    //         }else{
    //             return old_[0];
    //         }
    //     }
    // }


    // function testRow(row){
    // }
    function exexRow(row){
    }
    const objParse={
        exexObj(str){
            let fields = []
            let rows = str.split(/$/m)
            // console.log('rows', rows)
            // let rows = rowGenerate(str)
            for(let row of rows){
                // test row
                if(!row){
                    continue;
                }
                let colonIndex = row.indexOf(':');
                let commaIndex = row.indexOf(',');
                if(!(
                    colonIndex >= 0 &&
                    commaIndex >= 0 &&
                    colonIndex < commaIndex
                )){
                    continue;
                }
                
                let field = row.slice(0,colonIndex).trim().replace(/(^"|')|("|'$)/g,'');
                let value = undefined
                try {
                    value = (new Function(`return ${ row.slice(colonIndex+1,commaIndex) };`))();
                } catch (error) {
                    console.log('row, value', row, value)
                    throw error
                }
                let annoIndex = row.search(/(\/\/|\*)/);
                let annotation = annoIndex>0 ? row.slice(annoIndex).trim() : ''; 

                // console.log('field,value', field,value,annotation)
                
                fields.push({
                    field,
                    value,
                    annotation
                })
            }
            console.log('fields', fields)
            return fields
        },
    }
    export default {
        name: "vue-tilt",
        data () {
            return {
                // tiltCfg:objParse.exexObj(tcfg),
                configList:objParse.exexObj(tcfg),
            };
        },
        computed: {
            tiltCfg(){
                let res = this.confirList.reduce((t,v)=>{
                    t[v.field] = t.value
                    return t
                },{})
                return res;
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-vue-tilt{
        
    }
    .title-cube{
        width: 300px;
        height: 250px;
        background-image: linear-gradient(150deg, #5a00ff 0%, #ff1ff7 100%, #ff1ff7 100%);
    }
</style>