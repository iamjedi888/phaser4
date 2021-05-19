import { DepthFirstSearchRecursiveNested } from './DepthFirstSearchRecursiveNested';
import { IGameObject } from '../gameobjects/IGameObject';
import { SearchEntry } from './SearchEntryType';

function GetInfo (entry: IGameObject): string
{
    const legend = (entry.numChildren > 0) ? 'Parent' :  'Child';

    return `${legend} [ type=${typeof entry}, name=${entry.name} ]`;
}

function LogChildren (entry: SearchEntry): void
{
    console.group(GetInfo(entry.node));

    entry.children.forEach(child =>
    {
        if (child.children.length > 0)
        {
            LogChildren(child);
        }
        else
        {
            console.log(GetInfo(child.node));
        }
    });

    console.groupEnd();
}

export function ConsoleTreeChildren (parent: IGameObject): void
{
    const entries = DepthFirstSearchRecursiveNested(parent);

    if (parent.world === parent)
    {
        console.group('World');
    }
    else
    {
        console.group(GetInfo(parent));
    }

    entries.forEach(entry =>
    {
        if (entry.children.length)
        {
            LogChildren(entry);
        }
        else
        {
            console.log(GetInfo(entry.node));
        }
    });

    console.groupEnd();
}
