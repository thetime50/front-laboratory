let mainMenu = [
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
    {
        title:"page2",
        id:"2",
        route:"page2",
        children:[
            {
                title:"page2-1",
                id:"2-1",
                route:"page2-1",
            },{
                title:"page2-2",
                id:"2-2",
                route:"page2-2",
            },
        ],
    },
]

export {
    mainMenu
}