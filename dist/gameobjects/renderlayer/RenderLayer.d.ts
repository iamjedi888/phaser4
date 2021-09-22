import { Color } from '../../components/color/Color';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { IRenderLayer } from './IRenderLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { Layer } from '../layer/Layer';
import { Texture } from '../../textures/Texture';
export declare class RenderLayer extends Layer implements IRenderLayer {
    readonly type: string;
    color: Color;
    texture: Texture;
    framebuffer: WebGLFramebuffer;
    viewport: IRectangle;
    private _x;
    private _y;
    constructor(x?: number, y?: number, width?: number, height?: number, resolution?: number);
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    postRenderGL<T extends IRenderPass>(renderPass: T): void;
}
//# sourceMappingURL=RenderLayer.d.ts.map