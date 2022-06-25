// import { def } from "@vue/shared";
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    LineSegments,
    ColorRepresentation,
    LineBasicMaterial,
    Vector3,
    Vector2,
    Color,
    BufferGeometry,
    Float32BufferAttribute,
    // Matrix4,
    Quaternion,
} from "three"

class ArrowsMesh extends LineSegments {
    public constructor (start:Vector3,vec:Vector3, color: ColorRepresentation) {
        const len = vec.length();
        const zeroAngleVector = new Vector3(0, vec.length(), 0);
        const qt = new Quaternion().setFromUnitVectors(zeroAngleVector.clone().normalize(), vec.clone().normalize());
        
         const end1 = zeroAngleVector.clone().add(new Vector3(len * 0.05, -len*0.1, 0)).applyQuaternion(qt);
         const end2 = zeroAngleVector.clone().add(new Vector3(-len*0.05, -len*0.1, 0)).applyQuaternion(qt);
         const end3 = zeroAngleVector.clone().add(new Vector3(0, -len*0.1, len*0.05)).applyQuaternion(qt);
         const end4 = zeroAngleVector.clone().add(new Vector3(0, -len*0.1, -len*0.05)).applyQuaternion(qt);

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
    afterDotDom = (x: number, y: number) => {
        const el = document.getElementById("point");
        if (el){
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        }
    }

    drawArrows(start:Vector3, vec:Vector3, color: ColorRepresentation, rander = false) {
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

    private lineArr: Array<{
        start: Vector2,
        vec: Vector2,
        id: string,
    }> = [];
    lineRemove(ids:Array<string>=[]) {
        if(!ids.length){
            ids = this.lineArr.map(v => v.id);
        }
        const dom = this.rander.domElement.parentElement
        ids.forEach(id => {
            const index = this.lineArr.findIndex(v => v.id === id);
            if (index >= 0 && dom){
                this.lineArr.splice(index, 1);
                const line = dom.querySelector('#' + id)
                line && dom.removeChild(line);
            }
        })
    }
    lineAdd(start: Vector2, vec: Vector2, color = 'linear-gradient(90deg, #2222ff,#ddddff )') {
        const id = `line-${Math.random().toString(36).slice(2, 9)}`;
        this.lineArr.push({
            start,
            vec,
            id,
        });
        const dom = this.rander.domElement.parentElement
        if (!dom) return
        const winWidth = dom.clientWidth;
        const winHeight = dom.clientHeight;
        const halfHeight = winHeight / 2;
        const halfWidth = winWidth / 2;

        const div = document.createElement('div');
        div.id = id;
        div.style.position = 'absolute';
        div.style.background = color;

        // let end = start.clone().add(vec);
        let width = vec.length()
        if (width < 20) {
            width *= 20;
        }
        div.style.left = `${start.x + halfWidth}px`;
        div.style.top = `${halfHeight - start.y}px`;
        div.style.width = `${width}px`;
        div.style.height = `${1}px`;
        const angle = - vec.angle() * 180 / Math.PI;
        const ty = width/2*Math.sin(angle*Math.PI/180);
        const tx = width/2*(1-Math.cos(angle*Math.PI/180));
        div.style.transform = `rotate(${angle}deg) translate(${tx}px, ${ty}px)`;
        // console.log(`rotate(${angle}deg) translate(${tx}px, ${ty}px)`)
        dom.appendChild(div);
        return id
    }
    // 页面的坐标发行 y和three 的相反
    webLineAdd(start: Vector2, vec: Vector2, color = 'linear-gradient(90deg, #2222ff,#ddddff )') {
        return this.lineAdd(
            new Vector2(start.x, -start.y),
            new Vector2(vec.x, -vec.y),
            color
        )
    }
}

export let dbg: null|Dbg = null; // 不能export default
export function initDbg(rander: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    dbg = new Dbg(rander, scene, camera);
}
 
