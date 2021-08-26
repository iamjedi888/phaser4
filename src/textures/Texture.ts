import { BindingQueue } from '../renderer/BindingQueue';
import { Frame } from './Frame';
import { IGLTextureBinding } from '../renderer/webgl1/textures/IGLTextureBinding';
import { IGLTextureBindingConfig } from '../renderer/webgl1/textures/IGLTextureBindingConfig';
import { ITexture } from './ITexture';
import { SetFrameSize } from './SetFrameSize';

export class Texture implements ITexture
{
    //  Unique identifier of this Texture, if stored in the Texture Manager
    key: string = '';

    locked: boolean = true;

    width: number;
    height: number;

    image: TexImageSource;

    binding: IGLTextureBinding;

    firstFrame: Frame;

    frames: Map<string | number, Frame>;

    data: unknown;

    constructor (image?: TexImageSource, width?: number, height?: number, glConfig?: IGLTextureBindingConfig)
    {
        if (image)
        {
            width = image.width;
            height = image.height;
        }

        this.image = image;

        this.width = width;
        this.height = height;

        this.frames = new Map();

        this.data = {};

        this.addFrame('__BASE', 0, 0, width, height);

        BindingQueue.add(this, glConfig);
    }

    addFrame (key: string | number, x: number, y: number, width: number, height: number): Frame
    {
        if (this.frames.has(key))
        {
            return null;
        }

        const frame = new Frame(this, key, x, y, width, height);

        this.frames.set(key, frame);

        if (!this.firstFrame || this.firstFrame.key === '__BASE')
        {
            this.firstFrame = frame;
        }

        return frame;
    }

    getFrame (key?: string | number | Frame): Frame
    {
        //  null, undefined, empty string, zero
        if (!key)
        {
            return this.firstFrame;
        }

        if (key instanceof Frame)
        {
            key = key.key;
        }

        let frame: Frame = this.frames.get(key);

        if (!frame)
        {
            console.warn(`Frame missing: ${key}`);

            frame = this.firstFrame;
        }

        return frame;
    }

    setSize (width: number, height: number): void
    {
        this.width = width;
        this.height = height;

        const frame = this.frames.get('__BASE');

        SetFrameSize(frame, width, height);
    }

    update (image: TexImageSource, glConfig?: IGLTextureBindingConfig): void
    {
        this.image = image;

        this.setSize(image.width, image.height);

        BindingQueue.add(this, glConfig);
    }

    destroy (): void
    {
        if (this.binding)
        {
            this.binding.destroy();
        }

        this.frames.clear();

        this.binding = null;
        this.data = null;
        this.image = null;
        this.firstFrame = null;
    }
}
