<template>
  <div class="component-rubik-cube">
    rubikCube
  </div>
</template>

<script setup>
/* message */
import { /* defineProps, defineEmits, */ useSlots, useAttrs } from 'vue';

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
</script>

<style lang="scss" scoped>
.component-rubik-cube {
  width: 100%;
  height: 100%;
}
</style>
