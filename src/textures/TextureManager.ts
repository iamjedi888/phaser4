import { CreateCanvas } from './CreateCanvas';
import { IGLTextureBindingConfig } from '../renderer/webgl1/textures/IGLTextureBindingConfig';
import { Texture } from './Texture';
import { TextureManagerInstance } from './TextureManagerInstance';
import { WhiteTexture } from './WhiteTexture';

export class TextureManager
{
    textures: Map<string, Texture>;

    constructor ()
    {
        if (TextureManagerInstance.get())
        {
            throw new Error('Only 1 instance of TextureManager allowed');
        }

        this.textures = new Map();

        this.createDefaultTextures();

        TextureManagerInstance.set(this);
    }

    private createDefaultTextures (): void
    {
        this.add('__BLANK', new Texture(CreateCanvas(2, 2).canvas));

        const missing = CreateCanvas(32, 32);

        missing.strokeStyle = '#0f0';
        missing.moveTo(0, 0);
        missing.lineTo(32, 32);
        missing.stroke();
        missing.strokeRect(0.5, 0.5, 31, 31);

        this.add('__MISSING', new Texture(missing.canvas));

        const white = CreateCanvas(2, 2);

        white.fillStyle = '#fff';
        white.fillRect(0, 0, 2, 2);

        const whiteTexture = this.add('__WHITE', new Texture(white.canvas));

        //  Because this is used frequently by Graphics and Shapes
        WhiteTexture.set(whiteTexture);
    }

    get (key: string): Texture
    {
        const textures = this.textures;

        if (textures.has(key))
        {
            return textures.get(key);
        }
        else
        {
            return textures.get('__MISSING');
        }
    }

    has (key: string): boolean
    {
        return this.textures.has(key);
    }

    add (key: string, source: Texture | TexImageSource, glConfig?: IGLTextureBindingConfig): Texture
    {
        let texture: Texture;

        if (!this.textures.has(key))
        {
            if (source instanceof Texture)
            {
                texture = source;
            }
            else
            {
                texture = new Texture(source, 0, 0, glConfig);
            }

            texture.key = key;

            this.textures.set(key, texture);
        }

        return texture;
    }

    update (key: string, source: TexImageSource, glConfig?: IGLTextureBindingConfig): Texture
    {
        const texture = this.textures.get(key);

        if (texture)
        {
            texture.update(source, glConfig);
        }

        return texture;
    }
}
