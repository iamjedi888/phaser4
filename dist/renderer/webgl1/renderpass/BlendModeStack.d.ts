import { BlendModeStackEntry } from './BlendModeStackEntry';
import { IRenderPass } from './IRenderPass';
export declare type IBlendModeStack = {
    renderPass: IRenderPass;
    stack: BlendModeStackEntry[];
    default: BlendModeStackEntry;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const BlendModeStack: IBlendModeStack;
//# sourceMappingURL=BlendModeStack.d.ts.map