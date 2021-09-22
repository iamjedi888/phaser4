import { IGLTextureBindingConfig } from './webgl1/textures/IGLTextureBindingConfig';
import { ITexture } from '../textures/ITexture';
export declare type BindingQueueEntry = {
    texture: ITexture;
    glConfig: IGLTextureBindingConfig;
};
export declare const BindingQueue: {
    add: (texture: ITexture, glConfig?: IGLTextureBindingConfig) => void;
    get: () => BindingQueueEntry[];
    clear: () => void;
};
//# sourceMappingURL=BindingQueue.d.ts.map