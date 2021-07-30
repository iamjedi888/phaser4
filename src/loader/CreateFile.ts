import { IFile } from './IFile';

export function CreateFile (key: string, url: string, skipCache: boolean = false): IFile
{
    return {
        key,
        url,
        skipCache
    };
}
