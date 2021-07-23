import { IFile } from './IFile';

export function CreateFile (key: string, url: string): IFile
{
    return {
        key,
        url,
        skipCache: false
    };
}
