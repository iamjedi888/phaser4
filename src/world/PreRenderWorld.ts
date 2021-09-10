import { ClearDirtyChildColor } from '../components/dirty/ClearDirtyChildColor';
import { ClearDirtyChildTransform } from '../components/dirty/ClearDirtyChildTransform';
import { GetFirstChildID } from '../components/hierarchy/GetFirstChildID';
import { GetNextSiblingID } from '../components/hierarchy/GetNextSiblingID';
import { HasCustomDisplayList } from '../components/permissions/HasCustomDisplayList';
import { HasDirtyChildColor } from '../components/dirty/HasDirtyChildColor';
import { HasDirtyChildTransform } from '../components/dirty/HasDirtyChildTransform';
import { IBaseWorld } from './IBaseWorld';
import { ProcessNode } from './ProcessNode';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { UpdateNode } from './UpdateNode';

export function PreRenderWorld <T extends IBaseWorld> (world: T, gameFrame: number): boolean
{
    const start = performance.now();

    const id = world.id;

    const renderData = world.renderData;

    ResetWorldRenderData(renderData, gameFrame);

    const camera = world.camera;
    const cameraUpdated = camera.updateBounds();

    const checkColor = HasDirtyChildColor(id);
    const checkTransform = HasDirtyChildTransform(id) || cameraUpdated;

    if (!checkColor && !checkTransform)
    {
        //  Nothing needs updating, so let's get out of here
        return false;
    }

    const cx = camera.getBoundsX();
    const cy = camera.getBoundsY();
    const cright = camera.getBoundsRight();
    const cbottom = camera.getBoundsBottom();

    const stack = world.stack;

    stack[0] = id;

    let stackIndex = 1;
    let parentNode = id;
    let isDisplayList = false;
    let node = GetFirstChildID(id);

    stackBlock:
    {
        while (stackIndex > 0)
        {
            UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);

            //  Dive as deep as we can go, adding all parents to the stack for _this branch_
            //  If the parent isn't dirty and has no dirty children, go no further down this branch

            while (ProcessNode(node, cameraUpdated, isDisplayList))
            {
                stack[stackIndex++] = node;

                parentNode = node;
                isDisplayList = HasCustomDisplayList(node);

                node = GetFirstChildID(node);

                UpdateNode(node, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);
            }

            //  We're at the bottom of the branch
            //  We know 'node' doesn't have any children, but the next sibling might
            //  Move horizontally through the siblings, until we hit one with kids, or the end.

            let next = GetNextSiblingID(node);

            let climb = true;

            while (next && climb)
            {
                if (ProcessNode(next, cameraUpdated, isDisplayList))
                {
                    //  The 'next' sibling has a child, so we're going deeper
                    climb = false;
                    break;
                }
                else
                {
                    UpdateNode(next, parentNode, checkColor, checkTransform, cx, cy, cright, cbottom, cameraUpdated, isDisplayList, renderData);

                    next = GetNextSiblingID(next);
                }
            }

            //  The moment we get here, we need to treat it like a whole new branch
            //  We have either run out of siblings, or found one with children

            if (climb)
            {
                //  No children and no more siblings, so let's climb
                //  Go back up the stack until we find a node with a sibling

                while (next === 0)
                {
                    node = stack[--stackIndex];

                    if (!node)
                    {
                        break stackBlock;
                    }

                    next = GetNextSiblingID(node);
                }

                parentNode = stack[stackIndex - 1];
                isDisplayList = HasCustomDisplayList(parentNode);
            }

            //  'next' now contains the sibling of the stack parent, set it to 'node'
            node = next;
        }
    }

    ClearDirtyChildColor(id);
    ClearDirtyChildTransform(id);

    world.getNumChildren();

    renderData.preRenderMs = performance.now() - start;

    return true;
}
