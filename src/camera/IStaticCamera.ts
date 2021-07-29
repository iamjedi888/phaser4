export interface IStaticCamera
{
    id: number;
    type: string;

    getBounds (): Float32Array;
    getMatrix (): Float32Array;
    reset (width: number, height: number): void;
    destroy (): void;
}
