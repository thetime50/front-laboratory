import { Vector3, Vector2, /* Euler, */ Quaternion } from "three";
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
        const planeMap: {
            [key:string]: {
                dir: Vector3; // 面的原始法线方向
                wdir: Vector3; // 转换为世界轴方向
                // squares: Array<SquareMesh>
            }
        } = {}

        const faceList = this._squares.reduce((a: FaceMesh[],v)=>{
            return a.concat(
                v.children.filter(item=>{
                    return item instanceof FaceMesh
                }) as Array<FaceMesh>
            )
        }, [])
        
        faceList.find(faceMesh =>{
            if (!faceMesh.face_) return
            const face = faceMesh.face_;
            const key = face.dir.toArray().join(',')
            if (!planeMap[key]) {
                planeMap[key] = {
                    dir: face.dir,
                    wdir: new Vector3(0,0,1).applyQuaternion(faceMesh.getWorldQuaternion(new Quaternion()).invert()),
                    // squares: []
                }
                if (Object.keys(planeMap).length >= 6) {
                    return true
                }
            }
        })
        console.log('planeMap', planeMap)

        
        finish = faceList.every(faceMesh => {
            let res = true
            const dir = faceMesh.face_.dir; // 面的原始法线方向
            const key = dir.toArray().join(',')
            const wdir = new Vector3(0, 0, 1).applyQuaternion(faceMesh.getWorldQuaternion(new Quaternion()).invert())
            // if (planeMap[key].wdir.equals(wdir)) {
            if (wdir.clone().sub(planeMap[key].wdir).length() < 0.001) {
                res = true
            }else{
                res = false
            }
            return res
        })

        return finish;
    }
}

export default CubeState;
