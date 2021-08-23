import { DepthFirstSearchRecursiveNested3D } from './DepthFirstSearchRecursiveNested3D';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { SearchEntry3D } from './SearchEntry3DType';

function GetInfo (entry: IGameObject3D): string
{
    const legend = (entry.numChildren > 0) ? 'Parent' :  'Child';

    return `${legend} [ type=${entry.type}, name=${entry.name} ]`;
}

function LogChildren (entry: SearchEntry3D): void
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

export function ConsoleTreeChildren3D (parent: IGameObject3D): void
{
    const entries = DepthFirstSearchRecursiveNested3D(parent);

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
