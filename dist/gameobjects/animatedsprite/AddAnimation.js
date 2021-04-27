import {GetFrames} from "../../textures/GetFrames";
export function AddAnimation(key, frames, ...sprites) {
  sprites.forEach((sprite) => {
    if (!sprite.anims.has(key)) {
      sprite.anims.set(key, GetFrames(sprite.texture, frames));
    }
  });
  return sprites;
}
