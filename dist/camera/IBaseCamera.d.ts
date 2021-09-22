import { IMatrix4 } from '../math/mat4/IMatrix4';
import { Size } from '../components/transform/Size';
export interface IBaseCamera {
    id: number;
    type: string;
    name: string;
    isDirty: boolean;
    matrix: IMatrix4;
    size: Size;
    getBoundsX(): number;
    getBoundsY(): number;
    getBoundsRight(): number;
    getBoundsBottom(): number;
    getMatrix(): Float32Array;
    reset(width: number, height: number): void;
    preRender(): boolean;
    postRender(): void;
    destroy(): void;
}
//# sourceMappingURL=IBaseCamera.d.ts.map