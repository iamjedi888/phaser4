import { IRenderPass } from './IRenderPass';

export function Start (renderPass: IRenderPass): void
{
    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.matrix;

    renderPass.count = 0;
    renderPass.flushTotal = 0;

    renderPass.framebuffer.bindDefault();
    renderPass.blendMode.bindDefault();
    renderPass.viewport.bindDefault();
    renderPass.vertexbuffer.bindDefault();
    renderPass.shader.bindDefault();
}
