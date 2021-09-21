import { IGameObject } from '../IGameObject';
import { SpriteBatchAddConfig } from './SpriteBatchAddConfig';
import { Texture } from '../../textures/Texture';

export interface ISpriteBatch extends IGameObject
{
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexViewU32: Uint32Array;
    index: Uint16Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    count: number;
    maxSize: number;
    glTextureIndex: number;
    texture: Texture;
    hasTexture: boolean;
    clear (): this;
    resetBuffers (): void;
    setMaxSize (value: number): this;
    setTexture (key: string | Texture): this;
    add (config: SpriteBatchAddConfig): this;
    addXY (x: number, y: number, frame?: string | number): this;
    updateTextureIndex (): void;
}
