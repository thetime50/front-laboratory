import treeMenu from "./treeMenu.js"

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
    {
        title:"animation",
        id:"1",
        route:"animation",
        children:[
            {
                title:"vue-transition",
                id:"1-1",
                route:"vue-transition",
            },{
                title:"page1-2",
                id:"1-2",
                route:"page1-2",
            },
        ],
    },
    treeMenu,
]

export {
    menu
}