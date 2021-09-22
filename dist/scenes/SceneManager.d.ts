import { Game } from '../Game';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from './IScene';
export declare class SceneManager {
    readonly id: number;
    game: Game;
    scenes: Map<string, IScene>;
    sceneIndex: number;
    flush: boolean;
    constructor();
    boot(): void;
    update(): void;
    preRender(): void;
    render(renderPass: IRenderPass): void;
}
//# sourceMappingURL=SceneManager.d.ts.map