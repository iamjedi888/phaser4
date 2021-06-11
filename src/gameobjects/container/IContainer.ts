import { Origin, Position, Scale, Size, Skew } from '../../components/transform';

import { IGameObject } from '../IGameObject';
import { Rectangle } from '../../geom/rectangle/Rectangle';

export interface IContainer extends IGameObject
{
    position: Position;
    scale: Scale;
    skew: Skew;
    origin: Origin;
    size: Size;

    x: number;
    y: number;
    rotation: number;
    alpha: number;

    // getBounds (): Rectangle;

    // setAlpha (value?: number): this;
}
