import { SetTexture } from "./SetTexture";
import { WhiteTexture } from "../../../textures/WhiteTexture";
export function SetWhiteTexture() {
  return SetTexture(WhiteTexture.get());
}
