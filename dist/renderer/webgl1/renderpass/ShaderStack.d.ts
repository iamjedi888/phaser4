import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';
import { ShaderStackEntry } from './ShaderStackEntry';
export declare type IShaderStack = {
    renderPass: IRenderPass;
    stack: ShaderStackEntry[];
    active: IShader;
    default: ShaderStackEntry;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const ShaderStack: IShaderStack;
//# sourceMappingURL=ShaderStack.d.ts.map