
const BMAP_AK = process.env.BMAP_AK || ''

if (!BMAP_AK) {
    console.error("请在https://lbsyun.baidu.com/apiconsole/key#/home申请密钥，并加入laboratory/config/prod.env.js文件BMAP_AK字段")
}

const loadCfg = {
    gl: {
        url: `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${BMAP_AK}`,
        global_symbol: 'BMapGL',
        global_loaded_cb: 'bmapglInitialize', // 全局回调函数名称
        resolve_list: [],
        loaded_cb() {
            loadCfg.gl.resolve_list.forEach((r, i, a) => {
                r(getBMap('gl'))
            })
            loadCfg.gl.resolve_list = []
        },
    },
    v30: {
        url: `http://api.map.baidu.com/api?v=3.0&ak=${BMAP_AK}`,
        global_symbol: 'BMap',
        global_loaded_cb: 'bmapv30Initialize', // 全局回调函数名称
        resolve_list: [],
        loaded_cb() {
            loadCfg.v30.resolve_list.forEach((r, i, a) => {
                r(getBMap('v30'))
            })
            loadCfg.v30.resolve_list = []
        },
    },
    lite: {
        url: `http://api.map.baidu.com/api?ak=${BMAP_AK}&type=lite&v=1.0`,
        global_symbol: 'BMap',
        global_loaded_cb: 'liteInitialize', // 全局回调函数名称
        resolve_list: [],
        loaded_cb() {
            loadCfg.lite.resolve_list.forEach((r, i, a) => {
                r(getBMap('lite'))
            })
            loadCfg.lite.resolve_list = []
        },
    },
}

function loadScript(type, cb) {
    let selMap = loadCfg[type]
    if (!window[selMap.global_loaded_cb]) {
        window[selMap.global_loaded_cb] = selMap.loaded_cb // 回调函数添加到全局
        var script = document.createElement("script");
        script.src = selMap.url + "&callback=" + selMap.global_loaded_cb; // 注册加载完成触发
        document.body.appendChild(script);
    }
    selMap.resolve_list.push(cb)
}

function getBMap(type) {
    return window[loadCfg[type].global_symbol]
}

export function bmapModuleInit(type = 'gl') {
    if (!getBMap(type)) {
        return new Promise((resolve, reject) => {
            loadScript(type, resolve)
        })
    }
    return getBMap(type)
}
