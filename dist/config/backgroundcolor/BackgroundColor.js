import { SetBackgroundColor } from "./SetBackgroundColor";
export function BackgroundColor(color) {
  return () => {
    SetBackgroundColor(color);
  };
}
