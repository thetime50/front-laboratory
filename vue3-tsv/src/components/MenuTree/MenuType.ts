
import type {/* ItemType, */MenuItemType , SubMenuType , MenuItemGroupType , MenuDividerType ,} from "ant-design-vue/es/menu/src/hooks/useItems";
export {MenuItemType , SubMenuType , MenuItemGroupType , MenuDividerType ,};

export type MenuPathItem = (MenuItemType&{path?:string}&{name?:string})
export type MenuItemT = MenuPathItem | SubMenuType | MenuItemGroupType | MenuDividerType| null
