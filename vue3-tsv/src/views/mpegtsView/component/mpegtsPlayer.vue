<template>
  <div class="component-mpegts-player">
    <video ref="videoRef">
    </video>
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    useSlots, useAttrs, defineComponent,
    ref,Ref,onMounted,PropType,defineExpose
} from "vue";

import Mpegts from 'mpegts.js';
interface InitConfigItf{
    media :Mpegts.MediaDataSource,
    config: Mpegts.Config | undefined
}
const props = defineProps({
    initConfig:{
        type: Object as PropType<InitConfigItf>
    }
}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const videoRef : Ref<HTMLMediaElement|null> = ref(null);

let player = ref<Mpegts.Player>(null);
onMounted(async ()=>{
    if (Mpegts.getFeatureList().mseLivePlayback) {
        player.value = Mpegts.createPlayer(props.initConfig.media,props.initConfig.config);
        player.value.attachMediaElement(videoRef.value);
        player.value.load();
    }
});
// function play(){
//     player.play();
// }
defineExpose({
    player
});
</script>

<style lang="scss" scoped>
.component-mpegts-player {
    width: 100%;
    height: 100%;
    video{
        max-width: 100%;
        max-height: 100%;
    }
}
</style>



