<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>

    <div>
        <h2>页面路由</h2>
        <div><router-link :to="{name: 'rubikCube'}">rubikCube</router-link></div>
        <div><router-link :to="{name: 'lottieDemo'}">lottieDemo</router-link></div>
        <div><router-link :to="{name: 'chartGraph'}">chartGraph</router-link></div>
        <div><router-link :to="{name: 'aStar'}">aStar</router-link></div>
        <div><router-link :to="{name: 'idaStar'}">idaStar</router-link></div>
        <div><router-link :to="{name: 'spline'}">spline 3d animate</router-link></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld
  }
});
</script>
