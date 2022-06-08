import {
    createCamera,
    createRenderer,
    createScene,
} from "./components/components";

import { PerspectiveCamera, Scene, WebGLRenderer, AxesHelper, LineDashedMaterial } from "three";


const setSize = (container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    // Set the camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight; // 设置长宽比 PerspectiveCamera 的第二个参数
    camera.updateProjectionMatrix(); // 手动更新相机投影矩阵

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Rubiks {
    private container: Element;
    private camera: PerspectiveCamera; // 透视相机
    private scene: Scene;
    // private cube: Cube | undefined;
    private renderer: WebGLRenderer;
    // private _controls: Control[] = [];
    public constructor(container: Element) {
        this.container = container;
        this.camera = createCamera();
        this.scene = createScene("#478967");
        this.renderer = createRenderer();
        container.appendChild(this.renderer.domElement);

        setSize(this.container, this.camera, this.renderer); // 屏幕 相机 渲染 适配
        // this.setOrder(3); // 设置阶数

        // this.startAnimation();
    }

    // ...

    private render() {
        this.renderer.render(this.scene, this.camera);
    }
    public resize() {
        setSize(this.container, this.camera, this.renderer);
        this.render();
    }
}