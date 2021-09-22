import { IGameObject } from '../gameobjects/IGameObject';
export interface IWorldRenderData {
    gameFrame: number;
    dirtyLocal: number;
    dirtyWorld: number;
    dirtyQuad: number;
    dirtyColor: number;
    dirtyView: number;
    numChildren: number;
    rendered: number;
    renderMs: number;
    preRenderMs: number;
    updated: number;
    updateMs: number;
    fps: number;
    delta: number;
    processed: number;
    renderList?: IGameObject[];
}
//# sourceMappingURL=IWorldRenderData.d.ts.map