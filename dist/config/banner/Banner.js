import { SetBanner } from "./SetBanner";
export function Banner(title, version, url, color, background) {
  return () => {
    SetBanner(title, version, url, color, background);
  };
}
