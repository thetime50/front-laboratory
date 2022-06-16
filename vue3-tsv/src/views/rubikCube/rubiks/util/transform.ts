import {Matrix4, Object3D, Vector3} from "three";

export const rotateAroundWorldAxis = (object: Object3D, axis: Vector3, radians: number) => {
    const mat = new Matrix4();
    // https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4.makeRotationAxis
    mat.makeRotationAxis(axis.normalize(), radians); // 根据旋转轴构建四元数变换矩阵

    mat.multiply(object.matrix); // 叠加之前的旋转

    // The local transform matrix.
    object.matrix = mat; // 这个干什么用 这一句和下面已句都是必须的

    // https://threejs.org/docs/?q=obj#api/en/core/Object3D.matrix
    // https://threejs.org/docs/#api/en/math/Euler.setFromRotationMatrix
    object.rotation.setFromRotationMatrix(object.matrix);
};

export const ndcToScreen = (ndc: {x: number; y: number}, winW: number, winH: number) => {
    const halfW = winW * 0.5;
    const halfH = winH * 0.5;

    const x = (ndc.x * halfW) + halfW;
    const y = halfH - (ndc.y * halfH);

    return {x, y};
};
