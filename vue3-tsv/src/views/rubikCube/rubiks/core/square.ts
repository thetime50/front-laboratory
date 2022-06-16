import { 
    Shape, ShapeGeometry, MeshPhongMaterial, Mesh, Color, Object3D, 
    Group, Plane, PlaneGeometry, DoubleSide, TextureLoader, Vector,
    BoxGeometry
 } from "three";
import { CubeElement, FaceItem } from "./cubeData";
import RoundedBoxGeometry from "../components/three-rounded-box"


function createSquareFace(face:FaceItem){

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
        shininess: 10,
    }); // 网格材质 就只有着色 http://www.webgl3d.cn/threejs/docs/#api/zh/materials/MeshBasicMaterial
    const mesh = new Mesh(geometry, material); // 创建网格模型 基类Object3D http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Mesh
    mesh.scale.set(0.9, 0.9, 0.9); // 缩放
    // mesh.position.set(0, 0, 0.01); // 移动靠前一点，防止重叠造成闪烁


    // if (element.withLogo) {
    //     // 纹理加载器 http://www.webgl3d.cn/threejs/docs/#api/zh/loaders/TextureLoader 
    //     // 纹理是贴图 颜色 图案
    //     // 材质包括反射系数 折射率
    //     //但是uv是在geometry中的
    //     textureLoader.load("https://pengfeiw.github.io/assests/logo/w.png", (texture) => {
    //         const geo2 = new PlaneGeometry(1, 1, 1); // 平面几何体
    //         const mat3 = new MeshBasicMaterial({ // 把纹理添加到材质上
    //             map: texture,
    //             transparent: true
    //         });
    //         const avatarPlane = new Mesh(geo2, mat3);
    //         avatarPlane.position.set(0, 0, 0.01); // 位置
    //         avatarPlane.scale.set(0.8, 0.8, 1); // 缩放
    //         square.add(avatarPlane);
    //     });
    // }
    return mesh;
}

/**
 *  把每一cubeData数据构造为 Object3D 物体
 * */
export const createSquare = (element: CubeElement, squaresBg: Color, squareSize: number) => {
    const square = new SquareMesh(element); // Object3D + CubeElement

    const roundedbox = new RoundedBoxGeometry(squareSize, squareSize, squareSize, squareSize*0.15,5);

    const boxMaterial = new MeshPhongMaterial({ 
        color: squaresBg,
        shininess: 10,//高光部分的亮度，默认30
    }); // 网格材质 就只有着色 http://www.webgl3d.cn/threejs/docs/#api/zh/materials/MeshBasicMaterial
    const boxMesh = new Mesh(roundedbox, boxMaterial); // 创建网格模型 基类Object3D http://www.webgl3d.cn/threejs/docs/#api/zh/objects/Mesh
    square.add(boxMesh); // 添加到Object3D

    element.face?.forEach(face => {
        const faceMesh = createSquareFace(face);
        square.add(faceMesh);// 使用 Object3D 来组合对象 (都是一般最好使用 Group)
    })

    square.position.set(
        element.position.x, 
        element.position.y, 
        element.position.z
    ); // 设置位置
}


// 小方块的3d体和魔方数据
export class SquareMesh extends Object3D {
    public element: CubeElement;
    public constructor(element: CubeElement) {
        super();
        this.element = element;
    }
}
