export function IsOpera() {
  const opera = navigator.userAgent.includes("Opera");
  return {
    opera
  };
}
