export function DrawTexturedQuad(frame, alpha, worldTransform, transformExtent, renderer) {
  if (!frame) {
    return;
  }
  const ctx = renderer.ctx;
  const {a, b, c, d, tx, ty} = worldTransform;
  const {x, y} = transformExtent;
  ctx.save();
  ctx.setTransform(a, b, c, d, tx, ty);
  ctx.globalAlpha = alpha;
  ctx.drawImage(frame.texture.image, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);
  ctx.restore();
}
