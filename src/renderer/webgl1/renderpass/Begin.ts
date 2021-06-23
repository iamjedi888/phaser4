import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';

export function Begin (renderPass: IRenderPass, camera2D: IBaseCamera): void
{
    renderPass.current2DCamera = camera2D;
    renderPass.cameraMatrix = camera2D.matrix;

    renderPass.shader.bindDefault();
}
