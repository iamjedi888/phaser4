import { IEffectLayer } from './IEffectLayer';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { RenderLayer } from '../renderlayer/RenderLayer';
export declare class EffectLayer extends RenderLayer implements IEffectLayer {
    readonly type: string;
    shaders: IShader[];
    constructor(width?: number, height?: number, resolution?: number, ...shaders: IShader[]);
    postRenderGL<T extends IRenderPass>(renderPass: T): void;
}
//# sourceMappingURL=EffectLayer.d.ts.map