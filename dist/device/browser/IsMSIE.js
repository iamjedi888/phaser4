export function IsMSIE() {
  const ie = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
  const ieVersion = ie ? parseInt(RegExp.$1, 10) : 0;
  return {
    ie,
    ieVersion
  };
}
