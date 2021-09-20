import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';
import { ShaderStackEntry } from './ShaderStackEntry';

export type IShaderStack =
{
    renderPass: IRenderPass;

    stack: ShaderStackEntry[];
    active: IShader;
    default: ShaderStackEntry;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const ShaderStack: IShaderStack =
{
    renderPass: null,
    stack: [],
    active: null,
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        ShaderStack.renderPass = renderPass;
    }
};
