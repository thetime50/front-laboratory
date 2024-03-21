<template>
  <div class="component-component_name">
    <a-form :model="cfg" :label-col ="{span:10}">
        <a-form-item label="widthCnt" name="widthCnt">
            <a-input v-model:value="cfgEdit.widthCnt"/>
        </a-form-item>
        <a-form-item label="heightCnt" name="heightCnt">
            <a-input v-model:value="cfgEdit.heightCnt"/>
        </a-form-item>
        <a-form-item>
            <a-button  @click="confirm">确定</a-button>
        </a-form-item>
    </a-form>
    <div>
        <a-button @click="onShuffle">shuffle</a-button>
        <div>
            doActinoInfo:<br/>
                actions: {{doActinoInfo.actions.map(v=>ActionDir[v]).join(",")}}<br/>
                exec: {{ActionDir[doActinoInfo.currentAction] }} {{doActinoInfo.execed}}/{{ doActinoInfo.actions.length}}<br/>
        </div>
    </div>
    <pre>{{JSON.stringify( cfg, null, '  ')}}</pre>
    <div class="cube" :style="{width:(cfg.itemWidth + cfg.gep) * cfg.widthCnt + 'px'}">
        <transition-group name="cube-item">
            <template v-for="item in showList" :key="item">
                <div :class="['item', 'item-'+item]" :style="{width:cfg.itemWidth + 'px',height:cfg.itemWidth + 'px',margin: cfg.gep/2 + 'px'}" >
                    <template v-if="typeof(item) == 'number' ">
                        <span>{{item + 1}}</span>
                    </template>
                    <template v-else>
                        <span>{{item}}</span>
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
import {ActionDir, NumBoardShow} from "./numBoard";
import { number } from "echarts";

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
const cfg = ref({
    itemWidth: 30,
    gep: 4,
    widthCnt:4,
    heightCnt:4,
    emptyIndex:-1,
});

const doActinoInfo = ref({
    actions:[] as ActionDir[],
    execed:0,
    currentAction:0,
});

const sboard = new NumBoardShow(cfg.value);
const showList = ref<Array<string | number>>(sboard.list);
sboard.list = showList.value; // 用响应式的数据替换一下


function confirm(){
    sboard.setSize(cfgEdit.value.widthCnt,cfgEdit.value.heightCnt);
    showList.value = sboard.list;
    sboard.list = showList.value; // 用响应式的数据替换一下
}



async function onShuffle(){
    // list.value = shuffle(list.value);
    doActinoInfo.value.actions = sboard.getRandomActions(sboard.widthCnt*sboard.heightCnt*3);
    

    for(let i in doActinoInfo.value.actions){
        doActinoInfo.value.currentAction = doActinoInfo.value.actions[i];
        doActinoInfo.value.execed = Number(i);
        sboard.doAction(doActinoInfo.value.currentAction);
        await delay(250);
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