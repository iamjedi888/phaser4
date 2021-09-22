import { Container } from '../container/Container';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
export declare class Rectangle extends Container {
    readonly type: string;
    private texture;
    private frame;
    constructor(x: number, y: number, width?: number, height?: number, color?: number);
    isRenderable(): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    renderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=Rectangle.d.ts.map