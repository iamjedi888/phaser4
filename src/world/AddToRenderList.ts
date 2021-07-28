import { GetWorldSize } from '../config/worldsize/GetWorldSize';
import { IBaseWorld } from './IBaseWorld';

//  Called by RebuildWorldList as it sweeps the world children, looking to see what will render or not

//  renderType:

//  0 = render
//  1 = postRender
export function AddToRenderList (world: IBaseWorld, id: number, renderType: number): void
{
    let len: number = world.listLength;
    const list = world.renderList;

    list[len] = id;
    list[len + 1] = renderType;

    world.listLength += 2;

    len += 2;

    //  Resize the render list
    if (len === list.length)
    {
        const newList = new Uint32Array(len + (GetWorldSize() * 4));

        newList.set(list, 0);

        world.renderList = newList;
    }
}
