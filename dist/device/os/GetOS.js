import {IsAndroid} from "./IsAndroid";
import {IsChromeOS} from "./IsChromeOS";
import {IsCordova} from "./IsCordova";
import {IsCrosswalk} from "./IsCrosswalk";
import {IsEjecta} from "./IsEjecta";
import {IsKindle} from "./IsKindle";
import {IsLinux} from "./IsLinux";
import {IsMacOS} from "./IsMacOS";
import {IsNode} from "./IsNode";
import {IsNodeWebkit} from "./IsNodeWebkit";
import {IsWebApp} from "./IsWebApp";
import {IsWindows} from "./IsWindows";
import {IsWindowsPhone} from "./IsWindowsPhone";
import {IsiOS} from "./IsiOS";
export function GetOS() {
  const ua = navigator.userAgent;
  const {iOS, iOSVersion, iPad, iPhone} = IsiOS();
  const result = {
    android: IsAndroid(),
    chromeOS: IsChromeOS(),
    cordova: IsCordova(),
    crosswalk: IsCrosswalk(),
    desktop: false,
    ejecta: IsEjecta(),
    iOS,
    iOSVersion,
    iPad,
    iPhone,
    kindle: IsKindle(),
    linux: IsLinux(),
    macOS: IsMacOS(),
    node: IsNode(),
    nodeWebkit: IsNodeWebkit(),
    pixelRatio: 1,
    webApp: IsWebApp(),
    windows: IsWindows(),
    windowsPhone: IsWindowsPhone()
  };
  if (result.windowsPhone) {
    result.android = false;
    result.iOS = false;
    result.macOS = false;
    result.windows = true;
  }
  const silk = ua.includes("Silk");
  if (result.windows || result.macOS || result.linux && !silk || result.chromeOS) {
    result.desktop = true;
  }
  if (result.windowsPhone || /Windows NT/i.test(ua) && /Touch/i.test(ua)) {
    result.desktop = false;
  }
  return result;
}
