
import { 
    PerspectiveCamera, Scene, WebGLRenderer, AxesHelper, LineDashedMaterial,
    PointLight, AmbientLight,
    Vector3,
} from "three"; 
import {
    createCamera,
    createRenderer,
    createScene,
    createLigth,
} from "./components/components";

// debug
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import  { dbg,initDbg } from "./util/dbg";

import { Cube } from "./core/cube";
import Control, { MouseControl, TouchControl } from "./core/control";


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
    private cube: Cube | undefined;
    private renderer: WebGLRenderer;
    private pointLight :PointLight;
    private ambientLight :AmbientLight;
    private _controls: Control[] = [];
    public constructor(container: Element) {
        this.container = container;
        this.camera = createCamera();
        this.scene = createScene("#ccddcc");
        this.renderer = createRenderer();
        initDbg(this.renderer, this.scene, this.camera,);
        let { pointLight, ambientLight, } = createLigth();
        this.pointLight = pointLight
        this.ambientLight = ambientLight
        container.appendChild(this.renderer.domElement);

        setSize(this.container, this.camera, this.renderer); // 屏幕 相机 渲染 适配
        this.setOrder(3); // 设置阶数

        this.startAnimation();
    }

    // 添加辅助坐标轴
    public addWorldAxes() {
        // https://threejs.org/docs/#api/zh/helpers/AxesHelper
        let addWorldAxes = new AxesHelper(3);
        // (addWorldAxes.material as LineDashedMaterial).dashSize = 0.2;
        // (addWorldAxes.material as LineDashedMaterial).gapSize = 0.2;
        let dashe = new LineDashedMaterial({
            vertexColors: true,
            toneMapped: false,
            color: 0xffff00,
            linewidth: 0.6,
            dashSize: 0.05,//显示线段的大小。默认为3。
            gapSize: 0.05,//间隙的大小。默认为1
        })
        addWorldAxes.material = dashe
        addWorldAxes.computeLineDistances();
        this.scene.add(addWorldAxes);

    }
    // 初始化魔方
    public setOrder(order: number) {
        this.scene.remove(...this.scene.children);
        this.scene.add(this.pointLight);
        this.scene.add(this.ambientLight);
        if (this._controls.length > 0) {
            this._controls.forEach((control) => control.dispose());
        }
        this.addWorldAxes()

        const cube = new Cube(order);
        this.scene.add(cube);
        // this.scene.add(cube.haxes); // 添加物体辅助坐标轴
        // this.scene.add(cube.daxes); // 添加物体辅助坐标轴
        this.cube = cube;
        this.render();

        const winW = this.renderer.domElement.clientWidth;
        const winH = this.renderer.domElement.clientHeight;
        const coarseSize = cube.getCoarseCubeSize(this.camera, { w: winW, h: winH }); // 渲染尺寸

        const ratio = Math.max(2.2 / (winW / coarseSize), 2.2 / (winH / coarseSize));
        this.camera.position.z *= ratio; // 这里每次累乘有点奇怪
        // 下面这两个控制器只是绑定的事件不一样
        this._controls.push(
            new MouseControl(this.camera, this.scene, this.renderer, cube),
            new TouchControl(this.camera, this.scene, this.renderer, cube)
        );

        let controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.addEventListener('change', this.render.bind(this));//移动相机

        this.render();
    }
    // ...

    private render() {
        this.renderer.render(this.scene, this.camera);
    }
    public resize() {
        setSize(this.container, this.camera, this.renderer);
        this.render();
    }
    private startAnimation() {
        const animation = (time: number) => { // 页面运行时间
            time /= 1000; // convert to seconds
            if (this.cube) {
                if (time < 2) {
                    // this.cube.position.z = (-1 + time / 2) * 100;
                    this.cube.position.z = 0;
                } else {
                    this.cube.position.z = 0;
                }
                const dis = time;
                this.cube.position.y = Math.sin(dis) * 0.1; // 悬浮动画
            }

            this.render();
            requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }
}

export default Rubiks
