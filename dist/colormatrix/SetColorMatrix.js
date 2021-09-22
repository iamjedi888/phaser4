import { ColorComponent } from "../components/color/ColorComponent";
import { GameObjectWorld } from "../GameObjectWorld";
import { hasComponent } from "bitecs";
export function SetColorMatrix(id, values, constants, multiply) {
  if (hasComponent(GameObjectWorld, ColorComponent, id)) {
    const colorMatrix = ColorComponent.colorMatrix[id];
    const colorOffset = ColorComponent.colorOffset[id];
    if (!multiply) {
      colorMatrix.set(values);
      if (constants) {
        colorOffset.set(constants);
      }
    } else {
      const copy = Float32Array.from(colorMatrix);
      let c = 0;
      let offset = 0;
      copy.forEach((v, i) => {
        colorMatrix[i] = copy[offset] * values[c] + copy[offset + 1] * values[c + 4] + copy[offset + 2] * values[c + 8] + copy[offset + 3] * values[c + 12];
        c++;
        if (i === 3 || i === 7 || i === 11) {
          offset += 4;
          c = 0;
        }
      });
      if (constants) {
        const r = constants[0];
        const g = constants[1];
        const b = constants[2];
        const a = constants[3];
        colorOffset[0] = copy[0] * r + copy[1] * g + copy[2] * b + copy[3] * a + colorOffset[0];
        colorOffset[1] = copy[4] * r + copy[5] * g + copy[6] * b + copy[7] * a + colorOffset[1];
        colorOffset[2] = copy[8] * r + copy[9] * g + copy[10] * b + copy[11] * a + colorOffset[2];
        colorOffset[3] = copy[12] * r + copy[13] * g + copy[14] * b + copy[15] * a + colorOffset[3];
      }
    }
    return true;
  }
  return false;
}
