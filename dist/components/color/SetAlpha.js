import { ColorComponent } from "./ColorComponent";
import { SetDirtyParents } from "../dirty/SetDirtyParents";
export function SetAlpha(id, value) {
  ColorComponent.a[id] = value;
  SetDirtyParents(id);
}
