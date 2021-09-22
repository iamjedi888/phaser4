import { IFile } from './IFile';
import { IFileData } from './IFileData';
export declare function RequestFile(file: IFile, preload: (file: IFile) => boolean, onload: (file: IFile) => Promise<boolean>, fileData?: IFileData): Promise<IFile>;
//# sourceMappingURL=RequestFile.d.ts.map