import { GetFirstChildID } from '../hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../hierarchy/GetNextSiblingID';
import { GetNumChildren } from '../hierarchy/GetNumChildren';
import { HasRenderableChildren } from '../permissions/HasRenderableChildren';
import { SetInViewFromBounds } from '../transform/SetInViewFromBounds';
import { WillRender } from '../permissions/WillRender';

export function UpdateInView (id: number, gameFrame: number, cx: number, cy: number, cright: number, cbottom: number): void
{
    SetInViewFromBounds(id, gameFrame, cx, cy, cright, cbottom);

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
                    UpdateInView(childID, gameFrame, cx, cy, cright, cbottom);
                }
                else
                {
                    SetInViewFromBounds(childID, gameFrame, cx, cy, cright, cbottom);
                }
            }

            childID = GetNextSiblingID(childID);
        }
    }
}
