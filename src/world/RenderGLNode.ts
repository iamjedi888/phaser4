import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { ClearDirtyWorldTransform } from '../components/dirty/ClearDirtyWorldTransform';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../components/hierarchy/GetNumChildren';
import { HasCustomDisplayList } from '../components/permissions/HasCustomDisplayList';
import { HasRenderableChildren } from '../components/permissions/HasRenderableChildren';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IsInView } from '../components/transform/IsInView';
import { WillCacheChildren } from '../components/permissions/WillCacheChildren';
import { WillRender } from '../components/permissions/WillRender';

const RENDER_LIST: IGameObject[] = [];

let RENDER_CHILD_TOTAL: number = 0;
let PROCESS_TOTAL: number = 0;

export function GetRenderList (): IGameObject[]
{
    return RENDER_LIST;
}

export function GetRenderChildTotal (): number
{
    return RENDER_CHILD_TOTAL;
}

export function GetProcessTotal (): number
{
    return PROCESS_TOTAL;
}

export function ResetRenderChildTotal (): void
{
    RENDER_CHILD_TOTAL = 0;
    PROCESS_TOTAL = 0;
    RENDER_LIST.length = 0;
}

export function RenderGLNode <T extends IRenderPass> (renderPass: T, id: number): void
{
    const inView = IsInView(id) || WillCacheChildren(id);

    let gameObject;

    PROCESS_TOTAL++;

    if (inView)
    {
        gameObject = GameObjectCache.get(id);

        gameObject.renderGL(renderPass);

        RENDER_CHILD_TOTAL++;
    }

    if (HasCustomDisplayList(id))
    {
        gameObject = GameObjectCache.get(id);

        gameObject.renderGL(renderPass);

        RENDER_CHILD_TOTAL++;

        const children = gameObject.getChildren(renderPass);

        const numChildren = children.length;

        for (let i = 0; i < numChildren; i++)
        {
            const childGameObject = children[i];
            const childID = childGameObject.id;

            PROCESS_TOTAL++;

            if (WillRender(childID))
            {
                if (GetNumChildren(childID))
                {
                    RenderGLNode(renderPass, childID);
                }
                else
                {
                    childGameObject.renderGL(renderPass);
                    childGameObject.postRenderGL(renderPass);

                    RENDER_CHILD_TOTAL++;
                }
            }
        }

        gameObject.postRenderGL(renderPass);
    }
    else
    {
        const numChildren = HasRenderableChildren(id, renderPass.isCameraDirty());

        if (numChildren)
        {
            let childID = GetFirstChildID(id);

            for (let i = 0; i < numChildren; i++)
            {
                PROCESS_TOTAL++;

                if (WillRender(childID))
                {
                    if (GetNumChildren(childID))
                    {
                        RenderGLNode(renderPass, childID);
                    }
                    else if (IsInView(childID))
                    {
                        const childGameObject = GameObjectCache.get(childID);

                        childGameObject.renderGL(renderPass);
                        childGameObject.postRenderGL(renderPass);

                        RENDER_CHILD_TOTAL++;
                    }
                }

                childID = GetNextSiblingID(childID);
            }
        }
    }

    if (inView)
    {
        gameObject.postRenderGL(renderPass);
    }

    ClearDirtyChildTransform(id);
    ClearDirtyWorldTransform(id);
}
