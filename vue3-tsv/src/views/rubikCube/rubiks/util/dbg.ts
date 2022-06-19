import { def } from "@vue/shared";
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    LineSegments,
    ColorRepresentation,
    LineBasicMaterial,
    Vector3,
    Color,
    BufferGeometry,
    Float32BufferAttribute,
    Matrix4,
    Quaternion,
} from "three"

class ArrowsMesh extends LineSegments {
    public constructor (start:Vector3,vec:Vector3, color: ColorRepresentation) {
        const len = vec.length();
        let zeroAngleVector = new Vector3(0, vec.length(), 0);
        var qt = new Quaternion().setFromUnitVectors(zeroAngleVector.clone().normalize(), vec.clone().normalize());
        
        let end1 = zeroAngleVector.clone().add(new Vector3(len * 0.05, -len*0.1, 0)).applyQuaternion(qt);
        let end2 = zeroAngleVector.clone().add(new Vector3(-len*0.05, -len*0.1, 0)).applyQuaternion(qt);
        let end3 = zeroAngleVector.clone().add(new Vector3(0, -len*0.1, len*0.05)).applyQuaternion(qt);
        let end4 = zeroAngleVector.clone().add(new Vector3(0, -len*0.1, -len*0.05)).applyQuaternion(qt);

        const vertices = [
            0, 0, 0, vec.x, vec.y, vec.z, // 轴
            vec.x, vec.y, vec.z,  end1.x, end1.y, end1.z, // 箭头
            vec.x, vec.y, vec.z,  end2.x, end2.y, end2.z,
            vec.x, vec.y, vec.z,  end3.x, end3.y, end3.z,
            vec.x, vec.y, vec.z,  end4.x, end4.y, end4.z,
        ];

        color = new Color(color);
        const colors = [
            ...color.toArray(), ...color.toArray(),
            ...color.toArray(), ...color.toArray(),
            ...color.toArray(), ...color.toArray(),
            ...color.toArray(), ...color.toArray(),
            ...color.toArray(), ...color.toArray(),
        ];

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        const material = new LineBasicMaterial({ vertexColors: true, toneMapped: false });

        super(geometry, material);
        console.log('this.geometry', this.geometry)
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        // this.setColors(color); // 为什么重载没效果
        // this.setColors(new Color(color));

        this.type = 'Arrows';
        this.position.set(start.x, start.y, start.z);

    }
    setColors(color: Color): ArrowsMesh;
    setColors(color: ColorRepresentation) {

        if (! (color instanceof Color)) {
            color = new Color(color);
        }

        const array = this.geometry.attributes.color.array;

        color.toArray(array, 3 * 0); // 轴线
        color.toArray(array, 3 * 1);
        color.toArray(array, 3 * 2); // 箭头1
        color.toArray(array, 3 * 3);
        color.toArray(array, 3 * 4);// 箭头2
        color.toArray(array, 3 * 5);
        color.toArray(array, 3 * 6);// 箭头3
        color.toArray(array, 3 * 7);
        color.toArray(array, 3 * 8);// 箭头4
        color.toArray(array, 3 * 9);

        this.geometry.attributes.color.needsUpdate = true;
        return this;
    }
}

export class Dbg {
    private arrow?: ArrowsMesh;
    public constructor(
        private rander: WebGLRenderer, 
        private scene: Scene, 
        private camera: PerspectiveCamera) {
        
    }

    drawArrows(start:Vector3, vec:Vector3, color: ColorRepresentation, rander:boolean = false) {
        console.log('drawArrows')
        if(!this.arrow){
            this.arrow = new ArrowsMesh(start, vec, color);
            this.scene.add(this.arrow);
        }else{
            this.scene.remove(this.arrow);
            this.arrow = new ArrowsMesh(start, vec, color);
            this.scene.add(this.arrow);
        }
        rander && this.rander.render(this.scene, this.camera);
    }
}

export let dbg: null|Dbg = null; // 不能export default
export function initDbg(rander: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    dbg = new Dbg(rander, scene, camera);
}
 
