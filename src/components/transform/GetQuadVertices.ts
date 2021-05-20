import { Extent2DComponent } from './Extent2DComponent';
import { Vertices } from './Vertices';
import { WorldMatrix2DComponent } from './WorldMatrix2DComponent';

export function GetQuadVertices (id: number): Vertices
{
    const a = WorldMatrix2DComponent.a[id];
    const b = WorldMatrix2DComponent.b[id];
    const c = WorldMatrix2DComponent.c[id];
    const d = WorldMatrix2DComponent.d[id];
    const tx = WorldMatrix2DComponent.tx[id];
    const ty = WorldMatrix2DComponent.ty[id];

    const x = Extent2DComponent.x[id];
    const y = Extent2DComponent.y[id];
    const right = Extent2DComponent.right[id];
    const bottom = Extent2DComponent.bottom[id];

    const x0 = (x * a) + (y * c) + tx;
    const y0 = (x * b) + (y * d) + ty;

    const x1 = (x * a) + (bottom * c) + tx;
    const y1 = (x * b) + (bottom * d) + ty;

    const x2 = (right * a) + (bottom * c) + tx;
    const y2 = (right * b) + (bottom * d) + ty;

    const x3 = (right * a) + (y * c) + tx;
    const y3 = (right * b) + (y * d) + ty;

    return { x0, y0, x1, y1, x2, y2, x3, y3 };
}
