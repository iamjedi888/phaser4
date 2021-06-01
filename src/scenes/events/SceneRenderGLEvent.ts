import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';

export const SceneRenderGLEvent: string = 'renderGL';

export type SceneRenderGLEventHandler = <T extends IRenderPass> (renderPass: T) => void;
