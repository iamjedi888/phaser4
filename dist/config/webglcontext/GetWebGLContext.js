import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetWebGLContext() {
  return ConfigStore.get(CONFIG_DEFAULTS.WEBGL_CONTEXT);
}
