import { 
    PerspectiveCamera,
    WebGLRenderer,
    Color, Scene, ColorRepresentation
} from "three";

// import THREE from "three"
// const {
//     PerspectiveCamera,
//     WebGLRenderer,
//     Color, Scene,
// } = THREE;
// type ColorRepresentation = THREE.ColorRepresentation

export const createCamera = () => {
    // http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/PerspectiveCamera
    // https://en.wikipedia.org/wiki/Viewing_frustum
    const camera = new PerspectiveCamera(
        45, // 视锥体垂直视野角度
        1, // 视锥体长宽比 // 看不出效果
        0.1, // 显示深度范围
        100
    );

    camera.position.set(0, 0, 15);

    return camera;
};

export const createRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true });

    return renderer;
};

export const createScene = (bgColor: ColorRepresentation) => {
    const scene = new Scene();

    scene.background = new Color(bgColor);

    return scene;
};

