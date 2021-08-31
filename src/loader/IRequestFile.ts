import { IFile } from './IFile';
import { IFileData } from './IFileData';
import { ILoader } from './ILoader';

export interface IRequestFile
{
    onstart: (loader?: ILoader) => IFile;
    preload: (file: IFile) => boolean;
    onload: (file: IFile) => Promise<boolean>;
    fileData?: IFileData
}
