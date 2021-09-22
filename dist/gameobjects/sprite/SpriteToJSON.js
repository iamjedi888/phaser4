export function SpriteToJSON(sprite) {
  return {
    id: sprite.id,
    type: sprite.type,
    name: sprite.name,
    parentID: sprite.getParent().id,
    visible: sprite.visible,
    hasTexture: sprite.hasTexture,
    texture: sprite.hasTexture ? sprite.texture.key : "",
    frame: sprite.hasTexture ? sprite.frame.key : "",
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    scaleX: sprite.scale.x,
    scaleY: sprite.scale.y,
    skewX: sprite.skew.x,
    skewY: sprite.skew.y,
    originX: sprite.origin.x,
    originY: sprite.origin.y,
    width: sprite.size.width,
    height: sprite.size.height,
    alpha: sprite.alpha
  };
}
