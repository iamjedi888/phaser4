import { Game } from '../Game';
import { IEventInstance } from '../events/IEventInstance';

export interface IScene
{
    key?: string;
    game: Game;
    events: Map<string, Set<IEventInstance>>;
    // shutdown (): void;
    // destroy (): void;
}
