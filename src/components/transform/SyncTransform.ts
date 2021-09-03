import { IContainer } from '../../gameobjects/container/IContainer';
import { SetQuadPosition } from '../vertices/SetQuadPosition';
import { UpdateWorldTransform } from './UpdateWorldTransform';

export function SyncTransform <T extends IContainer> (gameObject: T): void
{
    /*
    const id = gameObject.id;

    const x = Transform2DComponent.x[id];
    const y = Transform2DComponent.y[id];
    const rotation = Transform2DComponent.rotation[id];
    const scaleX = Transform2DComponent.scaleX[id];
    const scaleY = Transform2DComponent.scaleY[id];
    const skewX = Transform2DComponent.skewX[id];
    const skewY = Transform2DComponent.skewY[id];

    const local = Transform2DComponent.local[id];

    local[0] = Math.cos(rotation + skewY) * scaleX;
    local[1] = Math.sin(rotation + skewY) * scaleX;
    local[2] = -Math.sin(rotation - skewX) * scaleY;
    local[3] = Math.cos(rotation - skewX) * scaleY;
    local[4] = x;
    local[5] = y;

    UpdateWorldTransform(id);

    const [ a, b, c, d, tx, ty ] = Transform2DComponent.world[id];

    const ex = Extent2DComponent.x[id];
    const ey = Extent2DComponent.y[id];
    const right = Extent2DComponent.right[id];
    const bottom = Extent2DComponent.bottom[id];

    const x0 = (ex * a) + (ey * c) + tx;
    const y0 = (ex * b) + (ey * d) + ty;

    const x1 = (ex * a) + (bottom * c) + tx;
    const y1 = (ex * b) + (bottom * d) + ty;

    const x2 = (right * a) + (bottom * c) + tx;
    const y2 = (right * b) + (bottom * d) + ty;

    const x3 = (right * a) + (ey * c) + tx;
    const y3 = (right * b) + (ey * d) + ty;

    SetQuadPosition(id, x0, y0, x1, y1, x2, y2, x3, y3);

    //  x, y, right, bottom:
    const bx = Math.min(x0, x1, x2, x3);
    const by = Math.min(y0, y1, y2, y3);
    const br = Math.max(x0, x1, x2, x3);
    const bb = Math.max(y0, y1, y2, y3);

    const bounds = BoundsComponent.global[id];

    bounds[0] = bx;
    bounds[1] = by;
    bounds[2] = br;
    bounds[3] = bb;
    */
}
