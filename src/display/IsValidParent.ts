import { GetParentID } from '../components/hierarchy/GetParentID';
import { IGameObject } from '../gameobjects/IGameObject';

export function IsValidParent <T extends IGameObject> (parent: T, child: T): boolean
{
    //  It's not a valid parent if the ID matches the parent, or it's already the child's parent
    return !(child.id === parent.id || parent.id === GetParentID(child.id));
}
