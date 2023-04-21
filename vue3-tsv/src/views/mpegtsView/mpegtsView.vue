<template>
  <div class="component-mpegts-view flex-layout fcol">
    <MpegtsPlayer :initConfig="flvInitConfig" ref="mpRef"/>
    <div>
        <a-button @click="play">
            play
        </a-button>
    </div>
    <div><video src="http://127.0.0.1:8000/live/home/index.m3u8"></video></div>
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    useSlots, useAttrs, defineComponent,
    ref,Ref,onMounted
} from "vue";

import Mpegts from 'mpegts.js';

import MpegtsPlayer from "./component/mpegtsPlayer.vue";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
defineComponent({MpegtsPlayer});

const mpRef : Ref<MpegtsPlayer> = ref(null);

// CORS 
// const flvInitConfig = ref({media:{
//     type: 'flv',  // could also be mpegts, m2ts, flv mse
//     isLive: true,
//     cors:true,
//     url: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8'
// }});

// const flvInitConfig = ref({media:{
//     type: 'flv',
//     isLive: false,
//     url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
// }});

// 总是会从一个固定的节点开始播放
const flvInitConfig = ref({media:{
    type: 'flv',  // could also be mpegts, m2ts, flv mse
    isLive: true,
    cors:true,
    url: 'http://127.0.0.1:8000/live/home.flv'
}});

// npx node-media-server
// ffmpeg -re -stream_loop -1 -i D:\Downloads\phone\phone-181746.mp4 -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/home
// ffmpeg -stream_loop -1 -re -i D:\Downloads\phone\phone-181746.mp4 -c copy -f flv rtmp://localhost/live/home
// rtmp://localhost:1935/live

// url: 'http://127.0.0.1:8000/live/home/index.m3u8'
// hls ffmpeg推流必须要声明h264 或者服务参数vc: 'libx264' 要把路径\\替换为 /

let player:Mpegts.Player = null;

function play(){
    mpRef.value.player.play();
}
</script>

<style lang="scss" scoped>
.component-mpegts-view {
    width: 100%;
    height: 100%;
}
</style>



