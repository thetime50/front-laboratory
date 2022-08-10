<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <div>
    <a-button type="button" @click="count++">count is: {{ count }}</a-button>
    <a-button type="button" @click="store.increment" >store.count is: {{store.count}}</a-button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/index';
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
const store = useStore();
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.ant-btn~.ant-btn{
  margin-left: 12px;
}
</style>
