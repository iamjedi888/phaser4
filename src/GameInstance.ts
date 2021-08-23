import { Game } from './Game';

export let instance: Game;
export let frame: number = 0;
export let elapsed: number = 0;

export const GameInstance =
{
    get: (): Game =>
    {
        return instance;
    },

    set: (game: Game | undefined): void =>
    {
        instance = game;
    },

    getFrame: (): number =>
    {
        return frame;
    },

    setFrame: (current: number): void =>
    {
        frame = current;
    },

    getElapsed: (): number =>
    {
        return elapsed;
    },

    setElapsed: (current: number): void =>
    {
        elapsed = current;
    }

};
