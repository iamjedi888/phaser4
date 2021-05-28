import { IBaseCamera } from '../camera/IBaseCamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from '../scenes/IScene';
import { IWorldRenderData } from './IWorldRenderData';

export interface IBaseWorld extends IGameObject
{
    scene: IScene;
    camera: IBaseCamera;
    renderData: IWorldRenderData;
    forceRefresh: boolean;
    is3D: boolean;
    renderList: Set<IGameObject>;
    render (gameFrame: number): void;
    shutdown (): void;
}
