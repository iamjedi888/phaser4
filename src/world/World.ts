import { BaseWorld } from './BaseWorld';
import { Camera } from '../camera/Camera';
import { CreateWorldRenderData } from './CreateWorldRenderData';
import { DIRTY_CONST } from '../gameobjects/DIRTY_CONST';
import { ICamera } from '../camera/ICamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorld } from './IWorld';
import { IWorldRenderData } from './IWorldRenderData';
import { RectangleToRectangle } from '../geom/intersects';

export class World extends BaseWorld implements IWorld
{
    camera: ICamera;

    enableCameraCull: boolean = true;

    constructor (scene: IScene)
    {
        super(scene);

        this.camera = new Camera();

        this.renderData = CreateWorldRenderData(this, this.camera);
    }

    //  TODO: An out-of-bounds parent with in-bounds children will be cull checked against in postRender, stop this.
    //  TODO: Use circle-circle check when camera is rotated.
    /*
    addNode (node: IGameObject, renderData: IWorldRenderData): boolean
    {
        const cull = this.enableCameraCull;

        if (node.isRenderable())
        {
            if (node.isDirty(DIRTY_CONST.PENDING_RENDER) || node === this)
            {
                //  Already been cull checked once, so add to renderList and return
                renderData.renderList.push(node);
            }
            else if (!cull || (cull && RectangleToRectangle(node.bounds.get(), this.camera.bounds)))
            {
                renderData.renderList.push(node);

                return true;
            }
        }

        return false;
    }
    */
}
