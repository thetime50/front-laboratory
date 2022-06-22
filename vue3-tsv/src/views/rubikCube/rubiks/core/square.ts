import { 
    Shape, ShapeGeometry, MeshPhongMaterial, MeshBasicMaterial, Mesh, Color, Object3D, 
    Group, Plane, PlaneGeometry, DoubleSide, TextureLoader, Vector,
    BoxGeometry, Vector3, Matrix4,
 } from "three";
import { CubeElement, FaceItem } from "./cubeData";
import RoundedBoxGeometry from "../components/three-rounded-box"

const textureLoader = new TextureLoader();

export class FaceMesh extends Mesh {
    public face_ : FaceItem
    public constructor(face: FaceItem, squareSize: number,) {
        const squareShape = new Shape()
        const x = 0, y = 0;
        const rrate = 0.15
        const x1 = - squareSize * 0.5
        const x2 = - squareSize * 0.5 + squareSize * rrate
        const x3 = squareSize * 0.5 - squareSize * rrate
        const x4 = squareSize * 0.5
        const y1 = - squareSize * 0.5
        const y2 = - squareSize * 0.5 + squareSize * rrate
        const y3 = squareSize * 0.5 - squareSize * rrate
        const y4 = squareSize * 0.5

        // top
        squareShape.moveTo(x2, y4);
        squareShape.lineTo(x3, y4);
        squareShape.bezierCurveTo(x4, y4, x4, y4, x4, y3); //弧线 贝塞尔曲线

        // right
        squareShape.lineTo(x4, y2);
        squareShape.bezierCurveTo(x4, y1, x4, y1, x3, y1);

        // bottom
        squareShape.lineTo(x2, y1);
        squareShape.bezierCurveTo(x1, y1, x1, y1, x1, y2);

        // left
        squareShape.lineTo(x1, y3);
        squareShape.bezierCurveTo(x1, y4, x1, y4, x2, y4);

        const geometry = new ShapeGeometry(squareShape); // 创建单面的几何体 http://www.webgl3d.cn/threejs/docs/#api/zh/geometries/ShapeGeometry
        const material = new MeshPhongMaterial({
            color: face.color,
            specular: face.color,//高光部分的颜色
            shininess: 10,
        }); 
        super(geometry, material);
        this.face_ = face
    }
}

function createSquareFace(face: FaceItem, squareSize: number, withLogo: boolean) {
    let res: Array<Mesh> = []

    const mesh = new FaceMesh(face, squareSize)
    mesh.scale.set(0.8, 0.8, 1); // 缩放

    let mat: Matrix4|null = new Matrix4();
    if (face.dir.equals(new Vector3(0, 0, 1))){
        mat = null
    }else if( face.dir.equals(new Vector3(0, 0, -1)) ) {
        mat.makeRotationAxis(new Vector3(0, 1, 0), - Math.PI); // 根据旋转轴构建四元数变换矩阵
    } else {
        let rotateAxis = face.dir.clone().cross(new Vector3(0, 0, 1))
        // https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4.makeRotationAxis
        mat.makeRotationAxis(rotateAxis.normalize(), - Math.PI / 2); // 根据旋转轴构建四元数变换矩阵
    }
    mat && mesh.rotation.setFromRotationMatrix(mat)
    
    let facePos = face.dir.clone().multiplyScalar(0.501 * squareSize)
    mesh.position.set(
        facePos.x,
        facePos.y,
        facePos.z,
    ); // 移动靠前一点，防止重叠造成闪烁
    res.push(mesh)

    if (withLogo) {
        // 纹理加载器 http://www.webgl3d.cn/threejs/docs/#api/zh/loaders/TextureLoader 
        // 纹理是贴图 颜色 图案
        // 材质包括反射系数 折射率
        // 但是uv是在geometry中的
        let texture = textureLoader.load("https://pengfeiw.github.io/assests/logo/w.png", (texture) => {
        });

        const geo2 = new PlaneGeometry(1, 1, 1); // 平面几何体
        const mat3 = new MeshPhongMaterial({ // 把纹理添加到材质上
            map: texture,
            transparent: true,
            specular: 0xff3333,//高光部分的颜色
            shininess: 10,//高光部分的亮度，默认30
        });
        const avatarPlane = new Mesh(geo2, mat3);
        mat && avatarPlane.rotation.setFromRotationMatrix(mat)
        avatarPlane.scale.set(0.8, 0.8, 1); // 缩放
        let plandPos = face.dir.clone().multiplyScalar(0.502 * squareSize)
        avatarPlane.position.set(
            plandPos.x,
            plandPos.y,
            plandPos.z,
        ); // 位置
        res.push(avatarPlane)
    }
    return res;
}

function dataPos2squarePos(order: number, squareSize: number, position: Vector3) {
    let x = (position.x - (order - 1) / 2) * squareSize
    let y = (position.y - (order - 1) / 2) * squareSize
    let z = (position.z - (order - 1) / 2) * squareSize

    return new Vector3(x, y, z)
}

export function squarePos2dataPos(order: number, squareSize: number, position: Vector3) {
    let x = position.x / squareSize + (order - 1) / 2
    let y = position.y / squareSize + (order - 1) / 2
    let z = position.z / squareSize + (order - 1) / 2

    return new Vector3(x, y, z)
}

/**
 *  把每一cubeData数据构造为 Object3D 物体
 * */
export const createSquare = (order: number, squareSize: number, element: CubeElement, squaresBg: Color) => {
    const square = new SquareMesh(element); // Object3D + CubeElement

    const roundedbox = new RoundedBoxGeometry(squareSize, squareSize, squareSize, squareSize*0.1,5);

    const boxMaterial = new MeshPhongMaterial({ 
        color: squaresBg,
        specular: '#eeeeee',//高光部分的颜色
        shininess: 10,//高光部分的亮度，默认30
    }); // 网格材质 就只有着色 http://www.webgl3d.cn/threejs/docs/#api/zh/materials/MeshBasicMaterial
    const boxMesh = new Mesh(roundedbox, boxMaterial); // 创建网格模型 基类Object3D http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Mesh
    square.add(boxMesh); // 添加到Object3D

    element.face?.forEach(face => {
        const faceMeshs = createSquareFace(face, squareSize, element.withLogo!);
        faceMeshs.forEach((fm=>{
            square.add(fm);// 使用 Object3D 来组合对象 (都是一般最好使用 Group)
        }))
    })

    let position = dataPos2squarePos(order, squareSize, element.position);
    square.rotation.setFromRotationMatrix( new Matrix4().makeRotationFromEuler( element.rotation) )
    square.position.set(
        position.x, 
        position.y, 
        position.z
    ); // 设置位置


    return square;
}


// 小方块的3d体和魔方数据
export class SquareMesh extends Object3D {
    public element: CubeElement;
    public constructor(element: CubeElement) {
        super();
        this.element = element;
    }
}
