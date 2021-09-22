import { GameObject } from '../GameObject';
import { IFrame } from '../../textures/IFrame';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';
import { ITexture } from '../../textures/ITexture';
export declare class DirectDraw extends GameObject {
    readonly type: string;
    red: number;
    green: number;
    blue: number;
    alpha: number;
    smoothness: number;
    private renderPass;
    private _color;
    constructor();
    set color(value: number);
    setRGB(red: number, green: number, blue: number, alpha?: number): this;
    arc(x: number, y: number, radius: number, startAngle?: number, endAngle?: number, anticlockwise?: boolean, includeCenter?: boolean, color?: number): this;
    circle(x: number, y: number, radius: number, color?: number): this;
    plot(x: number, y: number, color?: number): this;
    box(x: number, y: number, width: number, height: number, thickness?: number, color?: number): this;
    rect(x: number, y: number, width: number, height: number, color?: number): this;
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: number): this;
    line(x1: number, y1: number, x2: number, y2: number, width: number, color?: number): this;
    image(texture: ITexture, x: number, y: number, alpha?: number, scaleX?: number, scaleY?: number): this;
    imagePart(texture: ITexture, x0: number, y0: number, x1: number, y1: number, dx: number, dy: number, dw?: number, dh?: number, alpha?: number): this;
    frame(texture: ITexture, frame: string | number | IFrame, x: number, y: number, alpha?: number, scaleX?: number, scaleY?: number): this;
    quad(texture: ITexture, frame: string | number | IFrame, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, alpha?: number): this;
    tiles(texture: ITexture, tileWidth: number, tileHeight: number, mapData: number[], mapWidth: number, x?: number, y?: number): this;
    render(): void;
    renderGL<T extends IRenderPass>(renderPass: T): void;
}
//# sourceMappingURL=DirectDraw.d.ts.map