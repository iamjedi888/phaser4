import { RenderDataComponent } from "./RenderDataComponent";
let numWorldTransforms = 0;
export function ResetWorldRenderData(id, gameFrame) {
  numWorldTransforms = 0;
  RenderDataComponent.gameFrame[id] = gameFrame;
  RenderDataComponent.dirtyFrame[id] = 0;
  RenderDataComponent.numRendered[id] = 0;
  RenderDataComponent.numRenderable[id] = 0;
}
export function UpdateNumWorldTransforms() {
  numWorldTransforms++;
}
export function GetNumWorldTransforms() {
  return numWorldTransforms;
}
