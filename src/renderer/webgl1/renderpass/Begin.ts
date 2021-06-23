import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';

//  Call at the start of each World rendering

export function Begin (renderPass: IRenderPass, camera2D: IBaseCamera): void
{
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;

    renderPass.shader.bindDefault();
}
