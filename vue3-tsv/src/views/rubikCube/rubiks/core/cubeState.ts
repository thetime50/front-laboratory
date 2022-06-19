import { Vector3, Vector2, Euler, Quaternion } from "three";
import { SquareMesh, FaceMesh } from "./square";

export interface RotateDirection {
    dir2: Vector2; // 屏幕坐标轴
    dir3: Vector3; // 世界坐标轴
}


/**
 * 交互状态控制
 * 还原状态判断
 * 交互开始 和交互停止状态数据管理
 */

class CubeState {
    /** 所有方块 */
    private _squares: SquareMesh[];
    /** 是否正处于旋转状态 */
    public inRotation = false;
    /**
     * 已经旋转的角度（弧度）
     */
    public rotateAnglePI = 0;
    /** 正在旋转的方块 */
    public activeSquares: SquareMesh[] = [];
    /** 控制的方块 */
    public controlSquare: SquareMesh | undefined; // 鼠标第一帧交互的结果??
    /** 旋转方向 */
    public rotateDirection: RotateDirection | undefined;
    /** 旋转轴 */
    public rotateAxisLocal: Vector3 | undefined;
    public constructor(squares: SquareMesh[]) {
        this._squares = squares;
    }

    public setRotating(control: SquareMesh, actives: SquareMesh[], direction: RotateDirection, rotateAxisLocal: Vector3) {
        this.inRotation = true;
        this.controlSquare = control;
        this.activeSquares = actives;
        this.rotateDirection = direction;
        this.rotateAxisLocal = rotateAxisLocal;
    }

    public resetState() {
        this.inRotation = false;
        this.activeSquares = [];
        this.controlSquare = undefined;
        this.rotateDirection = undefined;
        this.rotateAxisLocal = undefined;
        this.rotateAnglePI = 0;
    }

    /**
     * 是否是六面对齐
     */
    public validateFinish() {
        let finish = true;
        let planeMap: {
            [key:string]: {
                dir: Vector3; // 面的原始法线方向
                wdir: Vector3; // 转换为世界轴方向
                // squares: Array<SquareMesh>
            }
        } = {}
        this._squares.forEach(square => {
            if (square.element.face!.length) {
                const faceMesh = square.children.find((item) => {
                    return item instanceof FaceMesh
                }) as FaceMesh | undefined;
                console.log('faceMesh!.face_', faceMesh!.face_)
                let face = faceMesh!.face_;
                let key = face.dir.toArray().join(',')
                if (!planeMap[key]){
                    planeMap[key] = {
                        dir: face.dir,
                        wdir: face.dir.clone().applyQuaternion(faceMesh!.getWorldQuaternion(new Quaternion())),
                        // squares: []
                    }
                }
            }
        })

        const faceList = this._squares.reduce((a: FaceMesh[],v)=>{
            return a.concat(
                v.children.filter(item=>{
                    return item instanceof FaceMesh
                }) as Array<FaceMesh>
            )
        }, [])
        finish = faceList.every(faceMesh => {
            let res = true
            let dir = faceMesh!.face_.dir; // 面的原始法线方向
            let key = dir.toArray().join(',')
            let wdir = dir.clone().applyQuaternion(faceMesh!.getWorldQuaternion(new Quaternion()))
            if(planeMap[key].dir.equals(dir) && planeMap[key].wdir.equals(wdir)){
                res = true
            }
            return 
        })

        return finish;
    }
}

export default CubeState;
