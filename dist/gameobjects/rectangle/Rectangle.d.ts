import { Container } from '../container/Container';
import { ICanvasRenderer } from '../../renderer/canvas/ICanvasRenderer';
import { IGameObject } from '../IGameObject';
import { IRectangle } from './IRectangle';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
export declare class Rectangle extends Container implements IRectangle {
    private texture;
    private frame;
    protected _color: number;
    constructor(x: number, y: number, width?: number, height?: number, color?: number);
    private setWhiteTexture;
    setColor(color: number): this;
    isRenderable(): boolean;
    renderGL<T extends IRenderPass>(renderPass: T): void;
    renderCanvas<T extends ICanvasRenderer>(renderer: T): void;
    get color(): number;
    set color(value: number);
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=Rectangle.d.ts.map