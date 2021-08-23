import { Vec3, Vec3Callback } from '../math/vec3';

import { Euler } from '../math/euler/Euler';
import { IRectangle } from '../geom/rectangle/IRectangle';
import { IRenderer } from '../renderer/IRenderer';
import { IVec3Like } from '../math/vec3/IVec3Like';
import { Matrix4 } from '../math/mat4/Matrix4';
import { Quaternion } from '../math/quaternion';

export interface ICamera3D
{
    type: string;
    renderer: IRenderer;

    position: Vec3Callback;
    rotation: Quaternion;

    matrix: Matrix4;
    viewMatrix: Matrix4;
    projectionMatrix: Matrix4;
    viewProjectionMatrix: Matrix4;

    forward: Vec3;
    up: Vec3;
    right: Vec3;

    start: Vec3;

    yaw: number;
    pitch: number;
    roll: number;

    aspect: number;

    isOrbit: boolean;

    minDistance: number;
    maxDistance: number;

    minPolarAngle: number;
    maxPolarAngle: number;

    minAzimuthAngle: number;
    maxAzimuthAngle: number;

    dirtyRender: boolean;

    panRate: number;
    zoomRate: number;
    rotateRate: number;

    viewport: IRectangle;

    fov: number;
    near: number;
    far: number;

    begin (x: number, y: number): void;
    zoom (delta: number): void;
    pan (x: number, y: number): void;
    rotate (x: number, y: number): void;
    panX (amount: number): this;
    panY (amount: number): this;
    panZ (amount: number): this;
    update (): this;
    // lookAt (target: IVec3Like, invert: boolean): this;
    // targetTo (target: IVec3Like): this;
    setAspectRatio (value?: number): this;
    updateProjectionMatrix (): this;
}
