import { ISprite } from '../sprite/ISprite';
import { IVec2 } from '../../math/vec2/IVec2';

export interface ITileSprite extends ISprite
{
    tileAngle: number;
    tileScale: IVec2;
    tilePosition: IVec2;
    tileRotationOrigin: IVec2;
    frameScale: IVec2;

    width: number;
    height: number;
}
