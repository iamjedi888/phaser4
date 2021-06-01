import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';

export const ScenePostRenderGLEvent: string = 'postrenderGL';

export type ScenePostRenderGLEventHandler = <T extends IRenderPass> (renderPass: T) => void;
