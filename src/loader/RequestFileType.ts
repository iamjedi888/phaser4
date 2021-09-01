import { IFile } from './IFile';
import { ILoader } from './ILoader';

export type RequestFileType = (loader?: ILoader) => Promise<IFile>;
