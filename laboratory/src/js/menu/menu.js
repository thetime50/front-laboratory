import treeMenu from "./treeMenu.js"
import demoMenu from "./demoMenu.js"
import animationMenu from "./animationMenu.js"
import opencvMenu from "./opencvMenu.js"
import cornerstoneMenu from "./cornerstoneMenu.js"
import amiMenu from "./amiMenu.js"

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
    cornerstoneMenu,
    amiMenu,
]

export {
    menu
}