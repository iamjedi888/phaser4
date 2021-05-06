import { Frame } from '../../textures/Frame';
import { IContainer } from '../container/IContainer';
import { Texture } from '../../textures/Texture';
export interface ISprite extends IContainer {
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    tint: number;
    setTexture(key: string | Texture, frame?: string | number): this;
    setFrame(key?: string | number | Frame): this;
}
//# sourceMappingURL=ISprite.d.ts.map