import {
    Vector3,
    Euler,
    Color,
} from "three"

export interface CubeElement {
    position: Vector3,
    rotation: Euler,
    color: Color,
    withLogo?: boolean,
}

interface CubeColor extends Array<Color> {
    readonly length: 6;
    readonly [x : number]: Color;
}

let cc= [new Color(0),]

class CubeData {

}

export default CubeData;
