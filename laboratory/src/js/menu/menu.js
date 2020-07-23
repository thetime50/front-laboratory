import treeMenu from "./treeMenu.js"
import demoMenu from "./demoMenu.js"
import animationMenu from "./animationMenu.js"

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
]

export {
    menu
}