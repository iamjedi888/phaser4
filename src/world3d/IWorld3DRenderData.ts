import { ICamera3D } from '../camera3d/ICamera3D';
import { IWorld3D } from './IWorld3D';

export interface IWorld3DRenderData
{
    world: IWorld3D;
    camera: ICamera3D;
    gameFrame: number;
    dirtyFrame: number;
    numRendered: number;
    numRenderable: number;
}
