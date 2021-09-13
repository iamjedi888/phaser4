import { IMatrix4 } from '../math/mat4/IMatrix4';

export interface IBaseCamera
{
    id: number;
    type: string;
    name: string;

    matrix: IMatrix4;

    getBoundsX (): number;
    getBoundsY (): number;
    getBoundsRight (): number;
    getBoundsBottom (): number;

    getMatrix (): Float32Array;
    reset (width: number, height: number): void;
    updateBounds (): boolean;
    update (): boolean;
    destroy (): void;
}
