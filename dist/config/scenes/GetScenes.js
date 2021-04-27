import {CONFIG_DEFAULTS} from "../const";
import {ConfigStore} from "../ConfigStore";
export function GetScenes() {
  return ConfigStore.get(CONFIG_DEFAULTS.SCENES);
}
