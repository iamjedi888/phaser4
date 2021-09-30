import { Texture } from './Texture';

export interface IFrame
{
    texture: Texture;
    key: string | number;
    x: number;
    y: number;
    width: number;
    height: number;
    fWidth: number;
    fHeight: number;
    trimmed: boolean;
    sourceSizeWidth: number;
    sourceSizeHeight: number;
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeWidth: number;
    spriteSourceSizeHeight: number;
    pivot: { x: number; y: number };
    u0: number;
    v0: number;
    u1: number;
    v1: number;
    destroy (): void;
}
