import { IFile } from './IFile';
import { IFileData } from './IFileData';

export interface ILoaderFile
{
    file: IFile;
    preload: (file: IFile) => boolean;
    onload: (file: IFile) => Promise<boolean>;
    fileData?: IFileData
}
