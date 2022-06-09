import {
    Vector3,
    Euler,
    Color,
} from "three"

export interface ColorItem {
    dir: Vector3,
    color: Color
}
export interface CubeElement {
    sn: number,
    position: Vector3,
    rotation: Euler,
    faceColors?: Array<ColorItem>,
    withLogo?: boolean,
}

type CubeColor = [Color, Color, Color, Color, Color, Color]  //和 DirectionEnum 是对应的
// interface CubeColor extends Array<Color> {
//     // readonly length: 6; // 这个在赋值的时候不会自动检测为6
//     readonly [x : number]: Color;
// }
// type CubeColor = ReadonlyArray < Color > 

enum DirectionEnum {
    Top = 0,
    Bottom,
    Left,
    Right,
    Front,
    Back,
}

function directionVector2Enum(dir: Vector3): DirectionEnum {
    dir = dir.clone().normalize()
    // let bitMap = (1 << (Math.max(dir.x, 0))) + (1 << (Math.max(dir.y, 0) + 2)) + (1 << (Math.max( dir.z,0)+4))
    let dirStr = [dir.x, dir.y, dir.z].join(',')
    const vecMap: {
        [key: string]: DirectionEnum
    } = {
        '0,0,1': DirectionEnum.Front,
        '0,0,-1': DirectionEnum.Back,
        '0,1,0': DirectionEnum.Top,
        '0,-1,0': DirectionEnum.Bottom,
        '1,0,0': DirectionEnum.Right,
        '-1,0,0': DirectionEnum.Left,
    }
    if (vecMap[dirStr]) {
        return vecMap[dirStr]
    }
    console.error(dir)
    throw new Error("directionVector2Enum error")
}

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

    private _size = 1; // 改变这个会影响旋转出错 可能是一个无效的变量(功能不完整)
    public get elementSize() {
        return this._size;
    }
    public elements: CubeElement[] = [];
    public constructor(cubeOrder = 3, colors: CubeColor = [ // 这个颜色回头调一下
        new Color("#fb3636"), new Color("#ff9351"), new Color("#fade70"),
        new Color("#9de16f"), new Color("#51acfa"), new Color("#da6dfa")
    ]) {
        // 红橘黄绿蓝紫
        this.cubeOrder = cubeOrder;
        this.colors = colors;
        this.initElements();
    };

    /**
     * 初始化数据
     * @param localDataFirst 是否从 localStorage 读取数据 
     */
    private initElements(localDataFirst = true) {
        if (localDataFirst && localStorage) {
            this.elements = this.getLocalData();
        }

        if (this.elements.length === this.cubeOrder ** 2 - (this.cubeOrder - 2) ** 2) { // 这里是每一个小面都是item吗
            return;
        }

        this.initialFinishData();
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
        let faceMap = []
        // 从左后下方到右前上方
        for (let z = 0; z < order; z++) {
            for (let y = 0; y < order; y++) {
                for (let x = 0; x < order;) {
                    let squarer = []
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

                    if (x != 0 && z != 0 && y != 0 && y != order - 1 && x != order - 1 && z != order - 1) {
                        x += order - 2
                    } else {
                        x++
                    }
                }
            }
        }
        this._orderSnFaceMaps[order] = faceMap
        return faceMap
    }
    private getColors(sn: number, order: number, colors: CubeColor) {

        let orderFaces = this.getOrderSnFaceMaps(order)
        return orderFaces[sn].map(item => ({
            dir: directionEnum2Vector3(item),
            color: colors[Number(item)],
        }))
    }

    private xyz2position(x: number, y: number, z: number) {
        x = (x - (this.cubeOrder - 1) / 2) * this.elementSize
        y = (y - (this.cubeOrder - 1) / 2) * this.elementSize
        z = (z - (this.cubeOrder - 1) / 2) * this.elementSize

        return new Vector3(x, y, z)
    }
    /**
     * 创建复原的数据
     */
    public initialFinishData() {
        this.elements = [];

        // let logoList: Array<{ x: number, y: number, z: number }> = []
        let logoList: Array<string> = []
        if (this.cubeOrder % 2) { // 奇数
            let z = this.cubeOrder - 1
            let x = (this.cubeOrder + 1) / 2
            let y = (this.cubeOrder + 1) / 2
            logoList.push([x, y, z].join(','))
        } else {// 偶数
            let z = this.cubeOrder - 1
            let x = this.cubeOrder / 2
            let y = this.cubeOrder / 2
            logoList.push([x, y, z].join(','))
            logoList.push([x + 1, y, z].join(','))
            logoList.push([x, y + 1, z].join(','))
            logoList.push([x + 1, y + 1, z].join(','))
        }


        for (let x = 0; x < this.cubeOrder; x++) {
            for (let y = 0; y < this.cubeOrder; y++) {
                for (let z = 0; z < this.cubeOrder; z++) {
                    let sn = this.elements.length
                    let withLogo = logoList.includes([x, y, z].join(','))


                    this.elements.push({
                        sn: sn,
                        position: this.xyz2position(x, y, z), // todo
                        rotation: new Euler(0, 0, 0),
                        faceColors: this.getColors(sn, this.cubeOrder, this.colors),
                        withLogo: withLogo,
                    });
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
            position: item.position,
            rotation: item.rotation,
            // faceColors: item.faceColors.map(item => item.color.hex),
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
        if (localStorage) {
            const data = localStorage.getItem(`${this.cubeOrder}-xRubik`);

            if (data) {
                const parseData: {
                    sn: number,
                    position: { x: number; y: number; z: number },
                    rotation: { _x: number; _y: number; _z: number },
                    withLogo?: boolean,
                }[] = JSON.parse(data);

                const res: CubeElement[] = parseData.map((item) => {
                    return {
                        sn: item.sn,
                        position: new Vector3(item.position.x, item.position.y, item.position.z),
                        rotation: new Euler(item.rotation._x, item.rotation._y, item.rotation._z),
                        faceColors: this.getColors(item.sn, this.cubeOrder, this.colors),
                        withLogo: item.withLogo,
                    }
                });

                return res;
            }
        }

        return [];
    }
}

export default CubeData;
