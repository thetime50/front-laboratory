export async function loadImageData(src,{width,height}={}){ // 从url获取图片 并裁剪返回图片数据
    return new Promise((resolve,reject)=>{
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = src+'?from=fetch'
        img.onerror = err => {
            img.onerror = img.onload = null
            reject(err)
        }
        img.onload = ()=>{
            img.onerror = img.onload = null
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')

            const wh = img.width / img.height > width / height //图片宽高比大于视图宽高比
            const ow = wh ? (img.width * height) / img.height : width
            const oh = wh ? height : (img.height * width) / img.width
            const ot = wh ? 0 : (oh - height) / 2
            const ol = wh ? (ow - width) / 2 : 0

            ctx.drawImage(img, -ol, -ot, ow, oh)//img to canvas
            const data = ctx.getImageData(0, 0, width, height).data
            resolve({ data, width, height})
        }
    })
}

export async function createRenderer (canvas, url) { // 工厂函数
    const ww = window.innerWidth
    const wh = window.innerHeight
    const pr = window.devicePixelRatio
    const {data, width, height} = await loadImageData(url,{
        width: (ww - 40) * pr, //img range
        height: 240 * pr
    })
    const { instance } = await instanceRenderer()
    const inputLen = width * height * 4
    const input = instance.exports.create_buf(inputLen) //uint8_t buffer

    canvas.width = ww * pr // 全屏的canvas
    canvas.height = wh * pr
    canvas.style.width = `${ww}px`
    canvas.style.height = `${wh}px`
    const context = canvas.getContext('2d')

    const outputLen = canvas.width * canvas.height * 4
    const output = instance.exports.create_buf(outputLen) //uint8_t buffer point (number)

    const inputBuf = new Uint8ClampedArray(//负数归入0，大于255的数归入255
        instance.exports.memory.buffer,
        input,
        inputLen
    )
    inputBuf.set(data, 0)

    // console.log(typeof output, typeof inputBuf,typeof data)

    const left = 20 * pr
    const top = 104 * pr
    instance.exports.init(width, height, left, top, 60, 10)

    return function render(play) {
        instance.exports.render(
            input,
            output,
            canvas.width, // dest range
            canvas.height,
            width, // src range
            height,
            left,
            top
        )
        // console.log('***',
        //     canvas.width,
        //     canvas.height,
        //     width,
        //     height,)
        instance.exports.update(canvas.width, canvas.height)

        const outputBuf = new Uint8ClampedArray(
            instance.exports.memory.buffer, // todo 不知道这个是在哪里 exports 出来的
            output,
            outputLen
        )
        const outputData = new ImageData(outputBuf, canvas.width, canvas.height) // 构造图片

        const radius = 10 * pr
        const radiusFixed = (sx, sy, cx, cy, ex, ey, r = radius) => {
            ex = ex || sx + r
            ey = ey || sy + r
            cx = cx || sx
            cy = cy || sy
            for(let y = sy; y < ey; y++){
                for(let x = sx; x < ex; x++){
                    if(distance(x, y, cx, cy) > r){
                        const ox = x + left
                        const oy = y + top
                        const o = (oy * canvas.width + ox) << 2
                        outputBuf[o + 3] = 0
                    }
                }
            }
        }
        // draw border radius
        radiusFixed(0, 0, radius, radius)
        radiusFixed(width - radius, 0, null, radius)
        radiusFixed(0, height-radius, radius, null)
        radiusFixed(width - radius, height - radius)

        context.putImageData(outputData, 0, 0) // draw
        if(play){
            requestAnimationFrame(render)
        }
    }
}

export async function instanceRenderer(){
    let memoryStates = new WeakMap() // instance -> memoryState map
    let instance = null
    function syncall (instance, n, args) {
        switch (n) {
            default:
                break
            case /* brk */ 45:
                return 0
            case /* mmap2 */ 192:
                const memory = instance.exports.memory
                const requested = args[1] // 代码块需要的空间
                let memoryState = memoryStates.get(instance)
                if (!memoryState){// 判断 并构造 加入map
                    memoryState = {
                        object : memory,
                        currentPosition : memory.buffer.byteLength
                    }
                    memoryStates.set(instance, memoryState)// 好像也没别的地方用了
                }
                const position = memoryState.currentPosition //  代码块位置??
                if (position + requested > memory.buffer.byteLength){
                    const need = Math.ceil(
                        (position + requested - memory.buffer.byteLength) / 65536
                    )
                    // https://cloud.tencent.com/developer/section/1192279
                    // 指定定数量的WebAssembly页面增加内存实例的大小
                    memory.grow(need) //难道是给mock用的??
                }
                memoryState.currentPosition += requested
                return position
        }
    }

    //用的是原生 webassembly 方法 没用用到vuecli4的库
    const response = await fetch('./main.wasm') // 类似 XMLHttpRequest
    const bytes = await response.arrayBuffer() // 得到二进制文件数据
    const result = await WebAssembly.instantiate(bytes, {
        env: {//todo 这里面是执行异常处理回调吗 n又是什么??
            __syscall0: function __syscall0 (n, ...args) {
                // 不知道在里面的instance是哪来的
                dbg('__syscall0',n,args)
                return syncall(instance, n, args)
            },
            __syscall1: function __syscall1 (n, ...args) {
                dbg('__syscall1',n,args)
                return syncall(instance, n, args)
            },
            __syscall2: function __syscall2 (n, ...args) {
                dbg('__syscall2',n,args)
                return syncall(instance, n, args)
            },
            __syscall3: function __syscall3 (n, ...args) {
                dbg('__syscall3',n,args)
                return syncall(instance, n, args)
            },
            __syscall4: function __syscall4 (n, ...args) {
                dbg('__syscall4',n,args)
                return syncall(instance, n, args)
            },
            // __syscall5: function __syscall5 (n, ...args) {
            //     dbg('__syscall5',n,args)
            //     return syncall(instance, n, args)
            // },
            __syscall6: function __syscall6 (n, ...args) {
                dbg('__syscall6',n,args)
                return syncall(instance, n, args)
            },
            
        }
    })
    instance = result.instance

    return result
}

export function distance (x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function dbg(...para){
    // console.log(...para)
}