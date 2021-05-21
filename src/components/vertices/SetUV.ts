import { VertexComponent } from './VertexComponent';

export function SetUV (id: number, u: number, v: number): void
{
    VertexComponent.u[id] = u;
    VertexComponent.v[id] = v;
}
