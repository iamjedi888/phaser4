import {GameInstance} from "../GameInstance";
let willPauseOnVisibility = false;
let willPauseOnBlur = false;
let visibilityHandler;
let blurHandler;
let focusHandler;
function ClearHandlers() {
  if (willPauseOnVisibility) {
    document.removeEventListener("visibilitychange", visibilityHandler);
    willPauseOnVisibility = false;
  }
  if (willPauseOnBlur) {
    window.removeEventListener("blur", blurHandler);
    window.removeEventListener("focus", focusHandler);
    willPauseOnBlur = false;
  }
}
function PauseOnBlur(pauseOnDocumentHidden = true, pauseOnBlur = true) {
  return () => {
    if (pauseOnDocumentHidden && document) {
      visibilityHandler = () => {
        const game = GameInstance.get();
        if (!game) {
          ClearHandlers();
        } else if (document.hidden) {
          game.pause();
        } else {
          game.resume();
        }
      };
      willPauseOnVisibility = true;
      document.addEventListener("visibilitychange", visibilityHandler);
    }
    if (pauseOnBlur && window) {
      blurHandler = () => {
        const game = GameInstance.get();
        if (!game) {
          ClearHandlers();
        } else {
          game.pause();
        }
      };
      focusHandler = () => {
        const game = GameInstance.get();
        if (!game) {
          ClearHandlers();
        } else {
          game.resume();
        }
      };
      willPauseOnBlur = true;
      window.addEventListener("blur", blurHandler);
      window.addEventListener("focus", focusHandler);
    }
  };
}
function WillPauseOnVisibility() {
  return willPauseOnVisibility;
}
function WillPauseOnBlur() {
  return willPauseOnBlur;
}
export {
  ClearHandlers,
  PauseOnBlur,
  WillPauseOnVisibility,
  WillPauseOnBlur
};
