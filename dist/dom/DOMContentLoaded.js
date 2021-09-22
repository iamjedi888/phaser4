export function DOMContentLoaded(callback) {
  const readyState = document.readyState;
  if (readyState === "complete" || readyState === "interactive") {
    callback();
    return;
  }
  const check = () => {
    document.removeEventListener("deviceready", check, true);
    document.removeEventListener("DOMContentLoaded", check, true);
    window.removeEventListener("load", check, true);
    callback();
  };
  if (!document.body) {
    window.setTimeout(check, 20);
  } else if (window.hasOwnProperty("cordova")) {
    document.addEventListener("deviceready", check, true);
  } else {
    document.addEventListener("DOMContentLoaded", check, true);
    window.addEventListener("load", check, true);
  }
}
