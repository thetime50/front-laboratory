const { exp } = require("mathjs");

class DataParse {
    constructor (data,fromat){
        this.origin=data
        this.fromat = fromat
        this.canvas = this.ami2canvas(data)
        this.info = this.amiInfo(data)
    }
    arr2canvas(arr,width,height) {
        let canvas = document.createElement("canvas");
        canvas.style.height = height+'px'
        canvas.style.width = width+'px'
        canvas.height = height//+'px'
        canvas.width = width//+'px'
        // 获取在canvas上绘图的CanvasRenderingContext2D对象
        let ctx = canvas.getContext('2d');
        let img=new Image(width,height)
        console.dir(img)
        // 绘制图片
        ctx.drawImage(img ,0,0,width,height)//, x , y);
        // 获取从x、y开始，宽为image.width、高为image.height的图片数据
        // 也就是获取绘制的图片数据
        let imgData = ctx.getImageData(0 , 0 , canvas.width, canvas.height)//parseInt(width),parseInt(height));
        // imgData.data = new Uint8ClampedArray(arr)
        // console.log(arr.length , imgData.data.length)
        this.fromat(imgData.data, arr)
        ctx.putImageData(imgData , 0,0);
        return canvas
    }
    amiInfo(frame){
        console.log(frame)
    }
    ami2canvas(frame){
        this.width = frame.columns
        this.height = frame.rows
        return this.arr2canvas(frame.pixelData,this.width,this.height)
    }
}

export default DataParse