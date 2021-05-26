import { BindBlendMode } from './BindBlendMode';
import { BindFramebuffer } from './BindFramebuffer';
import { BindVertexBuffer } from './BindVertexBuffer';
import { BindViewport } from './BindViewport';
import { IRenderPass } from './IRenderPass';

export function Start (renderPass: IRenderPass): void
{
    //  Rather than doing Bind object comparisons each bind can store an integer that is checked

    renderPass.current2DCamera = renderPass.quadCamera;
    renderPass.cameraMatrix = renderPass.quadCamera.matrix;

    renderPass.count = 0;
    renderPass.flushTotal = 0;

    BindFramebuffer(renderPass, false, renderPass.defaultFramebuffer);
    BindBlendMode(renderPass, renderPass.defaultBlendMode);
    BindViewport(renderPass, renderPass.defaultViewport);
    BindVertexBuffer(renderPass, renderPass.defaultVertexBuffer);
}
