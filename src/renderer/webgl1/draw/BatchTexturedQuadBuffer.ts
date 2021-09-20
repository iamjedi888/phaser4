import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { QuadVertexComponent } from '../../../components/vertices/QuadVertexComponent';
import { SetQuadTextureIndex } from '../../../components/vertices/SetQuadTextureIndex';
import { SetTexture } from '../renderpass/SetTexture';

export function BatchTexturedQuadBuffer <T extends ITexture> (texture: T, id: number, renderPass: IRenderPass): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const textureIndex = SetTexture(texture);

    SetQuadTextureIndex(id, textureIndex);

    F32.set(QuadVertexComponent.values[id], offset);
}
