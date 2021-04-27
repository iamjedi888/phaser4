import {CONFIG_DEFAULTS} from "../const";
import {ConfigStore} from "../ConfigStore";
export function SetCanvasContext(contextAttributes) {
  ConfigStore.set(CONFIG_DEFAULTS.CANVAS_CONTEXT, contextAttributes);
}
