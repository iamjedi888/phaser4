import { BindingQueue } from "../../BindingQueue";
import { GLTextureBinding } from "../textures/GLTextureBinding";
export function ProcessBindingQueue() {
  const queue = BindingQueue.get();
  queue.forEach((entry) => {
    const { texture, glConfig } = entry;
    if (!texture.binding) {
      texture.binding = new GLTextureBinding(texture, glConfig);
    }
  });
  BindingQueue.clear();
}
