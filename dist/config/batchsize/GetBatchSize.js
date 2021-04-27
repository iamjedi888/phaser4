import {CONFIG_DEFAULTS} from "../const";
import {ConfigStore} from "../ConfigStore";
export function GetBatchSize() {
  return ConfigStore.get(CONFIG_DEFAULTS.BATCH_SIZE);
}
