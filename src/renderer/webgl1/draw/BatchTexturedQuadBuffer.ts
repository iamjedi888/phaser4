import { GameObjectStore } from '../../../gameobjects/GameObjectStore';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { SetQuadTextureIndex } from '../../../components/vertices/SetQuadTextureIndex';

export function BatchTexturedQuadBuffer <T extends ITexture> (texture: T, id: number, renderPass: IRenderPass): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const textureIndex = renderPass.textures.set(texture);

    SetQuadTextureIndex(id, textureIndex);

    F32.set(GameObjectStore.quad[id], offset);
}
