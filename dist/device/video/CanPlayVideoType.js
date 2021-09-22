let _videoElement;
export function CanPlayVideoType(type, videoElement) {
  if (!videoElement) {
    if (!_videoElement) {
      _videoElement = document.createElement("video");
    }
    videoElement = _videoElement;
  }
  return videoElement && videoElement.canPlayType(type) !== "";
}
