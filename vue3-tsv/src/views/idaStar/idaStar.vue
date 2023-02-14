<template>
  <div class="component-component_name">
    <a-form :model="cfg" layout="inline">
        <a-form-item label="widthCnt" name="widthCnt">
            <a-input v-model:value="cfg.widthCnt"/>
        </a-form-item>
        <a-form-item label="heightCnt" name="heightCnt">
            <a-input v-model:value="cfg.heightCnt"/>
        </a-form-item>
    </a-form>
    <div>
        <a-button @click="onShuffle">shuffle</a-button>
    </div>
    <pre>{{JSON.stringify( cfg, null, '  ')}}</pre>
    <div class="cube" :style="{width:(cfg.itemWidth + cfg.gep) * cfg.widthCnt + 'px'}">
        <transition-group name="cube-item">
            <template v-for="item in list" :key="item">
                <div :class="['item', 'item-'+item]" :style="{width:cfg.itemWidth + 'px',height:cfg.itemWidth + 'px',margin: cfg.gep/2 + 'px'}" >
                    <template v-if="typeof(item) == 'number' ">
                        <span>{{item + 1}}</span>
                    </template>
                    <template v-else>
                        {{item}}
                    </template>
                </div>
            </template>
        </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* message */
import { defineProps, defineEmits, useSlots, useAttrs,ref } from "vue";
import { shuffle } from "lodash";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

// IDAFS 迭代加深算法
// IDA* 启发式迭代加深

const cfg = ref({
    itemWidth: 30,
    gep: 4,
    widthCnt:4,
    heightCnt:4,
});

const list = ref<Array<string | number>>(Array.from({length:cfg.value.widthCnt * cfg.value.heightCnt},(v,i)=> i));

list.value[list.value.length-1] = 'none';

function onShuffle(){
    list.value = shuffle(list.value);
}

</script>

<style lang="scss" scoped>
.component-component_name {
  .ant-form-item{
    width: 200px;
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
    transition: all 1s ease;
  }
  .cube-item-enter-from,
  .cube-item-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>