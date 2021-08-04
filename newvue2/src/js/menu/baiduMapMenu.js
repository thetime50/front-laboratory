export default {
    title: "百度地图",
    id: "bmap",
    route: "bmap",
    children: [
        {
            title: "start",
            id: "bmstart",
            route: "bmstart",
        },
        {
            title: "gl",
            id: "gl",
            route: "gl",
            children: [
                {
                    title: "gl start",
                    id: "glstart",
                    route: "glstart",
                },
            ],
        },
        {
            title: "v30",
            id: "v30",
            route: "v30",
            children: [
                {
                    title: "v30 start",
                    id: "v30start",
                    route: "v30start",
                },
            ],
        },
        {
            title: "lite",
            id: "lite",
            route: "lite",
            children: [
                {
                    title: "lite start",
                    id: "litestart",
                    route: "litestart",
                },
            ],
        },
    ],
}