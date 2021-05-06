import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ISprite } from './ISprite';
import { Texture } from '../../textures/Texture';
export declare class Sprite extends Container implements ISprite {
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    protected _tint: number;
    constructor(x: number, y: number, texture: string | Texture, frame?: string | number);
    setTexture(key: string | Texture, frame?: string | number): this;
    setFrame(key?: string | number | Frame): this;
    isRenderable(): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    renderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    get tint(): number;
    set tint(value: number);
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=Sprite.d.ts.map