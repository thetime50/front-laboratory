<template>
    <div class="component-vue-tilt">
        <div class="flex-layout frow">
            <div class="left flex-mean">
                <div class="title-cube" v-tilt="tiltCfg" :key="key">
                    <div class="cube-a"></div>
                    <div class="cube-b"></div>
                    <div class="cube-c"></div>
                    <div class="cube-d"></div>
                </div>
                <div class="refresh">
                    <el-button icon="el-icon-refresh" circle @click="key++"></el-button>
                    <el-button @click="resetClick">reset</el-button>
                </div>
            </div>
            <div class="left flex-mean">
                <pre class="">
    {{JSON.stringify(tiltCfg, null, 2)}}
                </pre>
            </div>
        </div>
        <div>
            <a href="https://github.com/vanderb/vue-tilt.js" target="_blank">github vue-tilt.js</a>
        </div>
        <el-table :data="configList">
          <el-table-column label="field" prop="field"></el-table-column>
          <el-table-column label="value">
            <template #default="scope">
              <template v-if="typeof scope.row.value == 'string'">
                  <el-input v-model="scope.row.value" placeholder="请输入"></el-input>
              </template>
              <template v-else-if="typeof scope.row.value == 'boolean'">
                  <el-checkbox v-model="scope.row.value"></el-checkbox>
              </template>
              <template v-else-if="typeof scope.row.value == 'number'">
                  <el-input-number input v-model="scope.row.value" type="number" placeholder="请输入"></el-input-number>
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
    max:                    55,     // max tilt rotation (degrees) // default 35 
    startX:                 0,      // the starting tilt on the X axis, in degrees.
    startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            800,    // Transform perspective, the lower the more extreme the tilt gets. // default 1000
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
                let commaIndex = row.search(/,\s*($|(\/\/)|(\/\*))/);
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
            // console.log('fields', fields)
            return fields
        },
    }
    export default {
        name: "vue-tilt",
        data () {
            return {
                key:0,
                // tiltCfg:objParse.exexObj(tcfg),
                configList:objParse.exexObj(tcfg),
            };
        },
        computed: {
            tiltCfg(){
                let res = this.configList.reduce((t,v)=>{
                    t[v.field] = v.value
                    return t
                },{})
                return res;
            },
        },
        methods: {
            resetClick(){
                this.configList = objParse.exexObj(tcfg),
                this.key++
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .component-vue-tilt{
        
    }
    .left{
        position: relative;
        .refresh{
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }
    .title-cube{
        width: 300px;
        height: 250px;
        background-image: linear-gradient(150deg, rgba(#5a00ff,0.3) 0%, rgba(#ff1ff7,0.3) 100%, rgba(#ff1ff7,0.3) 100%);
        transform-style: preserve-3d;
        transform: perspective(1000px);
        .cube-a{
            position: absolute;
            width: 160px;
            height: 100px;
            transform: translate3d(60px,40px,30px);
            background-color: rgba(#f88,0.3);
        }
        .cube-b{
            position: absolute;
            width: 160px;
            height: 100px;
            transform: translate3d(80px,60px,60px);
            background-color: rgba(#8f8,0.3);
        }
        .cube-c{
            position: absolute;
            width: 40px;
            height: 120px;
            transform: translate3d(120px,60px,150px);
            background-color: rgba(#88f,0.3);
        }
        .cube-d{
            position: absolute;
            width: 30px;
            height: 30px;
            transform: translate3d(230px,200px,-50px);
            background-color: rgba(#8ff,0.3);
        }
    }
    pre{
        text-align: left;
    }
</style>