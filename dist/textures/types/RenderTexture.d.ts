import { ISprite } from '../../gameobjects/sprite/ISprite';
import { Texture } from '../Texture';
import { WebGLRenderer } from '../../renderer/webgl1/WebGLRenderer';
export declare class RenderTexture extends Texture {
    renderer: WebGLRenderer;
    cameraMatrix: Float32Array;
    projectionMatrix: Float32Array;
    constructor(renderer: WebGLRenderer, width?: number, height?: number);
    cls(): this;
    batchStart(): this;
    batchDraw(sprites: ISprite[]): this;
    batchEnd(): this;
    draw(...sprites: ISprite[]): this;
}
//# sourceMappingURL=RenderTexture.d.ts.map