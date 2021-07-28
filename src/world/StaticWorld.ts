import { BaseWorld } from './BaseWorld';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { StaticCamera } from '../camera/StaticCamera';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    readonly type: string = 'StaticWorld';

    declare camera: IStaticCamera;

    constructor (scene: IScene)
    {
        super(scene);

        this.camera = new StaticCamera(800, 600);
    }

    checkWorldEntity (id: number): boolean
    {
        const cameraBounds = this.camera.bounds;

        return BoundsIntersects(id, cameraBounds.x, cameraBounds.y, cameraBounds.right, cameraBounds.bottom);
    }
}
