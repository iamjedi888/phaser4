export function CreateWorldRenderData() {
  return {
    gameFrame: 0,
    dirtyLocal: 0,
    dirtyWorld: 0,
    dirtyQuad: 0,
    dirtyColor: 0,
    dirtyView: 0,
    numChildren: 0,
    rendered: 0,
    renderMs: 0,
    preRenderMs: 0,
    updated: 0,
    updateMs: 0,
    fps: 0,
    delta: 0,
    processed: 0
  };
}
