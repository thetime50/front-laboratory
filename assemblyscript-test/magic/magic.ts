
export function create_buf(size:u32):Uint8Array{
    return new Uint8Array(size)
}

class point_t{
    constructor(){
        // 
    }
}

let ph = new point_t()

export function init(
    width:i32, 
    height:i32, 
    left:i32, 
    top:i32, 
    a:f32, 
    b:f32
):void{
    // 
}

export function drop():void {
    // 
}

export function update (
    width : i32, 
    height : i32
):void { // 更新参数
    // 
}

function renderPixel(
    input:Uint8Array, output:Uint8Array, dw:i32, dh:i32, sw:i32, sh:i32, dx:i32, dy:i32, sx:i32, sy:i32, a:i32
):void {
    // 
}

function renderPoint (
    input:Uint8Array, output:Uint8Array, dw:i32, dh:i32, sw:i32, sh:i32, ox:i32, oy:i32, p:point_t
):void {
    // 
}

export function render (
    input:Uint8Array, output:Uint8Array, dw:i32, dh:i32, sw:i32, sh:i32, ox:i32, oy:i32
):void { // 更新图片数据
    // 
}
        
// export let memory=new Uint8Array(1) //Uint8ClampedArray
// export let memory=new Uint8ClampedArray([1,2,3])