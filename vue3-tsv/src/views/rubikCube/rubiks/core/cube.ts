import { 
    Camera, Color, Group, Matrix4, Vector2, Vector3, 
    Object3D, AxesHelper, PlaneGeometry, MeshBasicMaterial, 
    CanvasTexture, Mesh, DoubleSide, Quaternion } from "three";
// import { setFinish, afterDotDom } from "./statusbar";
import {getAngleBetweenTwoVector2, equalDirection} from "../util/math";
import {ndcToScreen} from "../util/transform";
import CubeData from "./cubeData"; // 方块数据
import { createSquare, SquareMesh, squarePos2dataPos } from "./square"; // 方块实体
import CubeState, {RotateDirection} from "./cubeState"; // 交互数据
import {dbg} from "../util/dbg";

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

export interface SquareInfo { // 点击方块消息
    distance: number; // 距离
    square: SquareMesh; // 碰撞的方面
    point: Vector3; // 碰撞点
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
    public state!: CubeState;
    public haxes: Object3D; // 辅助坐标轴
    // public daxes: Object3D; // 调试用标轴

    private get squaresBg(){
        return "#eeeeee"
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
    public get finish() {
        return this.state.validateFinish();
    }

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

        // 对应轴线的右手性旋转
        // 世界坐标系
        this.rotateX(Math.PI * 0.25);
        this.rotateY(Math.PI * 0.25);

        const axesLength = this.order * 0.8
        let haxes = this.getLabAxes(axesLength)
        haxes.rotateX(Math.PI * 0.25); // 辅助坐标轴旋转
        haxes.rotateY(Math.PI * 0.25);
        this.haxes = haxes

        
        // let daxes = this.getLabAxes(this.order * 0.3)
        // this.daxes = daxes
    }

    private createChildrenByData() {
        this.remove(...this.children);

        for (let i = 0; i < this.data.elements.length; i++) {
            const square = createSquare(this.order, this.squareSize, this.data.elements[i], new Color(this.squaresBg)); // 把数据转换为 Object3D 物体
            this.add(square); // 添加到 Group 中
        }

        this.state = new CubeState(this.squares);
    }

    // /**
    //  * 旋转一个面
    //  * @param mousePrePos 旋转前的鼠标的屏幕坐标 
    //  * @param mouseCurPos 此时的鼠标屏幕坐标
    //  * @param controlSquare 控制的方块
    //  * @param camera 相机
    //  * @param winSize 窗口大小
    //  */
    public rotateOnePlane(
            mousePrePos: Vector2, 
            mouseCurPos: Vector2, 
            controlSquareInfo: SquareInfo, 
            camera: Camera, 
            winSize: {w: number; h: number}
        ) {
        if (mouseCurPos.distanceTo(mousePrePos) < 5) {
            return;
        }

        if (!this.squares.includes(controlSquareInfo.square)) { // 点击的不是魔方方块不触发方块旋转
            return;
        }

        const screenDir = mouseCurPos.clone().sub(mousePrePos); // 鼠标的移动方向向量
        if (screenDir.x === 0 && screenDir.y === 0) return;
        if (!this.state.inRotation) { // 开始触发旋转
            
            let w2sQt = controlSquareInfo.square.getWorldQuaternion(new Quaternion())
            let w2cQt = this.getWorldQuaternion( new Quaternion() )

            function world2cube(v: Vector3) {
                return v.applyQuaternion(w2cQt.clone().invert())
            }
            function world2square(v: Vector3) {
                return v.applyQuaternion(w2sQt.clone().invert())
            }
            function square2world(v: Vector3) {
                return v.applyQuaternion(w2sQt)
            }

            // 点击面的法线
            let touchNormal = controlSquareInfo.point.clone().sub(
                controlSquareInfo.square.getWorldPosition(new Vector3())
            ); // 方块中心到点击点的连线
            world2square(touchNormal); // 将世界坐标转换为本地坐标  // 魔方旋转变换
            let maxIndex = 0
            let maxAbs = 0
            let max = 0
            let normalArr = [0,0,0]
            touchNormal.toArray().forEach((v,i) => {
                if (Math.abs(v) > maxAbs) {
                    maxAbs = Math.abs(v)
                    maxIndex = i
                    max = v
                }
            })
            normalArr[maxIndex] = max > 0 ? 1 : -1
            // 计算点击面法向量转换到世界坐标
            // 确认一下方向问题
            touchNormal = new Vector3(...normalArr);
            touchNormal = square2world(touchNormal).normalize(); // 魔方旋转变换
            
            // 可能的4个旋转方向屏幕向量
            let squareDirs: Array<RotateDirection> = []
            dbg?.lineRemove()

            touchNormal.toArray().forEach((item,index) => {
                if (index !== maxIndex) { // 不是法线轴
                    let dir3Arr = [0,0,0]
                    dir3Arr[index] = 1
                    // 这里还有问题
                    let dir3 = square2world( new Vector3(...dir3Arr)).normalize() // 物体的坐标轴线转换为世界轴
                    let dir2 = this.getSquareScreenVector(controlSquareInfo.point, dir3, camera, winSize) // 点击点到坐标轴的距离
                    squareDirs.push( {
                        dir3: dir3,
                        dir2: new Vector2(dir2.x, dir2.y).normalize(),
                    } )

                    dbg?.webLineAdd(new Vector2(0, 0), new Vector2(dir2.x, dir2.y))
                    dir2 = this.getSquareScreenVector(controlSquareInfo.point, dir3.clone().negate(), camera, winSize) // 点击点到坐标轴的距离
                    squareDirs.push({
                        dir3: dir3.clone().negate(),
                        dir2: new Vector2(dir2.x, dir2.y).normalize(),
                    })
                    dbg?.webLineAdd(new Vector2(0, 0), new Vector2(dir2.x, dir2.y))
                    
                }
            })
            let temp = controlSquareInfo.point.clone()
            // temp.z = 0
            let pro = temp.project(camera)
            let test = ndcToScreen(temp.project(camera), winSize.w, winSize.h)
            dbg?.afterDotDom(test.x + winSize.w / 2, winSize.h/2 - test.y)
            // dbg?.afterDotDom(pro.x * winSize.w / 2 + winSize.w / 2, winSize.h / 2 - pro.y * winSize.w / 2)


            // 根据可能旋转的四个方向向量与鼠标平移方向的夹角确定旋转的方向，夹角最小的方向即为旋转方向
            let minAngle = Math.PI * 2;
            let rotateDir = squareDirs[0];  // 最终确定的旋转方向

            for (let i = 0; i < squareDirs.length; i++) {
                // console.log('squareDirs[i].dir2.angle() , screenDir.angle()', squareDirs[i].dir2.angle() , screenDir.angle())
                const angle = Math.abs(squareDirs[i].dir2.angle() - screenDir.angle());

                if (minAngle > angle) {
                    minAngle = angle;
                    rotateDir = squareDirs[i];
                }
            }

            // 旋转轴：用法向量与旋转的方向的叉积计算
            const rotateAxisWorld = touchNormal.clone().cross(rotateDir.dir3).normalize(); // 旋转的轴
            dbg?.drawArrows(controlSquareInfo.point, rotateAxisWorld, '#ff0000')

            // 旋转的方块：由 controlSquare 位置到要旋转的方块的位置的向量，与旋转的轴是垂直的，通过这一特性可以筛选出所有要旋转的方块
            const rotateSquares: SquareMesh[] = [];
            rotateSquares.push(controlSquareInfo.square)

            for (let i = 0; i < this.squares.length; i++) {
                if ( controlSquareInfo.square!=this.squares[i] ){
                    let line = controlSquareInfo.square.getWorldPosition(new Vector3()).sub(this.squares[i].getWorldPosition(new Vector3()))
                    if (Math.abs(line.dot(rotateAxisWorld)) < 0.01 * this.squareSize) {
                        rotateSquares.push(this.squares[i]);
                    }
                }
            }

            this.state.setRotating(controlSquareInfo.square, rotateSquares, rotateDir, world2cube( rotateAxisWorld)); // 开始旋转
        }

        const rotateSquares = this.state.activeSquares; // 旋转的方块
        const rotateAxisLocal = this.state.rotateAxisLocal; // 旋转的轴

        // 旋转的角度：使用 screenDir 在旋转方向上的投影长度，投影长度越长，旋转角度越大
        // 投影长度的正负值影响魔方旋转的角度方向
        // 旋转的角度 = 投影的长度 / 魔方的尺寸 * 90度
        const temAngle = getAngleBetweenTwoVector2(this.state.rotateDirection!.dir2, screenDir); // 鼠标移动方向和旋转方向的夹角
        const screenDirProjectRotateDirLen = Math.cos(temAngle) * screenDir.length(); // 鼠标移动距离在旋转方向上的投影
        const coarseCubeSize = this.getCoarseCubeSize(camera, winSize); // 魔方屏幕尺寸
        const rotateAnglePI = screenDirProjectRotateDirLen / coarseCubeSize * Math.PI * 0.5; // 旋转角度
        const newRotateAnglePI = rotateAnglePI - this.state.rotateAnglePI;
        this.state.rotateAnglePI = rotateAnglePI;

        const rotateMat = new Matrix4();
        // https://threejs.org/docs/index.html?q=Matrix4#api/en/math/Matrix4.makeRotationAxis
        rotateMat.makeRotationAxis(rotateAxisLocal!, newRotateAnglePI); // 旋转矩阵

        for (let i = 0; i < rotateSquares.length; i++) {
            rotateSquares[i].applyMatrix4(rotateMat); // 对小方面应用旋转变换
            rotateSquares[i].updateMatrix(); // 更新结果 // 在random 的时候会自动更新，如果debug中间过程需要手动调用更新
        }
    }

    // /**
    //  * 旋转后需要更新 cube 的状态
    //  */
    public getAfterRotateAnimation() {
        const needRotateAnglePI = this.getNeededRotateAngle();
        const rotateSpeed = Math.PI * 0.5 / 500; // 1s 旋转90度
        let rotatedAngle = 0;
        let lastTick: number;
        let rotateTick = (tick: number): boolean => {
            if (!lastTick) {
                lastTick = tick;
            }
            const time = tick - lastTick;
            lastTick = tick;
            if (rotatedAngle < Math.abs(needRotateAnglePI)) {
                let curAngle = time * rotateSpeed
                if (rotatedAngle + curAngle > Math.abs(needRotateAnglePI)) {
                    curAngle = Math.abs(needRotateAnglePI) - rotatedAngle;
                }
                rotatedAngle += curAngle;
                curAngle = needRotateAnglePI > 0 ? curAngle : -curAngle;

                const rotateMat = new Matrix4();
                rotateMat.makeRotationAxis(this.state.rotateAxisLocal!, curAngle);
                for (let i = 0; i < this.state.activeSquares.length; i++) {
                    this.state.activeSquares[i].applyMatrix4(rotateMat);
                    this.state.activeSquares[i].updateMatrix();
                }
                return true;
            } else {
                this.updateStateAfterRotate();
                this.data.saveDataToLocal();
                return false;
            }
        }

        return rotateTick;
    }

    // /**
    //  * 旋转后更新状态
    //  */
    private updateStateAfterRotate() {
        // 旋转至正位，有时旋转的不是90度的倍数，需要修正到90度的倍数
        const needRotateAnglePI = this.getNeededRotateAngle();
        this.state.rotateAnglePI += needRotateAnglePI;

        // 更新 data：CubeElement 的状态，旋转后法向量、位置等发生了变化
        const angleRelative360PI = this.state.rotateAnglePI % (Math.PI * 2); // 把旋转角度限制在360度以内
        // const timesOfRight = angleRelative360PI / rightAnglePI; // 旋转的角度相当于几个90度

        if (Math.abs(angleRelative360PI) > 0.1) { // 不是整360 度的
            this.state.activeSquares.forEach((square)=>{

                let dataPos = squarePos2dataPos(this.order, this.squareSize, square.position.clone())
                square.element.position = dataPos
                square.element.rotation = square.rotation
            })
        }

        this.state.resetState(); // 结束旋转 
    }



    private getNeededRotateAngle() {
        const rightAnglePI = Math.PI * 0.5;
        const exceedAnglePI = Math.abs(this.state.rotateAnglePI) % rightAnglePI;
        let needRotateAnglePI = exceedAnglePI > rightAnglePI * 0.2 ? rightAnglePI - exceedAnglePI : -exceedAnglePI;
        needRotateAnglePI = this.state.rotateAnglePI > 0 ? needRotateAnglePI : -needRotateAnglePI;

        return needRotateAnglePI;
    }
    /**
     * 获取一个粗糙的魔方屏幕尺寸
     */
    public getCoarseCubeSize(camera: Camera, winSize: {w: number; h: number}) {
        const width = this.order * this.squareSize;
        const p1 = new Vector3(-width / 2, 0, 0);
        const p2 = new Vector3(width / 2, 0, 0);

        // https://threejs.org/docs/index.html#api/en/math/Vector3.project
        // 坐标点在相机坐标系中的位置
        p1.project(camera);
        p2.project(camera);

        const {w, h} = winSize;
        const screenP1 = ndcToScreen(p1, w, h);
        const screenP2 = ndcToScreen(p2, w, h); // todo

        return Math.abs(screenP2.x - screenP1.x);
    }

    // /**
    //  * 获得 Square 的标准屏幕坐标
    //  */
    private getSquareScreenPos(square: SquareMesh, camera: Camera, winSize: {w: number; h: number}) {
        if (!this.squares.includes(square)) {
            return null;
        }
        
        const pos = square.getWorldPosition(new Vector3())
        pos.project(camera);

        const {w, h} = winSize;
        return ndcToScreen(pos, w, h);
    }

    private getSquareScreenVector(opsition:Vector3, vector: Vector3, camera: Camera, winSize: {w: number; h: number}) {
        const pos = opsition.clone().project(camera);
        const vec = vector.clone().add(opsition).project(camera);
        const {w, h} = winSize; // 转换为web页面坐标方向和尺寸
        // return ndcToScreen(vec.sub(pos), w, h)
        vec.sub(pos)
        return new Vector2(
            vec.x * w/2,
            - vec.y * h/2,
        )
    }

    // /**
    //  * 打乱
    //  */
    // public disorder() {

    // }

    public restore() {
        this.data.initialFinishData();
        this.data.saveDataToLocal();
        this.createChildrenByData();
        this.rotation.setFromVector3(new Vector3(0,0,0) )
        this. rotateX(Math.PI * 0.25);
        this. rotateY(Math.PI * 0.25);
    }
};

