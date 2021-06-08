import { CONFIG_DEFAULTS } from "../const";
import { ConfigStore } from "../ConfigStore";
export function GetBanner() {
  const { title, version, url, color, background } = ConfigStore.get(CONFIG_DEFAULTS.BANNER);
  if (title !== "") {
    const str = version !== "" ? title + " " + version : title;
    console.log(`%c${str}%c ${url}`, `padding: 4px 16px; color: ${color}; background: ${background}`, "");
  }
}
