import treeMenu from "./treeMenu.js"
import demoMenu from "./demoMenu.js"
import animationMenu from "./animationMenu.js"
import opencvMenu from "./opencvMenu.js"

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
]

export {
    menu
}