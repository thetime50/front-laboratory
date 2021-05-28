
const BDMAP_AK = process.env.BDMAP_AK || ''

if (!BDMAP_AK) {
    console.error("请在https://lbsyun.baidu.com/apiconsole/key#/home申请密钥，并加入laboratory\config\prod.env.js文件BDMAP_AK字段")
}

function initialize() {
    var mp = new BMapGL.Map('map');
    mp.centerAndZoom(new BMapGL.Point(121.491, 31.233), 11);
}

function loadScript() {
    var script = document.createElement("script");
    script.src = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=您的密钥&callback=initialize";
    document.body.appendChild(script);
}
