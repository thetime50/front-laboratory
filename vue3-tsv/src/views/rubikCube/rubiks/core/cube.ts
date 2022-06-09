import { 
    Camera, Color, Group, Matrix4, Vector2, Vector3, 
    Object3D, AxesHelper, PlaneGeometry, MeshBasicMaterial, 
    CanvasTexture, Mesh, DoubleSide } from "three";
// import { setFinish, afterDotDom } from "./statusbar";
// import {getAngleBetweenTwoVector2, equalDirection} from "../util/math";
// import {ndcToScreen} from "../util/transform";
import CubeData from "./cubeData"; // 方块数据
import {createSquare, SquareMesh} from "./square"; // 方块实体
// import CubeState/* , {RotateDirection} */ from "./cubeState"; // 交互数据

// /**
//  * 获取square向里平移0.5的方块大小的位置
//  */
// // 中心点向法线方向向里移动0.5个squareSzie
// const getTemPos = (square: SquareMesh, squareSize: number) => {
//     const moveVect = square.element.normal.clone().normalize().multiplyScalar(-0.5 * squareSize);
//     const pos = square.element.pos.clone();

//     return pos.add(moveVect);
// };

interface StrConfig {
        width: number,
        height: number,
        // fillStyle: string,
        color: string,
        fontSize: number,
        align: string
}

function getStrCanvas(str:string,{
        width = 20,
        height = 20,
        color = '#fff',
        fontSize = 18,
        align = 'center',
}: StrConfig = {} as StrConfig) {
        
    let canvas = <HTMLCanvasElement>document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let ctx  = canvas.getContext('2d');
    if (ctx){
        ctx.fillStyle = color;
        ctx.font = fontSize + 'px/1 " bold'; //32 + 'px " bold';
        let x = 0
        const tm = ctx.measureText(str)
        let y = fontSize* 0.8

        switch(align){
            case 'left':
                x=0; break;
            case 'center':
                x = (width - tm.width)/2
                break;
            case 'right':
                x = width - tm.width
                break;
            default:
                break;
        }
        ctx.fillText(str,x,y)
    }
    return canvas;
}

function getStrGeometry(str: string, {
    width = 0.2,
    height = 0.2,
    color = '#fff',
    fontSize = 18,
    align = 'center',
}: StrConfig = {} as StrConfig){
    const strCfg = {
        width: width < 20 ? 20 : width,
        height: height < 20 ? 20 : height,
        color,
        fontSize,
        align,
    }
    const gemoetry = new PlaneGeometry(strCfg.width, strCfg.height)
    let material = new MeshBasicMaterial({ 
        map: new CanvasTexture(getStrCanvas(str, strCfg)),
        side: DoubleSide // 双面渲染
        // transparent: true
     })
    let mesh = new Mesh(gemoetry, material)
    let mesh_ = new Mesh(gemoetry, material)
    // mesh_.position.set(0, 0, -0.01)
    // mesh_.rotateY(Math.PI)
    if(width < 20 || height < 20){
        mesh.scale.set(width / strCfg.width, height / strCfg.height, 1)
        // mesh_.scale.set(width / strCfg.width, height / strCfg.height ,1)
    }
    let res3d =  new Object3D().add(mesh)//.add(mesh_)
    return res3d
}

// http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Group
export class Cube extends Group {
    private data: CubeData;
    // public state!: CubeState;
    // public haxes: Object3D; // 辅助坐标轴
    // public daxes: Object3D; // 调试用标轴

    private get squaresBg(){
        return "#ffffff"
    }

    public get squares() {
        return this.children as SquareMesh[];
    }

    /**
     * 魔方阶数
     */
    public get order() {
        return this.data.cubeOrder;
    }

    /**
     * 方块大小
     */
    private _size = 1;
    public get squareSize() {
        return this._size;
    }

    // /**
    //  * 是否处于完成状态
    //  */
    // public get finish() {
    //     return this.state.validateFinish();
    // }

    public getLabAxes(axesLength:number){

        let haxes = new AxesHelper(axesLength); // 初始化辅助坐标轴
        let o3d = new Object3D()

        let xStr = getStrGeometry('x')
        let yStr = getStrGeometry('y')
        let zStr = getStrGeometry('z')
        xStr.position.set(axesLength, 0, 0)
        yStr.position.set(0, axesLength, 0)
        zStr.position.set(0, 0, axesLength)

        o3d.add(haxes)
        o3d.add(xStr)
        o3d.add(yStr)
        o3d.add(zStr)
        return o3d
    }
    public constructor(order = 3) {
        super();

        this.data = new CubeData(order); // 初始化魔方数据

        this.createChildrenByData(); // 魔方数据转为3d对象，初始化控制状态

        // // 对应轴线的右手性旋转
        // // 世界坐标系
        // this.rotateX(Math.PI * 0.25);
        // this.rotateY(Math.PI * 0.25);

        // const axesLength = this.order * 0.8
        // let haxes = this.getLabAxes(axesLength)
        // haxes.rotateX(Math.PI * 0.25); // 辅助坐标轴旋转
        // haxes.rotateY(Math.PI * 0.25);

        // this.haxes = haxes
        
        // let daxes = this.getLabAxes(this.order * 0.3)
        // this.daxes = daxes
    }

    private createChildrenByData() {
        this.remove(...this.children);

        // for (let i = 0; i < this.data.elements.length; i++) {
        //     const square = createSquare(this.data.elements[i], new Color(this.squaresBg)); // 把数据转换为 Object3D 物体
        //     this.add(square); // 添加到 Group 中
        // }

        // this.state = new CubeState(this.squares);
    }

    // /**
    //  * 旋转一个面
    //  * @param mousePrePos 旋转前的鼠标的屏幕坐标 
    //  * @param mouseCurPos 此时的鼠标屏幕坐标
    //  * @param controlSquare 控制的方块
    //  * @param camera 相机
    //  * @param winSize 窗口大小
    //  */
    // public rotateOnePlane(mousePrePos: Vector2, mouseCurPos: Vector2, controlSquare: SquareMesh, camera: Camera, winSize: {w: number; h: number}) {
    //     if (mouseCurPos.distanceTo(mousePrePos) < 5) {
    //         return;
    //     }

    //     if (!this.squares.includes(controlSquare)) { // 点击的不是魔方方块不触发方块旋转
    //         return;
    //     }

    //     const screenDir = mouseCurPos.clone().sub(mousePrePos); // 鼠标的移动方向向量
    //     if (screenDir.x === 0 && screenDir.y === 0) return;
    //     if (!this.state.inRotation) { // 开始触发旋转
    //         const squareScreenPos = this.getSquareScreenPos(controlSquare, camera, winSize) as Vector2; // 获取触发方块的屏幕坐标
    //         afterDotDom(squareScreenPos.x, squareScreenPos.y )

    //         const squareNormal = controlSquare.element.normal;
    //         const squarePos = controlSquare.element.pos;

    //         // 与 controlSquare 在同一面的其他 Square
    //         const commonDirSquares = this.squares.filter((square) =>  // 同一面并且不是自己
    //             square.element.normal.equals(squareNormal) && !square.element.pos.equals(squarePos)
    //         );

    //         // square1 和 sqaure2 垂直和竖直方向的同一面的两个 SquareMesh
    //         // 找到同一行和同一列上的两个 SquareMesh
    //         let square1: SquareMesh | undefined;
    //         let square2: SquareMesh | undefined;
    //         for (let i = 0; i < commonDirSquares.length; i++) {
    //             if (squareNormal.x !== 0) {
    //                 if (commonDirSquares[i].element.pos.y === squarePos.y) {
    //                     square1 = commonDirSquares[i];
    //                 }
    //                 if (commonDirSquares[i].element.pos.z === squarePos.z) {
    //                     square2 = commonDirSquares[i];
    //                 }
    //             } else if (squareNormal.y !== 0) {
    //                 if (commonDirSquares[i].element.pos.x === squarePos.x) {
    //                     square1 = commonDirSquares[i];
    //                 }
    //                 if (commonDirSquares[i].element.pos.z === squarePos.z) {
    //                     square2 = commonDirSquares[i];
    //                 }
    //             } else if (squareNormal.z !== 0) {
    //                 if (commonDirSquares[i].element.pos.x === squarePos.x) {
    //                     square1 = commonDirSquares[i];
    //                 }
    //                 if (commonDirSquares[i].element.pos.y === squarePos.y) {
    //                     square2 = commonDirSquares[i];
    //                 }
    //             }

    //             if (square1 && square2) {
    //                 break;
    //             }
    //         }

    //         if (!square1 || !square2) {
    //             return;
    //         }

    //         const square1ScreenPos = this.getSquareScreenPos(square1, camera, winSize) as Vector2;
    //         const square2ScreenPos = this.getSquareScreenPos(square2, camera, winSize) as Vector2;

    //         // 记录可能旋转的四个方向
    //         const squareDirs: RotateDirection[] = [];

    //         const squareDir1 = {
    //             screenDir: new Vector2(square1ScreenPos.x - squareScreenPos.x, square1ScreenPos.y - squareScreenPos.y).normalize(),
    //             startSquare: controlSquare,
    //             endSquare: square1
    //         };
    //         const squareDir2 = {
    //             screenDir: new Vector2(square2ScreenPos.x - squareScreenPos.x, square2ScreenPos.y - squareScreenPos.y).normalize(),
    //             startSquare: controlSquare,
    //             endSquare: square2
    //         };
    //         squareDirs.push(squareDir1);
    //         squareDirs.push({
    //             screenDir: squareDir1.screenDir.clone().negate(),
    //             startSquare: square1,
    //             endSquare: controlSquare
    //         });
    //         squareDirs.push(squareDir2);
    //         squareDirs.push({
    //             screenDir: squareDir2.screenDir.clone().negate(),
    //             startSquare: square2,
    //             endSquare: controlSquare
    //         });

    //         // 根据可能旋转的四个方向向量与鼠标平移方向的夹角确定旋转的方向，夹角最小的方向即为旋转方向
    //         let minAngle = Math.abs(getAngleBetweenTwoVector2(squareDirs[0].screenDir, screenDir));
    //         let rotateDir = squareDirs[0];  // 最终确定的旋转方向

    //         for (let i = 0; i < squareDirs.length; i++) {
    //             const angle = Math.abs(getAngleBetweenTwoVector2(squareDirs[i].screenDir, screenDir));

    //             if (minAngle > angle) {
    //                 minAngle = angle;
    //                 rotateDir = squareDirs[i];
    //             }
    //         }

    //         // 旋转轴：用法向量与旋转的方向的叉积计算
    //         const rotateDirLocal = rotateDir.endSquare.element.pos.clone().sub(rotateDir.startSquare.element.pos).normalize();
    //         const rotateAxisLocal = squareNormal.clone().cross(rotateDirLocal).normalize(); // 旋转的轴

    //         // 旋转的方块：由 controlSquare 位置到要旋转的方块的位置的向量，与旋转的轴是垂直的，通过这一特性可以筛选出所有要旋转的方块
    //         const rotateSquares: SquareMesh[] = [];
    //         const controlTemPos = getTemPos(controlSquare, this.data.elementSize);
    //         // const controlTemPos = controlSquare.element.pos.clone()
    //         // 为什么要做一个位置偏移? 让垂直面(侧面)的中心点也能落小立方块的中心点上

    //         for (let i = 0; i < this.squares.length; i++) {
    //             const squareTemPos = getTemPos(this.squares[i], this.data.elementSize);
    //             // const squareTemPos = this.squares[i].element.pos
    //             const squareVec = controlTemPos.clone().sub(squareTemPos);
    //             if (squareVec.dot(rotateAxisLocal) === 0) {
    //                 rotateSquares.push(this.squares[i]);
    //             }
    //         }

    //         this.state.setRotating(controlSquare, rotateSquares, rotateDir, rotateAxisLocal); // 开始旋转
    //     }

    //     const rotateSquares = this.state.activeSquares; // 旋转的方块
    //     const rotateAxisLocal = this.state.rotateAxisLocal; // 旋转的轴

    //     // 旋转的角度：使用 screenDir 在旋转方向上的投影长度，投影长度越长，旋转角度越大
    //     // 投影长度的正负值影响魔方旋转的角度方向
    //     // 旋转的角度 = 投影的长度 / 魔方的尺寸 * 90度
    //     const temAngle = getAngleBetweenTwoVector2(this.state.rotateDirection!.screenDir, screenDir); // 鼠标移动方向和旋转方向的夹角
    //     const screenDirProjectRotateDirLen = Math.cos(temAngle) * screenDir.length(); // 鼠标移动距离在旋转方向上的投影
    //     const coarseCubeSize = this.getCoarseCubeSize(camera, winSize); // 魔方尺寸
    //     const rotateAnglePI = screenDirProjectRotateDirLen / coarseCubeSize * Math.PI * 0.5; // 旋转角度
    //     const newRotateAnglePI = rotateAnglePI - this.state.rotateAnglePI;
    //     this.state.rotateAnglePI = rotateAnglePI;

    //     const rotateMat = new Matrix4();
    //     // https://threejs.org/docs/index.html?q=Matrix4#api/en/math/Matrix4.makeRotationAxis
    //     rotateMat.makeRotationAxis(rotateAxisLocal!, newRotateAnglePI); // 旋转矩阵

    //     for (let i = 0; i < rotateSquares.length; i++) {
    //         rotateSquares[i].applyMatrix4(rotateMat); // 对小方面应用旋转变换
    //         rotateSquares[i].updateMatrix(); // 更新结果 // 在random 的时候会自动更新，如果debug中间过程需要手动调用更新
    //     }
    // }

    // /**
    //  * 旋转后需要更新 cube 的状态
    //  */
    // public getAfterRotateAnimation() {
    //     const needRotateAnglePI = this.getNeededRotateAngle();
    //     const rotateSpeed = Math.PI * 0.5 / 500; // 1s 旋转90度
    //     let rotatedAngle = 0;
    //     let lastTick: number;
    //     let rotateTick = (tick: number): boolean => {
    //         if (!lastTick) {
    //             lastTick = tick;
    //         }
    //         const time = tick - lastTick;
    //         lastTick = tick;
    //         if (rotatedAngle < Math.abs(needRotateAnglePI)) {
    //             let curAngle = time * rotateSpeed
    //             if (rotatedAngle + curAngle > Math.abs(needRotateAnglePI)) {
    //                 curAngle = Math.abs(needRotateAnglePI) - rotatedAngle;
    //             }
    //             rotatedAngle += curAngle;
    //             curAngle = needRotateAnglePI > 0 ? curAngle : -curAngle;

    //             const rotateMat = new Matrix4();
    //             rotateMat.makeRotationAxis(this.state.rotateAxisLocal!, curAngle);
    //             for (let i = 0; i < this.state.activeSquares.length; i++) {
    //                 this.state.activeSquares[i].applyMatrix4(rotateMat);
    //                 this.state.activeSquares[i].updateMatrix();
    //             }
    //             return true;
    //         } else {
    //             this.updateStateAfterRotate();
    //             this.data.saveDataToLocal();
    //             return false;
    //         }
    //     }

    //     return rotateTick;
    // }

    // /**
    //  * 旋转后更新状态
    //  */
    // private updateStateAfterRotate() {
    //     // 旋转至正位，有时旋转的不是90度的倍数，需要修正到90度的倍数
    //     const needRotateAnglePI = this.getNeededRotateAngle();
    //     this.state.rotateAnglePI += needRotateAnglePI;

    //     // 更新 data：CubeElement 的状态，旋转后法向量、位置等发生了变化
    //     const angleRelative360PI = this.state.rotateAnglePI % (Math.PI * 2); // 把旋转角度限制在360度以内
    //     // const timesOfRight = angleRelative360PI / rightAnglePI; // 旋转的角度相当于几个90度

    //     if (Math.abs(angleRelative360PI) > 0.1) { // 不是整360 度的

    //         // 更新位置和法向量
    //         const rotateMat2 = new Matrix4();
    //         rotateMat2.makeRotationAxis(this.state.rotateAxisLocal!, angleRelative360PI);

    //         const pn: {
    //             nor: Vector3;
    //             pos: Vector3;
    //         }[] = [];

    //         for (let i = 0; i < this.state.activeSquares.length; i++) {
    //             // 更新 SquareMesh.element 的法向量和中心位置数据 // 回头这些写成get 方法
    //             const nor = this.state.activeSquares[i].element.normal.clone();
    //             const pos = this.state.activeSquares[i].element.pos.clone();

    //             nor.applyMatrix4(rotateMat2); // 旋转后的法向量
    //             pos.applyMatrix4(rotateMat2); // 旋转后的位置

    //             // 找到与旋转后对应的方块，更新它的颜色
    //             // ??
    //             for (let j = 0; j < this.state.activeSquares.length; j++) { // 为著名又要重新找一遍
    //                 const nor2 = this.state.activeSquares[j].element.normal.clone();
    //                 const pos2 = this.state.activeSquares[j].element.pos.clone();
    //                 if (equalDirection(nor, nor2) && pos.distanceTo(pos2) < 0.1) { // 法向量角度相同 并且 pos 到pos2的距离为0 (位置相同)
    //                     pn.push({
    //                         nor: nor2,
    //                         pos: pos2
    //                     });
    //                 }
    //             }
    //         }

    //         for (let i = 0; i < this.state.activeSquares.length; i++) { // 更新限制角度后的向量
    //             this.state.activeSquares[i].element.normal = pn[i].nor;
    //             this.state.activeSquares[i].element.pos = pn[i].pos;
    //         }
    //     }

    //     if (this.d_squareScreen){
    //         for (; this.d_squareScreen.length;){
    //             let item = this.d_squareScreen.pop()
    //             item!.children[0].scale.set(0.9, 0.9, 0.9);
    //         }
    //     }
    //     this.state.resetState(); // 结束旋转 
    // }



    // private getNeededRotateAngle() {
    //     const rightAnglePI = Math.PI * 0.5;
    //     const exceedAnglePI = Math.abs(this.state.rotateAnglePI) % rightAnglePI;
    //     let needRotateAnglePI = exceedAnglePI > rightAnglePI * 0.5 ? rightAnglePI - exceedAnglePI : -exceedAnglePI;
    //     needRotateAnglePI = this.state.rotateAnglePI > 0 ? needRotateAnglePI : -needRotateAnglePI;

    //     return needRotateAnglePI;
    // }
    /**
     * 获取一个粗糙的魔方屏幕尺寸
     */
    public getCoarseCubeSize(camera: Camera, winSize: {w: number; h: number}) {
        // const width = this.order * this.squareSize;
        // const p1 = new Vector3(-width / 2, 0, 0);
        // const p2 = new Vector3(width / 2, 0, 0);

        // // https://threejs.org/docs/index.html#api/en/math/Vector3.project
        // // 坐标点在相机坐标系中的位置
        // p1.project(camera);
        // p2.project(camera);

        // const {w, h} = winSize;
        // const screenP1 = ndcToScreen(p1, w, h);
        // const screenP2 = ndcToScreen(p2, w, h); // todo

        // return Math.abs(screenP2.x - screenP1.x);
        return 1
    }

    // /**
    //  * 获得 Square 的标准屏幕坐标
    //  */
    // private getSquareScreenPos(square: SquareMesh, camera: Camera, winSize: {w: number; h: number}) {
    //     if (!this.squares.includes(square)) {
    //         return null;
    //     }
    //     // 一次点击会触发3次
    //     this.d_squareScreen.push(square);
    //     square.children[0].scale.set(0.7, 0.7, 0.7);

    //     // console.log('square.matrixWorld, this.matrix', square.matrixWorld, this.matrix)

    //     // this.matrix: The local transform matrix // https://threejs.org/docs/index.html#api/en/core/Object3D.matrix
    //     // square.matrixWorld: The global transform of the object // https://threejs.org/docs/index.html#api/en/core/Object3D.matrixWorld
    //     // Matrix4.multiply: Post-multiplies this matrix by m. // https://threejs.org/docs/index.html#api/en/math/Matrix4.multiply
    //     const mat = new Matrix4().multiply(square.matrixWorld).multiply(this.matrix);
    //     // new Matrix4() 得到一个单位矩阵 对角为1
    //     // .matrix描述了物体自己的 偏移缩放旋转 变换数据
    //     // .matrixWorld 是本地矩阵和所有父对象本地矩阵的乘积，或者是对象本地矩阵和父对象的世界矩阵的乘积
    //     // Three.js本地矩阵.materix和世界矩阵.matrixWorld http://www.yanhuangxueyuan.com/doc/Three.js/matrixWorld.html
    //     // 后面的这个.multiply(this.matrix);好像不是必要的

    //     // Vector3.applyMatrix4: v3的第4维度为1和v4相乘,并且除以透视? https://threejs.org/docs/#api/en/math/Vector3.applyMatrix4
    //     // 在v3上应用v4转换, v4和v4 直接相乘，v4用在v3上用applyMatrix4
    //     // new Vector3() 是0,0,0啊
    //     const pos = new Vector3().applyMatrix4(mat);
    //     pos.project(camera);
    //     if (square == this.d_squareScreen[0]){
    //         this.daxes.position.set(0, 0, 0)
    //         this.daxes.rotation.set(0, 0, 0)
    //         this.daxes.scale.set(1, 1, 1)
    //         this.daxes.updateMatrix()
    //         this.daxes.applyMatrix4(mat)
    //         this.daxes.position.add(new Vector3( 4, 0, 0))
    //     }

    //     const {w, h} = winSize;
    //     return ndcToScreen(pos, w, h);
    // }

    // /**
    //  * 打乱
    //  */
    // public disorder() {

    // }

    // public restore() {
    //     this.data.initialFinishData();
    //     this.data.saveDataToLocal();
    //     this.createChildrenByData();
    //     setFinish(this.finish);
    // }
};

