import { 
    Shape, ShapeGeometry, MeshPhongMaterial, Mesh, Color, Object3D, 
    Group, Plane, PlaneGeometry, DoubleSide, TextureLoader, Vector,
    BoxGeometry, Vector3,
 } from "three";
import { CubeElement, FaceItem } from "./cubeData";
import RoundedBoxGeometry from "../components/three-rounded-box"

const textureLoader = new TextureLoader();

function createSquareFace(face: FaceItem, squareSize: number, withLogo: boolean) {
    let res = []
    const squareShape = new Shape()
    const x = 0, y = 0;
    // top
    squareShape.moveTo(x - 0.4, y + 0.5);
    squareShape.lineTo(x + 0.4, y + 0.5);
    squareShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.5, y + 0.5, x + 0.5, y + 0.4); //弧线 贝塞尔曲线

    // right
    squareShape.lineTo(x + 0.5, y - 0.4);
    squareShape.bezierCurveTo(x + 0.5, y - 0.5, x + 0.5, y - 0.5, x + 0.4, y - 0.5);

    // bottom
    squareShape.lineTo(x - 0.4, y - 0.5);
    squareShape.bezierCurveTo(x - 0.5, y - 0.5, x - 0.5, y - 0.5, x - 0.5, y - 0.4);

    // left
    squareShape.lineTo(x - 0.5, y + 0.4);
    squareShape.bezierCurveTo(x - 0.5, y + 0.5, x - 0.5, y + 0.5, x - 0.4, y + 0.5);

    const geometry = new ShapeGeometry(squareShape); // 创建单面的几何体 http://www.webgl3d.cn/threejs/docs/#api/zh/geometries/ShapeGeometry
    const material = new MeshPhongMaterial({ 
        color: face.color,
        // specular: 0xffffff,//高光部分的颜色
        shininess: 10,
    }); // 网格材质 就只有着色 http://www.webgl3d.cn/threejs/docs/#api/zh/materials/MeshBasicMaterial
    const mesh = new Mesh(geometry, material); // 创建网格模型 基类Object3D http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Mesh
    mesh.scale.set(0.9, 0.9, 0.9); // 缩放
    let rotateAxis = face.dir.clone().cross(new Vector3(0, 0, 1))
    console.log('rotateAxis', face.dir, rotateAxis)
    mesh.rotateOnAxis(rotateAxis, Math.PI / 2)
    
    let facePos = face.dir.clone().multiplyScalar(0.51 * squareSize)
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
        //但是uv是在geometry中的
        // textureLoader.load("https://pengfeiw.github.io/assests/logo/w.png", (texture) => {
        //     const geo2 = new PlaneGeometry(1, 1, 1); // 平面几何体
        //     const mat3 = new MeshPhongMaterial({ // 把纹理添加到材质上
        //         map: texture,
        //         transparent: true,
        //         specular: 0xffffff,//高光部分的颜色
        //         shininess: 10,
        //     });
        //     const avatarPlane = new Mesh(geo2, mat3);
        //     avatarPlane.scale.set(0.8, 0.8, 1); // 缩放
        //     let plandPos = face.dir.clone().multiplyScalar(0.52 * squareSize)
        //     avatarPlane.position.set(0, 0, 0.01); // 位置
        //     res.push(avatarPlane)
        // });
    }
    return res;
}

function cubePos2wordPos(order: number, squareSize: number, position: Vector3) {
    let x = (position.x - (order - 1) / 2) * squareSize
    let y = (position.y - (order - 1) / 2) * squareSize
    let z = (position.z - (order - 1) / 2) * squareSize

    return new Vector3(x, y, z)
}

/**
 *  把每一cubeData数据构造为 Object3D 物体
 * */
export const createSquare = (order: number, squareSize: number, element: CubeElement, squaresBg: Color) => {
    const square = new SquareMesh(element); // Object3D + CubeElement

    const roundedbox = new RoundedBoxGeometry(squareSize, squareSize, squareSize, squareSize*0.15,5);

    const boxMaterial = new MeshPhongMaterial({ 
        color: squaresBg,
        specular: 0xffffff,//高光部分的颜色
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

    let position = cubePos2wordPos(order, squareSize, element.position);
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
