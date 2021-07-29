import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';
import { SetCamera } from './SetCamera';

//  Call at the start of each World rendering

export function Begin (renderPass: IRenderPass, camera: IBaseCamera): void
{
    renderPass.shader.bindDefault();

    SetCamera(renderPass, camera);
}
