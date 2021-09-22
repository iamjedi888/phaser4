export function IsKindle() {
  const ua = navigator.userAgent;
  return ua.includes("Kindle") || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua);
}
