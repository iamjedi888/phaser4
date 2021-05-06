import { IGameObject } from '../gameobjects/IGameObject';
import { Texture } from './Texture';
import { Vertex } from '../gameobjects/components';
export declare class Frame {
    texture: Texture;
    key: string | number;
    x: number;
    y: number;
    width: number;
    height: number;
    trimmed: boolean;
    sourceSizeWidth: number;
    sourceSizeHeight: number;
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeWidth: number;
    spriteSourceSizeHeight: number;
    pivot: {
        x: number;
        y: number;
    };
    u0: number;
    v0: number;
    u1: number;
    v1: number;
    constructor(texture: Texture, key: string | number, x: number, y: number, width: number, height: number);
    setPivot(x: number, y: number): void;
    setSize(width: number, height: number): void;
    setSourceSize(width: number, height: number): void;
    setTrim(width: number, height: number, x: number, y: number, w: number, h: number): void;
    getExtent(originX: number, originY: number): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    copyToExtent(child: IGameObject): this;
    copyToVertices(vertices: Vertex[], offset?: number): this;
    updateUVs(): void;
}
//# sourceMappingURL=Frame.d.ts.map