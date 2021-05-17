import { IBoundsComponent } from './IBoundsComponent';
import { IGameObject } from '../../gameobjects/IGameObject';
import { Rectangle } from '../../geom/rectangle/Rectangle';
export declare class BoundsComponent implements IBoundsComponent {
    entity: IGameObject;
    private area;
    fixed: boolean;
    includeChildren: boolean;
    visibleOnly: boolean;
    constructor(entity: IGameObject);
    set(x: number, y: number, width: number, height: number): void;
    get(): Rectangle;
    updateLocal(): Rectangle;
    update(): Rectangle;
    destroy(): void;
}
//# sourceMappingURL=BoundsComponent.d.ts.map