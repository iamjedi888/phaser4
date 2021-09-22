import { Saturate } from "./Saturate";
export function Grayscale(gameObject, value, multiply = false) {
  return Saturate(gameObject, -value, multiply);
}
