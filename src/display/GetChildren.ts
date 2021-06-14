import { IGameObject } from '../gameobjects/IGameObject';

/**
 * Get all children from the given parent to one layer deep. Does not go any lower (see GetAllChildren)
 *
 * The children are returned in a new array. Therefore, modifying this array will not
 * mutate the parent.
 *
 * You can optionally provide a property and value to match against.
 *
 * @export
 * @param {IGameObject} parent
 * @param {string} [property]
 * @param {never} [value]
 * @returns {IGameObject[]}
 */
export function GetChildren (parent: IGameObject, property?: string | symbol, value?: never): IGameObject[]
{
    // const children = GetChildren()

    //  Fast path out of here
    if (!property)
    {
        return [ ...children ];
    }

    const results: IGameObject[] = [];

    children.forEach(child =>
    {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);

        if (descriptor && (value === undefined || value === descriptor.value))
        {
            results.push(child);
        }
    });

    return results;
}
