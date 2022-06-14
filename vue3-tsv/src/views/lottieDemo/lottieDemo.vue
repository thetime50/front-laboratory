<template>
  <div class="component-component_name">
    <component
      :is="Vue3LottieComp"
      v-if="Vue3LottieComp && kgj6sAnimaData"
      :animationData="kgj6sAnimaData"
      :height="'300px'"
      :width="'300px'"
      @animCreated="handleAnimation"
    />
    <component
      :is="Vue3LottieComp"
      v-if="Vue3LottieComp && jfgsBarAnimaData"
      :animationData="jfgsBarAnimaData"
      :height="'300px'"
      :width="'300px'"
      @animCreated="handleAnimation"
    />
  </div>
</template>

<script setup lang="ts">
/* message */
import { 
    /* defineProps, defineEmits, */ useSlots, useAttrs,
    ref, shallowRef
 } from "vue";
// node_modules 模块现在还用不了 webpackChunkName
// const Vue3Lottie = async () => (
//   (await import(/* webpackChunkName: "vue-lottie" */ "vue3-lottie")).Vue3Lottie
// );
const Vue3LottieImport = async () => (await import("vue3-lottie")).Vue3Lottie;
import "vue3-lottie/dist/style.css";
// resolveJsonModule()
const kgj6sAnimaDataImport = () =>
  import(/* webpackChunkName: "lottie/kgj6s" */ "@/assets/lottie/kgj6s.json");
const jfgsBarAnimaDataImport = () =>
  import(/* webpackChunkName: "lottie/jfgs-bar-lottie" */ "@/assets/lottie/jfgs-bar-lottie.json");

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const Vue3LottieComp = shallowRef(null)
const kgj6sAnimaData = shallowRef(null);
const jfgsBarAnimaData = shallowRef(null);

(async function init(){
    Vue3LottieImport().then(comp => {
        Vue3LottieComp.value = comp
    })
    kgj6sAnimaDataImport().then(data => {
        kgj6sAnimaData.value = data
    })
    jfgsBarAnimaDataImport().then(data => {
        jfgsBarAnimaData.value = data
    })
})();


function handleAnimation(anim) {
    // this.anim = anim;
    anim.setSpeed(0.8);//设置lottie播放速度
}

</script>

<style lang="scss" scoped>
.component-component_name {
  //
}
</style>