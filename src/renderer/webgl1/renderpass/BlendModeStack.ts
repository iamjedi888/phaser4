import { BlendModeStackEntry } from './BlendModeStackEntry';
import { IRenderPass } from './IRenderPass';

export type IBlendModeStack =
{
    renderPass: IRenderPass;
    stack: BlendModeStackEntry[];
    default: BlendModeStackEntry;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const BlendModeStack: IBlendModeStack =
{
    renderPass: null,
    stack: [],
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        BlendModeStack.renderPass = renderPass;
    }
};
