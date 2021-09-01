import { CSVFile } from './CSVFile';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';
import { RequestFile } from '../RequestFile';

export async function LoadCSVFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const { onstart, preload, onload, fileData: parsedFileData } = CSVFile(key, url, fileData);

    return RequestFile(onstart(), preload, onload, parsedFileData);
}
