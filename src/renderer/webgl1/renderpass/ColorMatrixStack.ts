import { ColorMatrixStackEntry } from './ColorMatrixStackEntry';
import { IRenderPass } from './IRenderPass';

export type IColorMatrixStack =
{
    renderPass: IRenderPass;

    stack: ColorMatrixStackEntry[];
    default: ColorMatrixStackEntry;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const ColorMatrixStack: IColorMatrixStack =
{
    renderPass: null,
    stack: [],
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        ColorMatrixStack.renderPass = renderPass;
    }
};
