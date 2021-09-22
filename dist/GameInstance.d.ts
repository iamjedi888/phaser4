import { Game } from './Game';
export declare let instance: Game;
export declare let frame: number;
export declare let elapsed: number;
export declare const GameInstance: {
    get: () => Game;
    set: (game: Game | undefined) => void;
    getFrame: () => number;
    setFrame: (current: number) => void;
    getElapsed: () => number;
    setElapsed: (current: number) => void;
};
//# sourceMappingURL=GameInstance.d.ts.map