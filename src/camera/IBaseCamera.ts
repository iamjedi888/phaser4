export interface IBaseCamera
{
    id: number;
    type: string;

    getBoundsX (): number;
    getBoundsY (): number;
    getBoundsRight (): number;
    getBoundsBottom (): number;

    getMatrix (): Float32Array;
    reset (width: number, height: number): void;
    update (): boolean;
    destroy (): void;
}
