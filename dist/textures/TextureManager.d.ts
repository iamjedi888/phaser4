import { IGLTextureBindingConfig } from '../renderer/webgl1/textures/IGLTextureBindingConfig';
import { Texture } from './Texture';
export declare class TextureManager {
    textures: Map<string, Texture>;
    constructor();
    private createDefaultTextures;
    get(key: string): Texture;
    has(key: string): boolean;
    add(key: string, source: Texture | TexImageSource, glConfig?: IGLTextureBindingConfig): Texture;
    update(key: string, source: TexImageSource, glConfig?: IGLTextureBindingConfig): Texture;
}
//# sourceMappingURL=TextureManager.d.ts.map