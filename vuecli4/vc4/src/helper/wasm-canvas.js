export async function loadImageData(src,{width,height}={}){
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
            const oh = wh ? height : (img.width * height) / img.width
            const ot = wh ? 0 : (oh - height) / 2
            const ol = wh ? (ow - width) / 2 : 0

            ctx.drawImage(img, -ol, -ot, ow, oh)//img to canvas
            const data = ctx.getImageData(0, 0, width, height).data
            resolve({ data, width, height})
        }
    })
}

export async function createRenderer (canvas, url) {
    const ww = window.innerWidth
    const wh = window.innerHeight
    const pr = window.devicePixelRatio
    const {data, width, height} = await loadImageData(url,{
        width: (ww - 40) * pr,
        height: 240 * pr
    })
    const { instance } = await instanceRenderer()
}

export async function instanceRenderer(){
    let memoryStates = new WeakMap()
    let instance = null
    function syncall (instance, n, args) {
        switch (n) {
            default:
                break
            case /* brk */ 45:
                return 0
            case /* mmap2 */ 192:
                const memory = instance.exports.memory
                const requested = args[1]
                let memoryState = memoryStates.get(instance)
                if (!memoryState){//看起来好复杂啊
                    memoryState = {
                        object : memory,
                        currentPosition : memory.buffer.byteLength
                    }
                    memoryStates.set(instance, memoryState)
                }
                const position = memoryState.currentPosition
                if (position + requested > memory.buffer.byteLength){
                    const need = Math.ceil(
                        (position + requested - memory.buffer.byteLength) / 65536
                    )
                    memory.grow(need)
                }
                memoryState.currentPosition += requested
                return position
        }
    }

    const response = await fetch('./main.wasm') // 类似 XMLHttpRequest
    const bytes = await response.arrayBuffer()
    const result = await WebAssembly.instantiate(bytes, {
        env: {
            __syscall0: function __syscall0 (n, ...args) {
                return syncall(instance, n, args)
            },
            __syscall1: function __syscall1 (n, ...args) {
                return syncall(instance, n, args)
            },
            __syscall2: function __syscall2 (n, ...args) {
                return syncall(instance, n, args)
            },
            __syscall3: function __syscall3 (n, ...args) {
                return syncall(instance, n, args)
            },
            __syscall4: function __syscall4 (n, ...args) {
                return syncall(instance, n, args)
            },
            // __syscall5: function __syscall5 (n, ...args) {
            //     return syncall(instance, n, args)
            // },
            __syscall6: function __syscall6 (n, ...args) {
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