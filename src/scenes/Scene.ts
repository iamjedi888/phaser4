import { Game } from '../Game';
import { GameInstance } from '../GameInstance';
import { IEventEmitter } from '../events/IEventEmitter';
import { IEventInstance } from '../events/IEventInstance';
import { IScene } from './IScene';
import { ISceneConfig } from './ISceneConfig';
import { Install } from './Install';

export class Scene implements IScene, IEventEmitter
{
    key: string;
    game: Game;
    events: Map<string, Set<IEventInstance>>;

    constructor (config?: string | ISceneConfig)
    {
        this.game = GameInstance.get();
        this.events = new Map();

        Install(this, config);
    }
}
