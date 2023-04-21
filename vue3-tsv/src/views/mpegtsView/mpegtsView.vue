<template>
  <div class="component-mpegts-view flex-layout fcol">
    <video ref="videoRef">
    </video>
    <div>
        <a-button @click="play">
            play
        </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    useSlots, useAttrs, defineComponent,
    ref,Ref,onMounted
} from "vue";

import Mpegts from 'mpegts.js';

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const videoRef : Ref<HTMLMediaElement|null> = ref(null);
// defineComponent({});
// npx node-media-server
// ffmpeg -re -stream_loop -1 -i D:\Downloads\phone\phone-212845.mp4 -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/home
// ffmpeg -stream_loop -1 -re -i D:\Downloads\phone\phone-212845.mp4 -c copy -f flv rtmp://localhost/live/home
// rtmp://localhost:1935/live

let player:Mpegts.Player = null;
onMounted(async ()=>{
    if (Mpegts.getFeatureList().mseLivePlayback) {
        player = Mpegts.createPlayer({
            // type: 'flv',  // could also be mpegts, m2ts, flv mse
            // isLive: true,
            // url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8'

            // type: 'flv',
            // isLive: false,
            // url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'

            
            type: 'flv',  // could also be mpegts, m2ts, flv mse
            isLive: true,
            cors:true,
            url: 'http://127.0.0.1:8000/live/home.flv'
            // http://127.0.0.1:8000/live/home/index.m3u8 ??
        });
        player.attachMediaElement(videoRef.value);
        player.load();
    }
});
function play(){
    player.play();
}
</script>

<style lang="scss" scoped>
.component-mpegts-view {
    width: 100%;
    height: 100%;
}
</style>



