import { CSVFile } from './CSVFile';
import { IFile } from '../IFile';
import { IFileData } from '../IFileData';

export async function LoadCSVFile (key: string, url?: string, fileData: IFileData = {}): Promise<IFile>
{
    const load = CSVFile(key, url, fileData);

    return load();
}
