import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IFrame } from '../../textures/IFrame';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { ITexture } from '../../textures/ITexture';
import { Texture } from '../../textures/Texture';
export declare class Sprite extends Container implements ISprite {
    readonly type: string;
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    constructor(x: number, y: number, texture?: string | Texture | Frame, frame?: string | number | Frame);
    setTexture(key: string | ITexture | IFrame, frame?: string | number | IFrame): this;
    setFrame(key?: string | number | IFrame): this;
    isRenderable(): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    renderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=Sprite.d.ts.map