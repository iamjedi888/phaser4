import { IBaseCamera } from './IBaseCamera';
import { Vec2Callback } from '../math/vec2/Vec2Callback';

export interface ICamera extends IBaseCamera
{
    position: Vec2Callback;
    scale: Vec2Callback;
    rotation: number;
}
