<template>
  <div class="component-component_name">
    <a-form :model="cfg" :label-col="{ span: 10 }" :disabled="doActinoInfo.lock">
      <a-form-item label="widthCnt" name="widthCnt">
        <a-input v-model:value="cfgEdit.widthCnt" />
      </a-form-item>
      <a-form-item label="heightCnt" name="heightCnt">
        <a-input v-model:value="cfgEdit.heightCnt" />
      </a-form-item>
      <a-form-item>
        <a-button @click="confirm">确定</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-form :disabled="doActinoInfo.lock">
        <div class="shuffle-cfg">
          <a-input-number v-model:value="shuffleCfg.step" :precision="0"></a-input-number>
          <a-button @click="onShuffle">生成打乱步骤</a-button>
        </div>
        <div class="do-actino-info">
          doActinoInfo:<br />
          <!-- actions: {{doActinoInfo.actions.map(v=>ActionDir[v]).join(",")}}<br /> -->
          <a-textarea v-model:value="doActinoInfo.actionsStr"></a-textarea><br />
          exec: {{ ActionDir[doActinoInfo.currentAction] }} {{ doActinoInfo.execed+1 }}/{{
          doActinoInfo.actions.length }}<br />

          <a-button @click="doActions()">逐步执行</a-button>
          <a-button @click="doActions(true)">立即执行</a-button><br />
          <a-button @click="reset">复位</a-button><br />
          <a-button @click="bfsSolve">Di-bfs求解</a-button><br />
          <p :style="solveActions.style" @click="copyAction(solveActions.str)">
            {{ solveActions.str }}
          </p>
          <a-button @click="astarSolve">A* 求解</a-button><br />
          <p :style="astarActions.style" @click="copyAction(astarActions.str)">
            {{ astarActions.str }}
          </p>
        </div>
      </a-form>
    </div>
    <!-- <pre>{{JSON.stringify( cfg, null, '  ')}}</pre> -->
    <div class="cube" :style="{ width: (cfg.itemWidth + cfg.gep) * cfg.widthCnt + 'px' }">
      <transition-group name="cube-item">
        <template v-for="(item,i) in showList" :key="item">
          <div :class="['item', 'item-' + (emptyNum == item ? 'none' : item),i==item?'match':'']"
            :style="{ width: cfg.itemWidth + 'px', height: cfg.itemWidth + 'px', margin: cfg.gep / 2 + 'px' }">
            <template v-if="typeof (item) == 'number'">
              <span>{{ item + 1 }}</span>
            </template>
            <template v-else>
              <span>{{ item }}</span>
            </template>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* IDA* 8数码问题 https://zhuanlan.zhihu.com/p/51497842 */
import { defineProps, defineEmits, useSlots, useAttrs,ref } from "vue";
import { shuffle } from "lodash";
import { ActionDir, actoins2Str, NumBoardShow } from "./numBoard";
import { message } from 'ant-design-vue';
import { BoardBfs, BoardDBfs } from './boardBfs'
import { BoardAstar } from './boardAstar'

async function delay (ms:number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

// IDAFS 迭代加深算法
// IDA* 启发式迭代加深
/*
 记空位移动方向 urdl
*/

const cfgEdit = ref({
    widthCnt:4,
    heightCnt:4,
});

// 渲染配置参数
const cfg = ref({
    itemWidth: 30,
    gep: 4,
    widthCnt:4,
    heightCnt:4,
    emptyIndex:-1, // 标记空格位置 内部会给值
    emptyNum:-1,
});

const shuffleCfg = ref({
    step: cfg.value.widthCnt * cfg.value.heightCnt * 2
})

const doActinoInfo = ref({
    actions:[] as ActionDir[],
    actionsStr:'',
    execed:0,
    currentAction:0,
    lock:false,
});

const sboard = new NumBoardShow(cfg.value);
const showList = ref<Array<number>>(sboard.list);
const emptyNum = ref(sboard.emptyNum)
sboard.list = showList.value; // 用响应式的数据替换一下


function confirm(){
    sboard.setSize(cfgEdit.value.widthCnt,cfgEdit.value.heightCnt);
    emptyNum.value = sboard.emptyNum
    showList.value = sboard.list;
    sboard.list = showList.value; // 用响应式的数据替换一下
    shuffleCfg.value.step = sboard.widthCnt * sboard.heightCnt * 3
}

function reset(){
  sboard.reset()
  showList.value = sboard.list;
  sboard.list = showList.value; // 用响应式的数据替换一下
}

function onShuffle(){
    // list.value = shuffle(list.value);
    const actions = sboard.getRandomActions(shuffleCfg.value.step);
    doActinoInfo.value.actionsStr = actoins2Str(actions)
}

function actionsStrTest(str:String){
    const actions = str.toLowerCase().split(/[, ]/).filter(v=>v) // 
    const errIndex = actions.findIndex((v,i,a)=>{
        return !['u','d','l','r'].includes(v)
    })
    if (errIndex >= 0) {
        message.warning(`无效执行动作第'${errIndex + 1}'项：${actions[errIndex]}`);
        return false
    }
    // ActionDir[ActionDir.l]
    return actions.map(v => ActionDir[v as any])
}

async function doActions(immed = false) {
    if (!doActinoInfo.value.actionsStr){
        return
    }
    doActinoInfo.value.lock = true
    try {
        const actions = actionsStrTest(doActinoInfo.value.actionsStr) as any as ActionDir[]
        if (!actions) {
            return
        }
        doActinoInfo.value.actions = actions as any as ActionDir[]
        for (let i in actions) {
            doActinoInfo.value.currentAction = actions[i];
            doActinoInfo.value.execed = Number(i);
            sboard.doAction(doActinoInfo.value.currentAction);
            if (!immed) {
                await delay(250);
            }
        }
        
    } catch (error) {
        message.warning( error.message);
        throw error
    }finally{
        doActinoInfo.value.lock = false
    }

}


/**
BoardBfs 
3*3
Done:还原路径22步,遍历状态84792,耗时0.198s,千次耗时2.335ms

BoardDBfs
3*3
Done:还原路径20步,遍历状态638,耗时0.019s,千次耗时29.781ms
4*4
Done:还原路径38步,遍历状态1935606,耗时9.834s,千次耗时5.081ms
Done:还原路径36步,遍历状态997689,耗时4.891s,千次耗时4.902ms
 */

// const bBfs = new BoardBfs()
const bBfs = new BoardDBfs()

const solveActions = ref({
  str:'',
  style:''
})
async function bfsSolve(){
  solveActions.value = {
    str: '',
    style: ''
  }
  try {
    bBfs.init(sboard.widthCnt, sboard.heightCnt, sboard.list)
    const actions = await bBfs.exec((str) => solveActions.value.str = 'info:'+ str)
    solveActions.value.str = actoins2Str(actions)
  } catch (error) {
    solveActions.value.str =  'error:'+error.message
    solveActions.value.style = 'color:red'
    throw error
  }finally{

    bBfs.clear() // 释放内存
  }
}

async function copyAction(s:string){
  if(/(^err)|(^info)/.test(s)){
    return
  }
  doActinoInfo.value.actionsStr = s
  await navigator.clipboard.writeText(s);
}


/**
BoardAstar
 */
const bAstar = new BoardAstar()

const astarActions = ref({
  str: '',
  style: ''
})
async function astarSolve() {
  astarActions.value = {
    str: '',
    style: ''
  }
  try {
    bAstar.init(sboard.widthCnt, sboard.heightCnt, sboard.list)
    const actions = await bAstar.exec((str) => astarActions.value.str = 'info:' + str)
    astarActions.value.str = actoins2Str(actions)
  } catch (error) {
    astarActions.value.str = 'error:' + error.message
    astarActions.value.style = 'color:red'
    throw error
  } finally {

    bAstar.clear() // 释放内存
  }
}

</script>

<style lang="scss" scoped>
.component-component_name {
  .ant-form{
    width: 600px;
    margin: auto;
    margin-top: 50px;
  }
  .ant-form-item{
    width: 200px;
    margin-left: 20px;
  }
  pre{
    text-align: left;
    width: 600px;
    max-width: 100%;
    margin: auto;
  }

  .shuffle-cfg ::v-deep .ant-input-number{
    width: 100px;
    margin-right: 10px;
  }
  .do-actino-info ::v-deep{
        textarea.ant-input {
        width: 300px;
        margin-right: 10px;
        }
    }
  .cube{
    margin:auto;
    line-height: 1;
  }
  .item{
    position: relative;
    display: inline-block;
    background-color: #faa;
    border-radius: 3px;
    border: solid 2px #fdd;
    color: #fff;
    font-size: 14px;
    text-align: center;
    span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

    }
    &.item-none{
        span{
            display: none;
        }
    }
    &.match {
      border: solid 2px #f77;
      span {
        font-weight: 900;
      }
    }
  }

  
  .cube-item-move,
  .cube-item-enter-active,
  .cube-item-leave-active {
    transition: all 0.2s ease;
  }
  .cube-item-enter-from,
  .cube-item-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

}
</style>