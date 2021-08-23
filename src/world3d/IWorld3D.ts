import { IBaseWorld3D } from './IBaseWorld3D';
import { ICamera3D } from '../camera3d/ICamera3D';

export interface IWorld3D extends IBaseWorld3D
{
    camera: ICamera3D;
}
