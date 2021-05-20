import { WorldMatrix2DComponent } from './WorldMatrix2DComponent';

export function CopyWorldToWorld (source: number, target: number): void
{
    WorldMatrix2DComponent.a[target] = WorldMatrix2DComponent.a[source];
    WorldMatrix2DComponent.b[target] = WorldMatrix2DComponent.b[source];
    WorldMatrix2DComponent.c[target] = WorldMatrix2DComponent.c[source];
    WorldMatrix2DComponent.d[target] = WorldMatrix2DComponent.d[source];
    WorldMatrix2DComponent.tx[target] = WorldMatrix2DComponent.tx[source];
    WorldMatrix2DComponent.ty[target] = WorldMatrix2DComponent.ty[source];
}
