import { Matrix4 } from './Matrix4';
export declare type FOV = {
    upDegrees: number;
    downDegrees: number;
    leftDegrees: number;
    rightDegrees: number;
};
export declare function Mat4PerspectiveFromFieldOfView(fov: FOV, near: number, far: number, out?: Matrix4): Matrix4;
//# sourceMappingURL=Mat4PerspectiveFromFieldOfView.d.ts.map