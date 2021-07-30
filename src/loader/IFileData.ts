import { IGLTextureBindingConfig } from '../renderer/webgl1/textures/IGLTextureBindingConfig';

export interface IFileData
{
    skipCache?: boolean;
    getImage?: boolean;
    requestInit?: RequestInit;
    glConfig?: IGLTextureBindingConfig;
}
