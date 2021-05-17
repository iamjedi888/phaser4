export function CreateAnimData(currentAnim = "", frameRate = 0, duration = 0, delay = 0, repeat = 0, repeatDelay = 0, yoyo = false, hold = 0, showOnStart = false, hideOnComplete = false) {
  return {
    currentAnim,
    frameRate,
    duration,
    delay,
    repeat,
    repeatDelay,
    yoyo,
    hold,
    showOnStart,
    hideOnComplete,
    stopAfter: 0,
    startFrame: 0,
    timeScale: 1,
    onStart: null,
    onRepeat: null,
    onComplete: null,
    nextFrameTime: 0,
    repeatCount: 0,
    isPlaying: false,
    forceRestart: false,
    pendingStart: false,
    playingForward: true
  };
}
