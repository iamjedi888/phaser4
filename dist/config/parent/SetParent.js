import {CONFIG_DEFAULTS} from "../const";
import {ConfigStore} from "../ConfigStore";
import {GetElement} from "../../dom/GetElement";
export function SetParent(parentElement) {
  if (parentElement) {
    ConfigStore.set(CONFIG_DEFAULTS.PARENT, GetElement(parentElement));
  }
}
