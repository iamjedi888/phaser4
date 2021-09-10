import { IBaseWorld } from './IBaseWorld';
import { IWorldCamera } from '../camera/IWorldCamera';

export interface IWorld extends IBaseWorld
{
    camera: IWorldCamera;
}
