import { ICamera3D } from '../camera3d/ICamera3D';
import { IWorld3D } from './IWorld3D';
import { IWorld3DRenderData } from './IWorld3DRenderData';

export function CreateWorld3DRenderData (world: IWorld3D, camera: ICamera3D): IWorld3DRenderData
{
    return {
        world,
        camera,
        gameFrame: 0,
        dirtyFrame: 0,
        numRendered: 0,
        numRenderable: 0
    };
}
