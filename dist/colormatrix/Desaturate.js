import { Saturate } from "./Saturate";
export function Desaturate(gameObject, multiply = false) {
  return Saturate(gameObject, -1, multiply);
}
