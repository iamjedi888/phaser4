import { RenderDataComponent } from './RenderDataComponent';

let numWorldTransforms: number = 0;

export function ResetWorldRenderData (id: number, gameFrame: number): void
{
    numWorldTransforms = 0;

    RenderDataComponent.gameFrame[id] = gameFrame;
    RenderDataComponent.dirtyFrame[id] = 0;
    RenderDataComponent.numRendered[id] = 0;
    RenderDataComponent.numRenderable[id] = 0;
}

export function UpdateNumWorldTransforms (): void
{
    numWorldTransforms++;
}

export function GetNumWorldTransforms (): number
{
    return numWorldTransforms;
}
