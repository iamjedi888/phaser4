export function IsMacOS() {
  const ua = navigator.userAgent;
  return ua.includes("Mac OS") && !ua.includes("like Mac OS");
}
