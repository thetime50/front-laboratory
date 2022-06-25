import {
    Vector3,
    Euler,
    // Color,
} from "three"

type ColorRepresentation = string // | number
export interface FaceItem {
    dir: Vector3,
    color: ColorRepresentation
}
export interface CubeElement {
    sn: number,
    origin: Vector3,
    position: Vector3,
    rotation: Euler,
    face?: Array<FaceItem>,
    withLogo?: boolean,
}

type CubeColor = [
    ColorRepresentation, ColorRepresentation, ColorRepresentation, 
    ColorRepresentation, ColorRepresentation, ColorRepresentation
]  //和 DirectionEnum 是对应的
// interface CubeColor extends Array<ColorRepresentation> {
//     // readonly length: 6; // 这个在赋值的时候不会自动检测为6
//     readonly [x : number]: ColorRepresentation;
// }
// type CubeColor = ReadonlyArray < ColorRepresentation > 

enum DirectionEnum {
    Top = 0,
    Bottom,
    Left,
    Right,
    Front,
    Back,
}

// function directionVector2Enum(dir: Vector3): DirectionEnum {
//     dir = dir.clone().normalize()
//     // let bitMap = (1 << (Math.max(dir.x, 0))) + (1 << (Math.max(dir.y, 0) + 2)) + (1 << (Math.max( dir.z,0)+4))
//     let dirStr = [dir.x, dir.y, dir.z].join(',')
//     const vecMap: {
//         [key: string]: DirectionEnum
//     } = {
//         '0,0,1': DirectionEnum.Front,
//         '0,0,-1': DirectionEnum.Back,
//         '0,1,0': DirectionEnum.Top,
//         '0,-1,0': DirectionEnum.Bottom,
//         '1,0,0': DirectionEnum.Right,
//         '-1,0,0': DirectionEnum.Left,
//     }
//     if (vecMap[dirStr]) {
//         return vecMap[dirStr]
//     }
//     console.error(dir)
//     throw new Error("directionVector2Enum error")
// }

function directionEnum2Vector3(dir: DirectionEnum): Vector3 {
    const enumMap = {
        [DirectionEnum.Top]: new Vector3(0, 1, 0),
        [DirectionEnum.Bottom]: new Vector3(0, -1, 0),
        [DirectionEnum.Left]: new Vector3(-1, 0, 0),
        [DirectionEnum.Right]: new Vector3(1, 0, 0),
        [DirectionEnum.Front]: new Vector3(0, 0, 1),
        [DirectionEnum.Back]: new Vector3(0, 0, -1),
    }
    if (enumMap[dir]) {
        return enumMap[dir]
    }
    console.error(dir)
    throw new Error("directionEnum2Vector3 error")
}


class CubeData {
    /**
     * 魔方阶级
     */
    public cubeOrder: number;
    /**
     * 魔方颜色：top、bottom、left、right、front、back
     */
    private colors: CubeColor;

    // private _size = 1; // 这里只使用原始数据
    // public get elementSize() {
    //     return this._size;
    // }
    public elements: CubeElement[] = [];
    public constructor(cubeOrder = 3, colors: CubeColor = [ // 这个颜色回头调一下
        "#fb3636", "#ff9351", "#fade70",
        "#9de16f", "#51acfa", "#da6dfa"
    ]) {
        // 红橘黄绿蓝紫
        this.cubeOrder = cubeOrder;
        this.colors = colors;
        this.initElements();
    }


    /**
     * 初始化数据
     * @param localDataFirst 是否从 localStorage 读取数据 
     */
    private initElements(localDataFirst = true) {
        if (localDataFirst && localStorage) {
            this.elements = this.getLocalData();
        }

        if (this.elements.length === this.cubeOrder ** 3 - (this.cubeOrder - 2) ** 3) { // 这里是每一个小面都是item吗
            return;
        }

        this.initialFinishData();
        this.saveDataToLocal()
    }

    private _orderSnFaceMaps: {
        [order: number]: ReadonlyArray< // cube
            ReadonlyArray</* squarer */ DirectionEnum>
        >
    } = {}
    private getOrderSnFaceMaps(order: number) {
        if (this._orderSnFaceMaps && this._orderSnFaceMaps[order]) {
            return this._orderSnFaceMaps[order]
        }
        // this._orderSnFaceMaps[order]
        const faceMap = []
        // 从左下后方到右上前方
        for (let z = 0; z < order; z++) {
            for (let y = 0; y < order; y++) {
                for (let x = 0; x < order;) {
                    const squarer = []
                    if (x == 0) {
                        squarer.push(DirectionEnum.Left)
                    }
                    if (z == 0) {
                        squarer.push(DirectionEnum.Back)
                    }
                    if (y == 0) {
                        squarer.push(DirectionEnum.Bottom)
                    }
                    if (y == order - 1) {
                        squarer.push(DirectionEnum.Top)
                    }
                    if (x == order - 1) {
                        squarer.push(DirectionEnum.Right)
                    }
                    if (z == order - 1) {
                        squarer.push(DirectionEnum.Front)
                    }
                    faceMap.push(squarer)


                    if (y !== 0 && y !== this.cubeOrder - 1 &&
                        z !== 0 && z !== this.cubeOrder - 1 &&
                        x == 0) {

                        x += this.cubeOrder - 1
                    } else {
                        x += 1
                    }
                }
            }
        }
        this._orderSnFaceMaps[order] = faceMap
        return faceMap
    }
    private getFaces(sn: number, order: number, colors: CubeColor) {

        const orderFaces = this.getOrderSnFaceMaps(order)
        return orderFaces[sn].map(item => ({
            dir: directionEnum2Vector3(item),
            color: colors[Number(item)],
        }))
    }

    // private xyz2position(x: number, y: number, z: number) {
    //     x = (x - (this.cubeOrder - 1) / 2) * this.elementSize
    //     y = (y - (this.cubeOrder - 1) / 2) * this.elementSize
    //     z = (z - (this.cubeOrder - 1) / 2) * this.elementSize

    //     return new Vector3(x, y, z)
    // }
    /**
     * 创建复原的数据
     */
    public initialFinishData() {
        this.elements = [];

        // let logoList: Array<{ x: number, y: number, z: number }> = []
        const logoList: Array<string> = []
        if (this.cubeOrder % 2) { // 奇数
            const z = this.cubeOrder - 1
            const x = (this.cubeOrder - 1) / 2
            const y = (this.cubeOrder - 1) / 2
            logoList.push([x, y, z].join(','))
        } else {// 偶数
            const z = this.cubeOrder - 1
            const x = this.cubeOrder / 2
            const y = this.cubeOrder / 2
            logoList.push([x, y, z].join(','))
            logoList.push([x - 1, y, z].join(','))
            logoList.push([x, y - 1, z].join(','))
            logoList.push([x - 1, y - 1, z].join(','))
        }

        for (let z = 0; z < this.cubeOrder; z++) {
            for (let y = 0; y < this.cubeOrder; y++) {
                for (let x = 0; x < this.cubeOrder;) {
                    const sn = this.elements.length
                    const withLogo = logoList.includes([x, y, z].join(','))

                    this.elements.push({
                        sn: sn,
                        origin: new Vector3(x, y, z),
                        position: new Vector3(x, y, z),
                        rotation: new Euler(0, 0, 0),
                        face: this.getFaces(sn, this.cubeOrder, this.colors),
                        withLogo: withLogo,
                    });
                    if(y!==0 && y !== this.cubeOrder - 1 &&
                        z!==0 && z !== this.cubeOrder - 1 &&
                        x==0){
                        
                        x += this.cubeOrder-1
                    }else{
                        x+=1
                    }
                }
            }
        }
    }


    /**
     * 保存数据至 localStorage
     */
    public saveDataToLocal() {
        const data = JSON.stringify(this.elements.map(item => ({
            sn: item.sn,
            origin: item.origin,
            position: item.position,
            rotation: item.rotation,
            // face: item.face.map(item => item.color.hex),
            withLogo: item.withLogo,
        })));

        if (localStorage) {
            localStorage.setItem(`${this.cubeOrder}-xRubik`, data);
        }
    }

    /**
     * 从 localStorage 读取数据
     * @returns 
     */
    public getLocalData() {
        try{
            if (localStorage) {
                const data = localStorage.getItem(`${this.cubeOrder}-xRubik`);

                if (data) {
                    const parseData: {
                        sn: number,
                        origin: { x: number; y: number; z: number },
                        position: { x: number; y: number; z: number },
                        rotation: { _x: number; _y: number; _z: number },
                        withLogo?: boolean,
                    }[] = JSON.parse(data);

                    const res: CubeElement[] = parseData.map((item) => {
                        return {
                            sn: item.sn,
                            origin: new Vector3(item.origin.x, item.origin.y, item.origin.z),
                            position: new Vector3(item.position.x, item.position.y, item.position.z),
                            rotation: new Euler(item.rotation._x, item.rotation._y, item.rotation._z),
                            face: this.getFaces(item.sn, this.cubeOrder, this.colors),
                            withLogo: item.withLogo,
                        }
                    });

                    return res;
                }
            }
        }catch(e){
            console.error(e)
        }

        return [];
    }
}

export default CubeData;
