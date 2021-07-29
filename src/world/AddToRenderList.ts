import { GetWorldSize } from '../config/worldsize/GetWorldSize';
import { IBaseWorld } from './IBaseWorld';

//  Called by RebuildWorldList as it sweeps the world children, looking to see what will render or not

//  renderType:

//  0 = render
//  1 = postRender
//  2 = render + immediate postRender
export function AddToRenderList (world: IBaseWorld, id: number, renderType: number): void
{
    let len: number = world.listLength;
    const list = world.renderList;

    if (len > 0)
    {
        //  Get the previous entity in the list, if this is the same one
        //  we can merge it into a renderType 2.
        //  This cuts down on the list size and iterations.

        const prevEntity = list[len - 1];
        const prevType = list[len];

        if (prevEntity === id && prevType === 0 && renderType === 1)
        {
            //  Update the previous entry to use renderType 2
            list[len - 1] = 2;

            //  We didn't change the list size, so we can just return
            return;
        }
    }

    list[len] = id;
    list[len + 1] = renderType;

    world.listLength += 2;

    len += 2;

    if (len === list.length)
    {
        //  Resize the render list
        const newList = new Uint32Array(len + (GetWorldSize() * 4));

        newList.set(list, 0);

        world.renderList = newList;
    }
}
