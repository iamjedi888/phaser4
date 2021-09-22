import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
export declare function GetRenderList(): IGameObject[];
export declare function GetRenderChildTotal(): number;
export declare function GetProcessTotal(): number;
export declare function ResetRenderChildTotal(): void;
export declare function RenderGLNode<T extends IRenderPass>(renderPass: T, id: number): void;
//# sourceMappingURL=RenderGLNode.d.ts.map