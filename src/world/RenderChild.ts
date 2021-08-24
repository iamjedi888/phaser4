import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasRenderableChildren } from '../components/permissions/HasRenderableChildren';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { WillRender } from '../components/permissions/WillRender';

export function RenderChild <T extends IRenderPass> (renderPass: T, id: number, x: number, y: number, right: number, bottom: number, renderData): void
{
    const intersects = BoundsIntersects(id, x, y, right, bottom);

    let gameObject;

    if (intersects)
    {
        gameObject = GameObjectCache.get(id);

        gameObject.renderGL(renderPass);

        renderData.rendered++;
    }

    const numChildren = HasRenderableChildren(id);

    if (numChildren)
    {
        let childID = GetFirstChildID(id);

        for (let i = 0; i < numChildren; i++)
        {
            if (WillRender(childID))
            {
                if (GetNumChildren(childID))
                {
                    RenderChild(renderPass, childID, x, y, right, bottom, renderData);
                }
                else if (BoundsIntersects(childID, x, y, right, bottom))
                {
                    renderData.rendered++;

                    const childGameObject = GameObjectCache.get(childID);

                    childGameObject.renderGL(renderPass);
                    childGameObject.postRenderGL(renderPass);
                }
            }

            childID = GetNextSiblingID(childID);
        }
    }

    if (intersects)
    {
        gameObject.postRenderGL(renderPass);
    }
}
