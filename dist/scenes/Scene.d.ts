import { Game } from '../Game';
import { IEventEmitter } from '../events/IEventEmitter';
import { IEventInstance } from '../events/IEventInstance';
import { IScene } from './IScene';
import { ISceneConfig } from './ISceneConfig';
export declare class Scene implements IScene, IEventEmitter {
    key: string;
    game: Game;
    events: Map<string, Set<IEventInstance>>;
    constructor(config?: string | ISceneConfig);
}
//# sourceMappingURL=Scene.d.ts.map