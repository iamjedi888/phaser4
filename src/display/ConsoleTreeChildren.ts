import { IGameObject } from '../gameobjects/IGameObject';

function GetInfo (entry: IGameObject): string
{
    const legend = (entry.getNumChildren() > 0) ? 'Parent' :  'Child';

    return `${legend} [ type=${entry.type}, id=${entry.id} name=${entry.name} ]`;
}

function LogChildren (entry: IGameObject): void
{
    console.group(GetInfo(entry));

    entry.getChildren().forEach(child =>
    {
        if (child.getNumChildren() > 0)
        {
            LogChildren(child);
        }
        else
        {
            console.log(GetInfo(child));
        }
    });

    console.groupEnd();
}

export function ConsoleTreeChildren <P extends IGameObject> (parent: P): void
{
    const entries = parent.getChildren();

    if (parent.hasOwnProperty('tag'))
    {
        console.group('World');
    }
    else
    {
        console.group(GetInfo(parent));
    }

    entries.forEach(entry =>
    {
        if (entry.getNumChildren() > 0)
        {
            LogChildren(entry);
        }
        else
        {
            console.log(GetInfo(entry));
        }
    });

    console.groupEnd();
}
