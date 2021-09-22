import { EventEmitter } from './events/EventEmitter';
import { IRenderPass } from './renderer/webgl1/renderpass/IRenderPass';
import { IWorldRenderData } from './world/IWorldRenderData';
import { Time } from './components/timer/Time';
export declare class Game extends EventEmitter {
    readonly id: number;
    time: Time;
    isBooted: boolean;
    isPaused: boolean;
    willUpdate: boolean;
    willRender: boolean;
    renderStats: IWorldRenderData;
    constructor(...settings: {
        (): void;
    }[]);
    boot(settings: {
        (): void;
    }[]): void;
    pause(): void;
    resume(): void;
    update(delta: number, time: number): void;
    render(renderPass: IRenderPass, delta: number, time: number): void;
    step(now: number): void;
    destroy(): void;
}
//# sourceMappingURL=Game.d.ts.map