/*
http://www.ruanyifeng.com/blog/2018/07/web-worker.html
五、实例：Worker 线程完成轮询
*/
function createWorker(f) {
    // self.onmessage
    // var blob = new Blob(['(' + f.toString() +')()']);这样写只是执行没有传参
    var blob = new Blob([`
    self.addEventListener('message',${f.toString()},false)
    `])
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);
    return worker;
}

export {
    createWorker,
}