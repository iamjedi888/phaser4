export interface IBaseCamera
{
    id: number;
    type: string;
    isDirty: boolean;

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
