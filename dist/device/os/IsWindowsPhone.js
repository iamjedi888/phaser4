export function IsWindowsPhone() {
  const ua = navigator.userAgent;
  return /Windows Phone/i.test(ua) || /IEMobile/i.test(ua);
}
