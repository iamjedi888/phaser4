import { IFile } from './IFile';
import { IFileData } from './IFileData';

export async function RequestFile (file: IFile, preload: (file: IFile) => boolean, onload: (file: IFile) => Promise<boolean>, fileData?: IFileData): Promise<IFile>
{
    if (!preload(file))
    {
        return Promise.reject(file);
    }

    try
    {
        const request = new Request(file.url, fileData?.requestInit);

        file.response = await fetch(request);

        if (file.response.ok && await onload(file))
        {
            return Promise.resolve(file);
        }
        else
        {
            return Promise.reject(file);
        }
    }
    catch (error)
    {
        file.error = error;

        return Promise.reject(file);
    }
}
