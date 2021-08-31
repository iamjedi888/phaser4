import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GetChildIDsFromParentID } from '../components/hierarchy/GetChildIDsFromParentID';
import { IGameObject } from '../gameobjects/IGameObject';
import { RelinkChildren } from '../components/hierarchy/RelinkChildren';

//  Sort the children by calling the propertyGetter function which is passed the child
//  This function should return a string or number value
export function SortChildren <P extends IGameObject> (parent: P, propertyGetter: (child: IGameObject) => never): IGameObject[]
{
    const parentID = parent.id;

    const children = GetChildIDsFromParentID(parentID);

    children.sort((a: number, b: number) =>
    {
        const childA = GameObjectCache.get(a);
        const childB = GameObjectCache.get(b);

        return propertyGetter(childA) - propertyGetter(childB);
    });

    RelinkChildren(parentID, children);

    return parent.getChildren();
}
