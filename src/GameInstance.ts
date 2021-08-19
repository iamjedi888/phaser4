import { Game } from './Game';

export let instance: Game;
export let frame: number = 0;
export let elapsed: number = 0;
export let phaser4Wasm: any;

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

    getWasm: (): any =>
    {
        return phaser4Wasm;
    },

    setWasm: (wasm: any): void =>
    {
        phaser4Wasm = wasm;
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
