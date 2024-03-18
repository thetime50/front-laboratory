<template>
    <!-- menu-item -->
    <template v-if="(item as MenuItemGroupType).type == 'group'">
        <a-menu-item-group class="component-menu-item" :title="(item as MenuItemGroupType).label">
            <template v-for="citem in (item as MenuItemGroupType).children" :key="citem.key">
                <menu-item :item="citem" />
            </template>
        </a-menu-item-group>
    </template>
    <template v-else-if="(item as MenuDividerType)?.type == 'divider'">
        <a-menu-divider class="component-menu-item"></a-menu-divider>
    </template> 
    <template v-else-if="(item as SubMenuType).children">
        <a-sub-menu class="component-menu-item" :title="(item as MenuItemGroupType).label"
            :key="(item as MenuItemGroupType).key">
            <template v-for="citem in (item as MenuItemGroupType).children" :key="citem.key">
                <menu-item :item="citem" />
            </template>
        </a-sub-menu>
    </template>
    <template v-else>
        <a-menu-item class="component-menu-item" 
        :title="(item as MenuItemType).title" 
        :key="(item as MenuItemType).key"
        :icon="(item as MenuItemType).icon">
        <template v-if="(item as MenuPathItem).path">
            <RouterLink :to="((item as MenuPathItem).path as string)"> {{ (item as MenuItemType).label }}</RouterLink>
        </template>
        <template v-else-if="(item as MenuPathItem).name">
            <RouterLink :to="{name:((item as MenuPathItem).name as string)}"> {{ (item as MenuItemType).label }}</RouterLink>
        </template>
        <template v-else>
            {{ (item as MenuItemType).label }}
        </template>
        </a-menu-item>
    </template>
</template>

<script setup lang="ts">
/* message */
import { 
    defineProps, defineEmits, useSlots, useAttrs, PropType, 
} from 'vue';
import type {MenuItemT, MenuPathItem, MenuItemType , SubMenuType , MenuItemGroupType , MenuDividerType ,} from "./MenuType";
import { RouterLink } from 'vue-router';

const props = defineProps({
    item:{type:Object as PropType<MenuItemT>},
}); // eslint-disable-line
const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line


</script>

<style lang="scss" scoped>
.component-menu-item{}
</style>