import Vue from 'vue'

import { 
    Breadcrumb,
    BreadcrumbItem,
    Icon,
    Menu,
    MenuItem,
    Submenu,
    RadioGroup,
    RadioButton,
    Radio,
    Button,
    Image,
    Table,
    TableColumn,
    Tooltip,
    Input,
    Checkbox,
    InputNumber,
    Form,
    FormItem,
    Select,
    Option,
    Drawer,
    Slider,
    Switch,
 } from 'element-ui';

const componentList = [
    Breadcrumb,
    BreadcrumbItem,
    Icon,
    Menu,
    MenuItem,
    Submenu,
    RadioGroup,
    RadioButton,
    Radio,
    Button,
    Image,
    Table,
    TableColumn,
    Tooltip,
    Input,
    Checkbox,
    InputNumber,
    Form,
    FormItem,
    Select,
    Option,
    Drawer,
    Slider,
    Switch,
]

export default function elementUse(){
    componentList.forEach((v)=>{
        Vue.component(v.name,v)
    })
}