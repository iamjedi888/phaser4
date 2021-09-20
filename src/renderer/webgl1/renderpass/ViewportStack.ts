import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';

export type IViewportStack =
{
    renderPass: IRenderPass;

    stack: Rectangle[];
    active: Rectangle;
    default: Rectangle;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const ViewportStack: IViewportStack =
{
    renderPass: null,
    stack: [],
    active: null,
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        ViewportStack.renderPass = renderPass;
    }
};
