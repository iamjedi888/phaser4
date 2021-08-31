import { GetParentID } from '../components/hierarchy/GetParentID';
import { IGameObject } from '../gameobjects/IGameObject';

export function IsValidParent <P extends IGameObject, C extends IGameObject> (parent: P, child: C): boolean
{
    const childID = child.id;
    const parentID = parent.id;

    //  It's not a valid parent if:

    //  1) The parent ID is zero (only the Game instance can be zero)
    //  2) The Child ID matches the Parent ID
    //  3) The parent is already the child's parent

    return !(parentID === 0 || childID === parentID || parentID === GetParentID(childID));
}
