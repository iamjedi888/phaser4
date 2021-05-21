import { Extent2DComponent } from './Extent2DComponent';
import { QuadVertexComponent } from '../vertices/QuadVertexComponent';
import { VertexComponent } from '../vertices/VertexComponent';
import { WorldMatrix2DComponent } from './WorldMatrix2DComponent';

export function GetQuadVertices (id: number): void
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

    const v1 = QuadVertexComponent.v1[id];
    const v2 = QuadVertexComponent.v2[id];
    const v3 = QuadVertexComponent.v3[id];
    const v4 = QuadVertexComponent.v4[id];

    //  TODO: Move to a system based on world or extent change only

    VertexComponent.x[v1] = (x * a) + (y * c) + tx;
    VertexComponent.y[v1] = (x * b) + (y * d) + ty;

    VertexComponent.x[v2] = (x * a) + (bottom * c) + tx;
    VertexComponent.y[v2] = (x * b) + (bottom * d) + ty;

    VertexComponent.x[v3] = (right * a) + (bottom * c) + tx;
    VertexComponent.y[v3] = (right * b) + (bottom * d) + ty;

    VertexComponent.x[v4] = (right * a) + (y * c) + tx;
    VertexComponent.y[v4] = (right * b) + (y * d) + ty;
}
