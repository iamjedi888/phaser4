import { GetParentID } from '../components/hierarchy/GetParentID';
import { IGameObject } from '../gameobjects/IGameObject';

export function IsValidParent <P extends IGameObject, C extends IGameObject> (parent: P, child: C): boolean
{
    //  It's not a valid parent if the ID matches the parent, or it's already the child's parent
    return !(child.id === parent.id || parent.id === GetParentID(child.id));
}
