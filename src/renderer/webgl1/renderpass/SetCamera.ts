import { Flush } from './Flush';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';

export function SetCamera (renderPass: IRenderPass, camera: IBaseCamera): void
{
    if (renderPass.current2DCamera !== camera)
    {
        Flush(renderPass);

        renderPass.current2DCamera = camera;
        renderPass.cameraMatrix = camera.getMatrix();
    }

    //  TODO - This needs to check new camera vs. prev camera matrix
    if (camera.update())
    {
        renderPass.getCurrentShader().bind(renderPass);
    }
}
