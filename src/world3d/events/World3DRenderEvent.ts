import { IBaseWorld3D } from '../IBaseWorld3D';
import { IWorld3DRenderData } from '../IWorld3DRenderData';

export const World3DRenderEvent: string = 'worldrender';

export type World3DRenderEventHandler = (renderData: IWorld3DRenderData, world: IBaseWorld3D) => void;
