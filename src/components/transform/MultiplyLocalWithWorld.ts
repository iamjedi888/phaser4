import { LocalMatrix2DComponent } from './LocalMatrix2DComponent';
import { WorldMatrix2DComponent } from './WorldMatrix2DComponent';

export function MultiplyLocalWithWorld (parentID: number, id: number): void
{
    const pa = WorldMatrix2DComponent.a[parentID];
    const pb = WorldMatrix2DComponent.b[parentID];
    const pc = WorldMatrix2DComponent.c[parentID];
    const pd = WorldMatrix2DComponent.d[parentID];
    const ptx = WorldMatrix2DComponent.tx[parentID];
    const pty = WorldMatrix2DComponent.ty[parentID];

    const a = LocalMatrix2DComponent.a[id];
    const b = LocalMatrix2DComponent.b[id];
    const c = LocalMatrix2DComponent.c[id];
    const d = LocalMatrix2DComponent.d[id];
    const tx = LocalMatrix2DComponent.tx[id];
    const ty = LocalMatrix2DComponent.ty[id];

    WorldMatrix2DComponent.a[id] = a * pa + b * pc;
    WorldMatrix2DComponent.b[id] = a * pb + b * pd;
    WorldMatrix2DComponent.c[id] = c * pa + d * pc;
    WorldMatrix2DComponent.d[id] = c * pb + d * pd;
    WorldMatrix2DComponent.tx[id] = tx * pa + ty * pc + ptx;
    WorldMatrix2DComponent.ty[id] = tx * pb + ty * pd + pty;
}
