import { Matrix4 } from '../../../math/mat4';
import { Quaternion } from '../../../math/quaternion';
import { Vec3, Vec3Callback } from '../../../math/vec3';
import { IGameObject3D } from '../../IGameObject3D';
export declare class Transform3DComponent {
    entity: IGameObject3D;
    local: Matrix4;
    world: Matrix4;
    normal: Matrix4;
    position: Vec3Callback;
    scale: Vec3Callback;
    origin: Vec3Callback;
    rotation: Quaternion;
    forward: Vec3;
    up: Vec3;
    right: Vec3;
    passthru: boolean;
    constructor(entity: IGameObject3D, x?: number, y?: number, z?: number);
    rotateX(angle: number): void;
    rotateY(angle: number): void;
    rotateZ(angle: number): void;
    update(): void;
    updateLocal(): void;
    updateWorld(): void;
    updateChildren(): void;
    destroy(): void;
}
//# sourceMappingURL=Transform3DComponent.d.ts.map