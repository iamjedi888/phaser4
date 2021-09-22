import { ColorMatrixStackEntry } from './ColorMatrixStackEntry';
import { IRenderPass } from './IRenderPass';
export declare type IColorMatrixStack = {
    renderPass: IRenderPass;
    stack: ColorMatrixStackEntry[];
    default: ColorMatrixStackEntry;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const ColorMatrixStack: IColorMatrixStack;
//# sourceMappingURL=ColorMatrixStack.d.ts.map