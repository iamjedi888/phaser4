import { ComponentType, ISchema, Query } from 'bitecs';

import { Frame } from './Frame';
import { IGLTextureBinding } from '../renderer/webgl1/textures/IGLTextureBinding';

export interface ITexture
{
    tag: ComponentType<ISchema>;
    key: string;
    locked: boolean;
    width: number;
    height: number;
    image?: TexImageSource;
    binding?: IGLTextureBinding;
    firstFrame: Frame;
    frames: Map<string | number, Frame>;
    data: unknown;
    inUseQuery: Query;
    addFrame (key: string | number, x: number, y: number, width: number, height: number): Frame;
    getFrame (key?: string | number | Frame): Frame;
    setSize (width: number, height: number): void;
    destroy (): void;
}
