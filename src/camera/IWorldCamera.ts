import { IStaticCamera } from './IStaticCamera';
import { Position } from '../components/transform/Position';

export interface IWorldCamera extends IStaticCamera
{
    position: Position;
    x: number;
    y: number;
    setPosition (x: number, y?: number): this;
}
