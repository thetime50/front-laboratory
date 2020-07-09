
const menuChild = {
    stete:undefined,
    // stete:[
    //     {
    //         title:"码流快速设置",
    //         id:"1-1",
    //         route:"state",
    //     }
    // ],
    encode:[
        {
            title:"基本设置",
            id:"2",
            route:"baseset",
            children:[
                {
                    title:"aaa设置",
                    id:"2-1",
                    route:"aaaset",
                },{
                    title:"bbb设置",
                    id:"2-2",
                    route:"bbbset",
                },{
                    title:"ccc设置",
                    id:"2-3",
                    route:"cccset",
                },
            ],
        },
        {
            title:"高级设置",
            id:"3",
            route:"advaset",
            children:[
                {
                    title:"ddd设置",
                    id:"3-1",
                    route:"dddset",
                },{
                    title:"eee设置",
                    id:"3-2",
                    route:"eeeset",
                },{
                    title:"fff设置",
                    id:"3-3",
                    route:"fffset",
                },
            ],
        },
    ],
    decode:[],
    system:[],
}

const wxmenu = [
    {
        title:"状态查询",
        route:"stete",
        children:menuChild.stete,
    },{
        title:"编码设置",
        route:"encode",
        children:menuChild.encode,
    },{
        title:"解码设置",
        route:"decode",
        children:menuChild.decode,
    },{
        title:"系统设置",
        route:"system",
        children:menuChild.system,
    },
]

export default wxmenu