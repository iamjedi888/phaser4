import { IRenderPass } from './IRenderPass';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
export declare type IViewportStack = {
    renderPass: IRenderPass;
    stack: Rectangle[];
    active: Rectangle;
    default: Rectangle;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const ViewportStack: IViewportStack;
//# sourceMappingURL=ViewportStack.d.ts.map