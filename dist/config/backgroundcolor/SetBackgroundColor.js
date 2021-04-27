import {CONFIG_DEFAULTS} from "../const";
import {ConfigStore} from "../ConfigStore";
export function SetBackgroundColor(color) {
  ConfigStore.set(CONFIG_DEFAULTS.BACKGROUND_COLOR, color);
}
