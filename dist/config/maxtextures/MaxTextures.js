import { SetMaxTextures } from "./SetMaxTextures";
export function MaxTextures(max = 0) {
  return () => {
    SetMaxTextures(max);
  };
}
