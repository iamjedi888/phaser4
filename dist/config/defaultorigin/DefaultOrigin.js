import {SetDefaultOrigin} from "./SetDefaultOrigin";
export function DefaultOrigin(x = 0.5, y = x) {
  return () => {
    SetDefaultOrigin(x, y);
  };
}
