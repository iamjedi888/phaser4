import { BoundsComponent } from './BoundsComponent';
import { GameObjectTree } from '../../gameobjects/GameObjectTree';
import { GetNumChildren } from '../hierarchy/GetNumChildren';

export function GetBounds (id: number): number[]
{
    const children = GameObjectTree.get(id);

    let [ x, y, right, bottom ] = BoundsComponent.global[id];

    children.forEach(childID =>
    {
        const [ childX, childY, childRight, childBottom ] = (GetNumChildren(childID) > 0) ? GetBounds(childID) : BoundsComponent.global[childID];

        if (childX < x)
        {
            x = childX;
        }

        if (childY < y)
        {
            y = childY;
        }

        if (childRight > right)
        {
            right = childRight;
        }

        if (childBottom > bottom)
        {
            bottom = childBottom;
        }
    });

    return [ x, y, right, bottom ];
}
