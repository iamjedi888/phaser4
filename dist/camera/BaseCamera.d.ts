import { IBaseCamera } from './IBaseCamera';
import { IMatrix4 } from '../math/mat4/IMatrix4';
import { Size } from '../components/transform/Size';
export declare class BaseCamera implements IBaseCamera {
    readonly id: number;
    readonly type: string;
    name: string;
    size: Size;
    matrix: IMatrix4;
    isDirty: boolean;
    private _data;
    constructor(width: number, height: number);
    preRender(): boolean;
    postRender(): void;
    getBoundsX(): number;
    getBoundsY(): number;
    getBoundsRight(): number;
    getBoundsBottom(): number;
    getMatrix(): Float32Array;
    reset(width: number, height: number): void;
    destroy(): void;
}
//# sourceMappingURL=BaseCamera.d.ts.map