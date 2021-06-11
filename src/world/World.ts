import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { BaseWorld } from './BaseWorld';
import { Camera } from '../camera/Camera';
import { ICamera } from '../camera/ICamera';
import { IScene } from '../scenes/IScene';
import { IWorld } from './IWorld';

export class World extends BaseWorld implements IWorld
{
    camera: ICamera;

    enableCameraCull: boolean = true;

    constructor (scene: IScene)
    {
        super(scene);

        this.camera = new Camera();

        AddTransform2DComponent(this.id);
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
