export interface IBaseCamera
{
    id: number;
    type: string;

    getBounds (): Float32Array;
    getMatrix (): Float32Array;
    reset (width: number, height: number): void;
    update (): boolean;
    destroy (): void;
}
