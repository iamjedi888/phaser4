import {IsiOS} from "../os/IsiOS";
export function IsMobileSafari() {
  const {iOS} = IsiOS();
  const mobileSafari = navigator.userAgent.includes("AppleWebKit") && iOS;
  return {
    mobileSafari
  };
}
