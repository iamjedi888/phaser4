let _audioElement;
export function CanPlayAudioType(type, audioElement) {
  if (!audioElement) {
    if (!_audioElement) {
      _audioElement = document.createElement("audio");
    }
    audioElement = _audioElement;
  }
  return audioElement && audioElement.canPlayType(type) !== "";
}
