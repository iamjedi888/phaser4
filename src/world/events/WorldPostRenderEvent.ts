import { IBaseWorld } from '../IBaseWorld';
import { IRenderPass } from '../../renderer/webgl1/renderpass/IRenderPass';

export const WorldPostRenderEvent: string = 'worldpostrender';

export type WorldPostRenderEventHandler = (renderPass: IRenderPass, world: IBaseWorld) => void;
