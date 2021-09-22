import { SetGlobalVar } from "./SetGlobalVar";
export function GlobalVar(name) {
  return () => {
    SetGlobalVar(name);
  };
}
