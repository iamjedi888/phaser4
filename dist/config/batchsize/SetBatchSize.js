import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function SetBatchSize(size) {
  ConfigStore.set(CONFIG_DEFAULTS.BATCH_SIZE, size);
}
