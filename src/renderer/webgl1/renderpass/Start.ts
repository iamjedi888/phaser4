import { BindDefaultBlendMode } from './BindDefaultBlendMode';
import { BindDefaultFramebuffer } from './BindDefaultFramebuffer';
import { BindDefaultShader } from './BindDefaultShader';
import { BindDefaultVertexBuffer } from './BindDefaultVertexBuffer';
import { BindDefaultViewport } from './BindDefaultViewport';
import { IRenderPass } from './IRenderPass';

export function Start (renderPass: IRenderPass): IRenderPass
{
    if (!renderPass.current2DCamera)
    {
        renderPass.current2DCamera = renderPass.quadCamera;
        renderPass.cameraMatrix = renderPass.quadCamera.getMatrix();
    }

    renderPass.count = 0;
    renderPass.flushTotal = 0;

    BindDefaultFramebuffer();
    BindDefaultBlendMode();
    BindDefaultVertexBuffer();
    BindDefaultViewport();
    BindDefaultShader();

    renderPass.colorMatrix.bindDefault();

    return renderPass;
}
