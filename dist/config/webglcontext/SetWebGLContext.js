import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetWebGLContext(contextAttributes) {
  ConfigStore.set(CONFIG_DEFAULTS.WEBGL_CONTEXT, contextAttributes);
}
