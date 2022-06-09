import { 
    Shape, ShapeGeometry, MeshBasicMaterial, Mesh, Color, Object3D, 
    Group, Plane, PlaneGeometry, DoubleSide, TextureLoader, Vector,
    BoxGeometry
 } from "three";
import { CubeElement } from "./cubeData";
import RoundedBoxGeometry from "../components/three-rounded-box"


/**
 *  把每一cubeData数据构造为 Object3D 物体
 * */
export const createSquare = (color: Color, element: CubeElement) => {

}


// 小方块的3d体和魔方数据
export class SquareMesh extends Object3D {
    public element: CubeElement;
    public constructor(element: CubeElement) {
        super();
        this.element = element;
    }
}
