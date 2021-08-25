import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasRenderableChildren } from '../components/permissions/HasRenderableChildren';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IsInView } from '../components/transform/IsInView';
import { WillRender } from '../components/permissions/WillRender';

let RENDER_CHILD_TOTAL: number = 0;

export function GetRenderChildTotal (): number
{
    return RENDER_CHILD_TOTAL;
}

export function ResetRenderChildTotal (): void
{
    RENDER_CHILD_TOTAL = 0;
}

export function RenderChild <T extends IRenderPass> (renderPass: T, id: number): void
{
    const inView = IsInView(id);

    let gameObject;

    if (inView)
    {
        gameObject = GameObjectCache.get(id);

        gameObject.renderGL(renderPass);

        RENDER_CHILD_TOTAL++;

        // renderData.rendered++;
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
                    RenderChild(renderPass, childID);
                }
                else if (IsInView(childID))
                {
                    // renderData.rendered++;

                    const childGameObject = GameObjectCache.get(childID);

                    childGameObject.renderGL(renderPass);
                    childGameObject.postRenderGL(renderPass);

                    RENDER_CHILD_TOTAL++;
                }
            }

            childID = GetNextSiblingID(childID);
        }
    }

    if (inView)
    {
        gameObject.postRenderGL(renderPass);
    }
}
