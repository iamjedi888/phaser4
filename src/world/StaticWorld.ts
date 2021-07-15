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
    declare camera: IStaticCamera;

    constructor (scene: IScene)
    {
        super(scene);

        this.camera = new StaticCamera();
    }

    checkWorldEntity (id: number): boolean
    {
        //  TODO - Needs to use the Camera Bounds of course :)
        return BoundsIntersects(id, 0, 0, 800, 600);
    }
}
