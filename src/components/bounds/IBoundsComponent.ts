import { IGameObject } from '../../IGameObject';
import { Rectangle } from '../../../geom/rectangle';

export interface IBoundsComponent
{
    entity: IGameObject;
    fixed: boolean;
    includeChildren: boolean;
    visibleOnly: boolean;
    set (x: number, y: number, width: number, height: number): void;
    get (): Rectangle;
    update (): Rectangle;
    updateLocal (): Rectangle;
    destroy (): void;
}
