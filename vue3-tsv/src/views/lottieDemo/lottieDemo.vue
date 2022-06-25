<template>
  <div class="component-component_name">
    <component
      :is="Vue3LottieComp"
      v-if="Vue3LottieComp && kgj6sAnimaData"
      :animationData="kgj6sAnimaData"
      :height="'300px'"
      :width="'300px'"
    />
    <component
      :is="Vue3LottieComp"
      v-if="Vue3LottieComp && jfgsBarAnimaData"
      :animationData="jfgsBarAnimaData"
      :height="'300px'"
      :width="'300px'"
    />
  </div>
</template>

<script setup lang="ts">
/* message */
import { 
    /* defineProps, defineEmits, */ useSlots, useAttrs,
    ref, Ref, // eslint-disable-line
    shallowRef, ShallowRef,
    DefineComponent, // eslint-disable-line
 } from "vue";
import type {Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
// node_modules 模块现在还用不了 webpackChunkName
const Vue3LottieImport = async () => (
  /* webpackChunkName: "vue-lottie" */
  (await import( "vue3-lottie")).Vue3Lottie
);
// const Vue3LottieImport = async () => (await import("vue3-lottie")).Vue3Lottie; // eslint-disable-line
// resolveJsonModule()
const kgj6sAnimaDataImport = () =>
  import(/* webpackChunkName: "lottie/kgj6s" */ "@/assets/lottie/kgj6s.json"); // eslint-disable-line
const jfgsBarAnimaDataImport = () =>
  import(/* webpackChunkName: "lottie/jfgs-bar-lottie" */ "@/assets/lottie/jfgs-bar-lottie.json"); // eslint-disable-line

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const Vue3LottieComp:ShallowRef<typeof Vue3Lottie  | null> = shallowRef(null)
const kgj6sAnimaData:ShallowRef<object | null> = shallowRef(null);
const jfgsBarAnimaData:ShallowRef<object | null> = shallowRef(null);

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


</script>

<style lang="scss" scoped>
.component-component_name {
  //
}
</style>