import { Color } from '../../components/color/Color';
import { IColorComponent } from '../../components/color/IColorComponent';
import { IGameObject } from '../IGameObject';
import { IRectangle } from '../../geom/rectangle/IRectangle';
import { IShader } from '../../renderer/webgl1/shaders/IShader';
import { Origin } from '../../components/transform/Origin';
import { Position } from '../../components/transform/Position';
import { Scale } from '../../components/transform/Scale';
import { Size } from '../../components/transform/Size';
import { Skew } from '../../components/transform/Skew';
export interface IContainer extends IGameObject, IColorComponent {
    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;
    color: Color;
    x: number;
    y: number;
    rotation: number;
    alpha: number;
    shader: IShader;
    setPosition(x: number, y?: number): this;
    setScale(x: number, y?: number): this;
    setRotation(value: number): this;
    setSkew(x: number, y: number): this;
    setOrigin(x: number, y: number): this;
    setAlpha(value: number): this;
    getBounds(): IRectangle;
}
//# sourceMappingURL=IContainer.d.ts.map