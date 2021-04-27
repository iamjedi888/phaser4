import {SetScenes} from "./SetScenes";
export function Scenes(scenes) {
  return () => {
    SetScenes(scenes);
  };
}
