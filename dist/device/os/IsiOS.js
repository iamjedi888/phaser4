export function IsiOS() {
  const ua = navigator.userAgent;
  const result = {
    iOS: false,
    iOSVersion: 0,
    iPhone: false,
    iPad: false
  };
  if (/iP[ao]d|iPhone/i.test(ua)) {
    const match = /OS (\d+)/.exec(navigator.appVersion);
    result.iOS = true;
    result.iOSVersion = parseInt(match[0], 10);
    result.iPhone = ua.toLowerCase().includes("iphone");
    result.iPad = ua.toLowerCase().includes("ipad");
  }
  return result;
}
