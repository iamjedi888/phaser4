import { IScene } from './IScene';

export interface ISceneRenderData
{
    //  The current Game Frame number
    gameFrame: number;

    //  How many Cameras were made dirty this frame across all Scenes?
    numDirtyCameras: number;

    //  How many Game Objects were made dirty this frame across all Scenes?
    numDirtyFrames: number;

    //  How many Game Objects were processed this frame across all Scenes?
    numTotalFrames: number;

    //  A reference to all of the Scenes in the Scene Manager from which we can get the Worlds to render
    scenes: Map<string, IScene>;
}
