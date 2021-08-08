import treeMenu from "./treeMenu.js"
import demoMenu from "./demoMenu.js"
import animationMenu from "./animationMenu.js"
import opencvMenu from "./opencvMenu.js"
import baiduMapMenu from "./baiduMapMenu.js"
import web from './web.js'

let menu = [
    {
        title:"首页",
        id:"0",
        route:"home",
    },
    {
        title:"gameoflife",
        id:"gol",
        route:"gameoflife",
    },
    animationMenu,
    treeMenu,
    demoMenu,
    opencvMenu,
    baiduMapMenu,
    web,
]

export {
    menu
}