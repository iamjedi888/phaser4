import { EventEmitter } from '../../events/EventEmitter';
import { Vec2 } from '../../math/vec2/Vec2';
export declare class Mouse extends EventEmitter {
    primaryDown: boolean;
    auxDown: boolean;
    secondaryDown: boolean;
    blockContextMenu: boolean;
    localPoint: Vec2;
    hitPoint: Vec2;
    private target;
    private resolution;
    private mousedownHandler;
    private mouseupHandler;
    private mousemoveHandler;
    private mousewheelHandler;
    private contextmenuHandler;
    private blurHandler;
    private transPoint;
    constructor(target?: HTMLElement);
    private onBlur;
    private onMouseDown;
    private onMouseUp;
    private onMouseMove;
    private onMouseWheel;
    private onContextMenuEvent;
    positionToPoint(event: MouseEvent): Vec2;
    shutdown(): void;
}
//# sourceMappingURL=Mouse.d.ts.map