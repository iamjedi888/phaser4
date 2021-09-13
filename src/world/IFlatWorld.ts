import { IBaseWorld } from './IBaseWorld';
import { IWorldCamera } from '../camera/IWorldCamera';

export interface IFlatWorld extends IBaseWorld
{
    camera: IWorldCamera;
}
