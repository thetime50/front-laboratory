<template>
<div class="component-menu-tree">
    <!-- menu-tree -->
    <a-popover v-model:open="collapsed" title="Menu" trigger="click">
        <a-button type="primary" size="small">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <template #content>
            <a-menu v-model:selectedKeys="selected">
                <template v-for="item in items" :key="item.key">
                    <MenuItem :item="item"></MenuItem>
                </template>
            </a-menu>
        </template>
    </a-popover>
    
</div>
</template>

<script setup lang="tsx">
/* message */
import { 
    defineProps, defineEmits, useSlots, useAttrs, ref,toRaw,
    watch,
} from 'vue';
// import {useRoute} from "vue-router";
import MenuItem from "./MenuItem.vue";
import {menuData} from "./MenuData";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';

// const route = useRoute();

const props = defineProps({}); // eslint-disable-line
const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const collapsed = ref(false);
const selected = ref("");
// watch(selected,(selected)=>{
//     console.log("selected",toRaw( selected));
// });


const items = ref(menuData);
console.log('items',toRaw(items.value));



</script>

<style lang="scss" scoped>
.component-menu-tree{
    position: fixed;
    top:25px;
    left: 25px;
    opacity: 0.3;
    z-index: 10001;
    &:hover{
        opacity: 1;
    }
}
.ant-menu.ant-menu-root{
    border-inline-end: 0;
}
</style>