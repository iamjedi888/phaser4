import { SetParent } from "./SetParent";
export function Parent(parentElement) {
  return () => {
    SetParent(parentElement);
  };
}
